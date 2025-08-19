import './App.css'
import CreatePostForm from './components/CreatePostForm'
import PostsList from './components/PostsList'

function App() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1>TanStack Query + Axios (JSONPlaceholder)</h1>
      <CreatePostForm />
      <PostsList />
    </div>
  )
}

export default App
