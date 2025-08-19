type WithId<T> = T & { id: string }

function toIndexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return items.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}

interface CourseBase {
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

type Course = WithId<CourseBase>

type CoursePreview = Pick<Course, 'id' | 'title'>

export default function GenericsAndUtilities() {
  const courses: Course[] = [
    { id: 'ts-101', title: 'TypeScript 101', level: 'beginner' },
    { id: 'react-ts', title: 'React + TS', level: 'intermediate' },
  ]

  const index = toIndexById(courses)
  const previews: CoursePreview[] = courses.map(({ id, title }) => ({ id, title }))

  return (
    <div>
      <h2>Generics and Utility Types</h2>
      <div className="lesson-block">
        <h3>Generic Function</h3>
        <p>Indexed by id keys: {Object.keys(index).join(', ')}</p>
      </div>
      <div className="lesson-block">
        <h3>Utility Types</h3>
        <ul className="list">
          {previews.map((p) => (
            <li key={p.id}>
              <strong>{p.id}</strong>: {p.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


