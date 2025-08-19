import { useMemo } from 'react'

type UserId = number
type Status = 'active' | 'inactive'

interface User {
  id: UserId
  name: string
  status: Status
}

function formatUser(user: User): string {
  const statusLabel = user.status === 'active' ? '✅ Active' : '⛔ Inactive'
  return `${user.name} (#${user.id}) — ${statusLabel}`
}

export default function BasicTypes() {
  const user = useMemo<User>(() => ({ id: 1, name: 'Ada Lovelace', status: 'active' }), [])

  const valuesDemo = useMemo(() => {
    const count: number = 42
    const title: string = 'Hello TS'
    const ok: boolean = true
    const maybe: string | undefined = undefined
    return { count, title, ok, maybe }
  }, [])

  return (
    <div>
      <h2>TypeScript Basics</h2>
      <p>Primitive types, type aliases, unions, and interfaces.</p>

      <div className="lesson-block">
        <h3>Typed Values</h3>
        <ul className="list">
          <li><strong>count</strong>: {valuesDemo.count}</li>
          <li><strong>title</strong>: {valuesDemo.title}</li>
          <li><strong>ok</strong>: {valuesDemo.ok ? 'true' : 'false'}</li>
          <li><strong>maybe</strong>: {valuesDemo.maybe ?? 'undefined'}</li>
        </ul>
      </div>

      <div className="lesson-block">
        <h3>Interface + Narrowing</h3>
        <p>{formatUser(user)}</p>
      </div>
    </div>
  )
}


