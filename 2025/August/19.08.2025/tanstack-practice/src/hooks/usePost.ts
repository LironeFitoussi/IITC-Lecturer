import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'
import type { Post } from './usePosts'

async function fetchPost(id: number): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`)
  return data
}

export function usePost(id: number | null) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id as number),
    enabled: typeof id === 'number' && id > 0,
  })
}


