'use server'

import { TableState } from '@/types'
import { Post, PrismaClient, User } from '@prisma/client'

export type PostWithAuthor = Post & {
  author: User | null
}

const prisma = new PrismaClient()

async function fetchPosts(tableState?: TableState): Promise<{ posts: PostWithAuthor[]; totalCount: number }> {
  if (!tableState) {
    return { posts: [], totalCount: 0 }
  }

  const { page, pageSize, sortDescriptor, filter } = tableState
  const skip = (page - 1) * pageSize
  const take = pageSize

  const orderBy: any = {}
  if (sortDescriptor?.column) {
    const column = sortDescriptor.column as string
    const [field, subField] = column.split('.')
    orderBy[field] = {}

    if (subField) {
      orderBy[field][subField] = sortDescriptor.direction === 'ascending' ? 'asc' : 'desc'
    } else {
      orderBy[field] = sortDescriptor.direction === 'ascending' ? 'asc' : 'desc'
    }
  }

  const where: any = {}
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search } },
      { content: { contains: filter.search } },
      { author: { name: { contains: filter.search } } },
    ]
    console.log('where', where)
  }

  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
      author: true,
    },
    orderBy,
    where,
  })

  const totalCount = await prisma.post.count({ where })

  return { posts, totalCount }
}

async function fetchPost(id: number): Promise<PostWithAuthor | null> {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })
}

async function createPost(post: Omit<Post, 'id'>): Promise<PostWithAuthor> {
  return prisma.post.create({
    data: post,
    include: { author: true },
  })
}

async function updatePost(id: number, post: Partial<Post>): Promise<PostWithAuthor> {
  return prisma.post.update({
    where: { id },
    data: post,
    include: { author: true },
  })
}

async function deletePost(id: number): Promise<Post> {
  return prisma.post.delete({ where: { id } })
}

export { createPost, deletePost, fetchPost, fetchPosts, updatePost }
