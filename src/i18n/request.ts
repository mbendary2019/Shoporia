import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()

  // Try to get locale from cookie first, then from header, default to 'ar'
  const locale =
    cookieStore.get('NEXT_LOCALE')?.value ||
    headerStore.get('accept-language')?.split(',')[0]?.split('-')[0] ||
    'ar'

  const supportedLocales = ['ar', 'en']
  const finalLocale = supportedLocales.includes(locale) ? locale : 'ar'

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default,
  }
})
