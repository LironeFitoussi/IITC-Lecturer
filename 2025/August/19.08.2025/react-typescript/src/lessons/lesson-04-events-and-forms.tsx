import type { FormEvent } from 'react'
import { useState } from 'react'

export default function EventsAndForms() {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | ''>('')
  const [message, setMessage] = useState<string>('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim().length === 0 || age === '') {
      setMessage('Please provide both a name and an age')
      return
    }
    setMessage(`Hello ${name}! You are ${age} years old.`)
  }

  return (
    <div>
      <h2>Events and Forms</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-row">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada"
          />
        </label>
        <label className="form-row">
          <span>Age</span>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              const next = e.target.value
              setAge(next === '' ? '' : Number(next))
            }}
            placeholder="36"
            min={0}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message ? <p className="note">{message}</p> : null}
    </div>
  )
}


