import { api } from '../lib/axios'
import type { Post, NewPost } from '@/types/post';

const createPost = async (newPost: NewPost): Promise<Post> => {
    const { data } = await api.post<Post>('/posts', newPost);
    return data;
};

export {
    createPost
}