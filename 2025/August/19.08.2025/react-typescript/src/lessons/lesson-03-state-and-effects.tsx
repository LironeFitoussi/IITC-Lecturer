import { useEffect, useMemo, useState } from 'react'

export default function StateAndEffects() {
  const [count, setCount] = useState<number>(0)
  const [factor, setFactor] = useState<number>(2)

  const multiplied = useMemo(() => count * factor, [count, factor])

  useEffect(() => {
    document.title = `Count: ${count}`
    return () => {
      document.title = 'React + TS Playground'
    }
  }, [count])

  return (
    <div>
      <h2>State and Effects</h2>
      <div className="row">
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <span className="metric">count = {count}</span>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
      <div className="row">
        <button onClick={() => setFactor((f) => Math.max(1, f - 1))}>factor -1</button>
        <span className="metric">factor = {factor}</span>
        <button onClick={() => setFactor((f) => f + 1)}>factor +1</button>
      </div>
      <p>
        <strong>multiplied</strong> = {multiplied}
      </p>
    </div>
  )
}


