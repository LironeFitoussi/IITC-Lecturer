import { getAllJokes } from "../services/jokes.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetJokes() {
  const query = useQuery({ queryKey: ["jokes"], queryFn: getAllJokes });
  return query;
}
