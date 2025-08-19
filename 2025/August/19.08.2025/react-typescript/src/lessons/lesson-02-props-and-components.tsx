interface BadgeProps {
  label: string
  tone?: 'neutral' | 'success' | 'warn'
}

function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const toneClass =
    tone === 'success' ? 'badge badge-success' : tone === 'warn' ? 'badge badge-warn' : 'badge'
  return <span className={toneClass}>{label}</span>
}

interface CardProps {
  title: string
  description?: string
  children?: React.ReactNode
}

function Card({ title, description, children }: CardProps) {
  return (
    <div className="card-edu">
      <div className="card-edu-header">
        <h4>{title}</h4>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="card-edu-body">{children}</div>
    </div>
  )
}

export default function PropsAndComponents() {
  return (
    <div>
      <h2>Props and Components</h2>
      <p>Typing props, optional props, and children.</p>

      <Card title="Status" description="Badges with typed props and defaults">
        <div className="row">
          <Badge label="Neutral" />
          <Badge label="Success" tone="success" />
          <Badge label="Warning" tone="warn" />
        </div>
      </Card>
    </div>
  )
}


