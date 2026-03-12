import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Shoporia',
  description: 'منصة التسوق الإلكتروني الأولى في الكويت',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.shoporia.app',
  ogImage: '/og-image.png',
  locale: 'ar_KW',
}

interface GeneratePageMetadataOptions {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  image,
  noIndex = false,
}: GeneratePageMetadataOptions = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage

  return {
    title: title || siteConfig.name,
    description: metaDescription,
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
