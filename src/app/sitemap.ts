import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Replace with your actual production domain
  const baseUrl = 'https://fwlabs.com'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // If you add individual project pages later (e.g., /work/project-01), 
    // they would be dynamically mapped here.
  ];
}