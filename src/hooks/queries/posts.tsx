import { Post } from '@prisma/client'
import { FetchQueryOptions, keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'

import { createPost, deletePost, fetchPost, fetchPosts, PostWithAuthor, updatePost } from '@/src/data/posts'
import { TableState } from '@/types'

export const initPostsTableState: TableState = {
  page: 1,
  pageSize: 10,
  sortDescriptor: { column: 'title', direction: 'ascending' },
  filter: {},
}

export const prefetchOptions: FetchQueryOptions = {
  queryFn: () => fetchPosts(initPostsTableState),
  queryKey: ['posts', initPostsTableState],
}

// React Query Hooks
export function usePosts(tableState?: TableState) {
  const queryKey = ['posts', tableState]

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchPosts(tableState),
    placeholderData: keepPreviousData,
    enabled: !!tableState, // Only run the query if tableState is defined
  })
}

export function usePost(id: number) {
  const queryKey = ['post', id]

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchPost(id),
  })
}

export function useCreatePost(): UseMutationResult<PostWithAuthor, Error, Omit<Post, 'id'>> {
  const queryClient = useQueryClient()

  return useMutation<PostWithAuthor, Error, Omit<Post, 'id'>>({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useUpdatePost(): UseMutationResult<PostWithAuthor, Error, { id: number; post: Partial<Post> }> {
  const queryClient = useQueryClient()

  return useMutation<PostWithAuthor, Error, { id: number; post: Partial<Post> }>({
    mutationFn: ({ id, post }) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost(): UseMutationResult<Post, Error, number> {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, number>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
