import type { IndexHtmlTransformContext, Plugin, Rollup } from 'vite'

type OutputAsset = Rollup.OutputAsset
type OutputBundle = Rollup.OutputBundle
type OutputChunk = Rollup.OutputChunk

interface RoutePreloadOptions {
  /** Route pattern (react-router style, e.g. "/services/:slug") → page module (e.g. "src/pages/ServicePage.tsx"). */
  routes: Record<string, string>
  /** Route pattern → name fragments of image assets to preload on that route (e.g. the hero / LCP image). */
  images?: Record<string, string[]>
  /** Name fragment of the woff2 font to preload on every page. */
  font?: string
}

const isChunk = (o: OutputChunk | OutputAsset): o is OutputChunk => o.type === 'chunk'

/**
 * Removes the request waterfall of lazily loaded routes.
 *
 * Pages are lazy chunks, so normally the browser only discovers the current page's code after the
 * main bundle has downloaded and run (and the page's hero image only after that). At build time
 * this plugin writes a tiny inline script into index.html that matches `location.pathname`
 * against the routes and immediately preloads that page's chunk, its imports and CSS, plus the
 * route's LCP image, in parallel with the main bundle. It also puts the stylesheet before the
 * script preloads and preloads the body font, so first paint isn't queued behind JavaScript.
 */
export function routePreload(options: RoutePreloadOptions): Plugin {
  return {
    name: 'eurograde:route-preload',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html: string, ctx: IndexHtmlTransformContext) {
        const bundle = ctx.bundle as OutputBundle | undefined
        if (!bundle) return html
        const outputs = Object.values(bundle)
        const chunks = outputs.filter(isChunk)
        const entry = chunks.find((c) => c.isEntry)
        const base = '/'

        // Everything the entry already loads statically doesn't need preloading again.
        const loaded = new Set<string>()
        const walk = (file: string) => {
          if (loaded.has(file)) return
          loaded.add(file)
          const chunk = bundle[file]
          if (chunk && isChunk(chunk)) chunk.imports.forEach(walk)
        }
        if (entry) walk(entry.fileName)

        const filesFor = (moduleSuffix: string): string[] => {
          const chunk = chunks.find((c) =>
            c.facadeModuleId?.replace(/\\/g, '/').endsWith(moduleSuffix),
          )
          if (!chunk) return []
          const files: string[] = []
          const seen = new Set<string>()
          const visit = (file: string) => {
            if (seen.has(file) || loaded.has(file)) return
            seen.add(file)
            const c = bundle[file]
            if (!c || !isChunk(c)) return
            files.push(file)
            const css = (c as OutputChunk & { viteMetadata?: { importedCss: Set<string> } })
              .viteMetadata?.importedCss
            css?.forEach((f) => files.push(f))
            c.imports.forEach(visit)
          }
          visit(chunk.fileName)
          return files
        }

        const assetFile = (fragment: string) =>
          outputs.find((o) => o.type === 'asset' && o.fileName.includes(fragment))?.fileName

        const map: [string, string[]][] = Object.entries(options.routes).map(([pattern, mod]) => {
          const images = (options.images?.[pattern] ?? [])
            .map(assetFile)
            .filter(Boolean) as string[]
          return [pattern, [...images, ...filesFor(mod)].map((f) => base + f)]
        })

        const script =
          `(()=>{var m=${JSON.stringify(map)},p=location.pathname.replace(/\\/+$/,'')||'/';` +
          `for(var i=0;i<m.length;i++){var r=new RegExp('^'+m[i][0].replace(/:[^/]+/g,'[^/]+')+'$');` +
          `if(!r.test(p))continue;m[i][1].forEach(function(f){var l=document.createElement('link');` +
          `if(/\\.js$/.test(f)){l.rel='modulepreload'}else if(/\\.css$/.test(f)){l.rel='preload';l.as='style'}` +
          `else{l.rel='preload';l.as='image';l.fetchPriority='high'}l.href=f;document.head.appendChild(l)});break}})()`

        // Stylesheet first: it is render-blocking, so it must not queue behind script preloads.
        const cssLinks = html.match(/<link rel="stylesheet"[^>]*>/g) ?? []
        let out = html
        for (const link of cssLinks) out = out.replace(link, '')
        const font = options.font ? assetFile(options.font) : undefined
        const fontLink = font
          ? `<link rel="preload" href="${base}${font}" as="font" type="font/woff2" crossorigin>`
          : ''
        // Replacer function: the inline script contains "$'", which a replacement string would expand.
        out = out.replace(
          /<script type="module"/,
          () => `${cssLinks.join('')}${fontLink}<script>${script}</script><script type="module"`,
        )
        return out
      },
    },
  }
}
