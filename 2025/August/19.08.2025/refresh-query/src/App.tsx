import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Todos from './components/Todos'
// Create a client
const queryClient = new QueryClient()

export default function App() {
  return (
    // Prov ide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

