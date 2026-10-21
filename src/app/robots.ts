import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // TODO: Replace with your actual production domain
  const baseUrl = 'https://fwlabs.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // Keeps your admin panel hidden from Google
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}