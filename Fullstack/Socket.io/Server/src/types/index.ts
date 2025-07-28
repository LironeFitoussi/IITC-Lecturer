export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  publishedYear: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface CreateBookRequest {
  title: string;
  description: string;
  publishedYear: number;
}

export interface UpdateBookRequest {
  title?: string;
  description?: string;
  publishedYear?: number;
}

export interface CreateAuthorRequest {
  name: string;
  email: string;
  bio?: string;
}

export interface UpdateAuthorRequest {
  name?: string;
  email?: string;
  bio?: string;
}

export interface CreateReviewRequest {
  bookId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
} 