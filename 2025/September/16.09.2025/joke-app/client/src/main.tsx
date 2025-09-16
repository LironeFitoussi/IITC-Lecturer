import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // Provide the client to your App
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />

    <App />
  </QueryClientProvider>
);
