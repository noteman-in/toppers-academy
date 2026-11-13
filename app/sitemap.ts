import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Fetch all dynamic courses
  const courses = await prisma.course.findMany({
    select: { slug: true, updatedAt: true },
  })

  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add all your static pages here
  const staticUrls = [
    '',
    '/about',
    '/courses',
    '/test-series',
    '/free-resources',
    '/testimonials',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...staticUrls, ...courseUrls]
}