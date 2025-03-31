//'use client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import PostsTable from './postsTable'

import { prefetchOptions } from '@/src/hooks/queries/posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  debugger
  await queryClient.prefetchQuery(prefetchOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsTable />
    </HydrationBoundary>
  )
}
