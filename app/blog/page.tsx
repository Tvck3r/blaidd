import { PrismaClient } from '@prisma/client'

import BlogPost from '@/components/blogPost'
import { title } from '@/components/primitives'

export default async function BlogPage() {
  const prisma = new PrismaClient()

  const allPosts = await prisma.post.findMany({
    take: 10,
    include: {
      author: true,
    },
  })

  return (
    <ul>
      <h1 className={title()}>Posts</h1>
      {allPosts.map((post) => (
        <BlogPost key={post.id} author={post.author?.name ?? null} description={post.content} title={post.title} />
      ))}
    </ul>
  )
}
