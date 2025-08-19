import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'
import type { Post } from './usePosts'

type NewPost = Omit<Post, 'id'>

async function createPost(newPost: NewPost): Promise<Post> {
  const { data } = await api.post<Post>('/posts', newPost)
  return data
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: (created) => {
      queryClient.setQueryData<Post[]>(['posts'], (prev) =>
        prev ? [created, ...prev] : [created]
      )
    },
  })
}


