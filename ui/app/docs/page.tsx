//'use client'
import { prefetchOptions } from '@/queries/posts'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import PostsTable from './postsTable'

export default async function DocsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(prefetchOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsTable />
    </HydrationBoundary>
  )
}
