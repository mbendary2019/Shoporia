import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.shoporia.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/marketplace',
    '/categories',
    '/search',
    '/about',
    '/careers',
    '/blog',
    '/help',
    '/support',
    '/terms',
    '/privacy',
    '/returns',
    '/seller/register',
    '/login',
    '/register',
    '/new-arrivals',
    '/bestsellers',
    '/deals',
  ]

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/marketplace' ? 0.9 : 0.7,
  }))
}
