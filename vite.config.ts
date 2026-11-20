/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { routePreload } from './vite-plugins/route-preload.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all vars (not only VITE_*) so server-only settings stay out of the bundle.
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.API_PROXY_TARGET || 'http://localhost:8000'

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Preload the current page's lazy chunk (and its LCP image) in parallel with the main
      // bundle. Keep in sync with src/app/router/index.tsx and src/app/router/paths.ts.
      routePreload({
        routes: {
          '/': 'src/pages/HomePage.tsx',
          '/about': 'src/pages/AboutPage.tsx',
          '/services': 'src/pages/ServicesPage.tsx',
          '/services/:slug': 'src/pages/ServicePage.tsx',
          '/countries': 'src/pages/CountriesPage.tsx',
          '/countries/:slug': 'src/pages/CountryPage.tsx',
          '/blog': 'src/pages/BlogPage.tsx',
          '/blog/:slug': 'src/pages/BlogPostPage.tsx',
          '/testimonials': 'src/pages/TestimonialsPage.tsx',
          '/faqs': 'src/pages/FaqsPage.tsx',
          '/contact': 'src/pages/ContactPage.tsx',
        },
        images: { '/': ['home-hero-bg2'] },
        font: 'plus-jakarta-sans-latin-wght-normal',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      // Same-origin proxy: the browser only ever talks to :5173, so Sanctum
      // cookies + CSRF work without any CORS configuration in development.
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
        '/sanctum': { target: apiTarget, changeOrigin: true },
      },
    },
    build: {
      sourcemap: mode !== 'production',
      rolldownOptions: {
        output: {
          // Vendor chunks change rarely, so browsers keep them cached across deploys.
          codeSplitting: {
            groups: [
              {
                name: 'vendor-react',
                test: /node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/,
              },
              { name: 'vendor-data', test: /node_modules[\\/](@tanstack|axios)[\\/]/ },
              {
                name: 'vendor-forms',
                test: /node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              },
            ],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
    },
  }
})
