import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { lessons } from './lessons'

function App() {
  const [selectedId, setSelectedId] = useState<string>(lessons[0]?.id ?? '')

  const CurrentLesson = useMemo(() => {
    return lessons.find((l) => l.id === selectedId)?.Component ?? null
  }, [selectedId])

  function go(offset: number) {
    const index = lessons.findIndex((l) => l.id === selectedId)
    if (index === -1) return
    const nextIndex = Math.max(0, Math.min(lessons.length - 1, index + offset))
    setSelectedId(lessons[nextIndex].id)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React + TypeScript Playground</h1>
      <p className="read-the-docs">Pick a lesson and edit code under <code>src/lessons</code>. Save to see changes instantly.</p>

      <div className="edu-layout">
        <nav className="edu-nav">
          <label className="select-row">
            <span>Lesson</span>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </label>
          <ul className="lesson-list">
            {lessons.map((l) => (
              <li key={l.id}>
                <button
                  className={l.id === selectedId ? 'lesson-link active' : 'lesson-link'}
                  onClick={() => setSelectedId(l.id)}
                >
                  {l.title}
                </button>
                <div className="lesson-summary">{l.summary}</div>
              </li>
            ))}
          </ul>
          <div className="row">
            <button onClick={() => go(-1)} disabled={selectedId === lessons[0]?.id}>
              ◀ Prev
            </button>
            <button
              onClick={() => go(1)}
              disabled={selectedId === lessons[lessons.length - 1]?.id}
            >
              Next ▶
            </button>
          </div>
        </nav>
        <main className="edu-content">
          {CurrentLesson ? <CurrentLesson /> : <p>Lesson not found.</p>}
        </main>
      </div>
    </>
  )
}

export default App
