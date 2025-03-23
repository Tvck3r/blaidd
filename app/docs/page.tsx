//'use client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import PostsTable from './postsTable'

import { prefetchOptions } from '@/queries/posts'

export default async function DocsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(prefetchOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsTable />
    </HydrationBoundary>
  )
}
