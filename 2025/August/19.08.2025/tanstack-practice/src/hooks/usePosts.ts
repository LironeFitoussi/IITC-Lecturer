import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

async function fetchPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts')
  return data
}

export function usePosts() {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    select: (posts) => posts.slice().sort((a, b) => a.title.localeCompare(b.title)),
    placeholderData: () => queryClient.getQueryData<Post[]>(['posts']) ?? [],
  })
}


