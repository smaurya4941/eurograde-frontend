import { useEffect } from 'react'
import { env } from '@/config/env'

/** Sets `document.title` to "<title> — <App name>" (or just the app name). */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${env.appName}` : env.appName
  }, [title])
}
