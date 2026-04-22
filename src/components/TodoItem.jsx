import './TodoItem.css'

const PRIORITY_CONFIG = {
  high:   { label: 'High',   className: 'p-high' },
  medium: { label: 'Medium', className: 'p-medium' },
  low:    { label: 'Low',    className: 'p-low' },
}

function timeAgo(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function TodoItem({ todo, onToggle, onDelete }) {
  const p = PRIORITY_CONFIG[todo.priority]

  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      <button
        className={`checkbox ${todo.done ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle task"
      >
        {todo.done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="todo-body">
        <span className="todo-text">{todo.text}</span>
        <span className="todo-meta">{timeAgo(todo.createdAt)}</span>
      </div>

      <span className={`priority-badge ${p.className}`}>{p.label}</span>

      <button
        className="btn-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  )
}

export default TodoItem
