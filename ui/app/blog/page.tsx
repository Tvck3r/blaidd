import { PrismaClient } from '@prisma/client'

export default async function BlogPage() {
  const prisma = new PrismaClient()

  const allPosts = await prisma.post.findMany({
    take: 10,
  })

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
