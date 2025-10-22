export interface Joke {
  _id: string;
  content: string;
  punchline: string;
  author: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  __v: number;
  id: string;
}

export type JokeDTO = Pick<Joke, "content" | "punchline" | "author">;