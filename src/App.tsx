import { TimelineView } from '@/components/Timeline'
import type { TimelineRow, TimelineTask } from '@/types/timeline.types'

// Sample data for development
const sampleTasks: Record<string, TimelineTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Design Phase',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-10'),
    progress: 75,
    rowId: 'designer',
    color: '#0ea5e9'
  },
  'task-2': {
    id: 'task-2',
    title: 'Frontend Development',
    startDate: new Date('2025-01-08'),
    endDate: new Date('2025-01-25'),
    progress: 45,
    rowId: 'frontend',
    dependencies: ['task-1'],
    color: '#10b981'
  },
  'task-3': {
    id: 'task-3',
    title: 'Backend API',
    startDate: new Date('2025-01-05'),
    endDate: new Date('2025-01-20'),
    progress: 60,
    rowId: 'backend',
    color: '#f59e0b'
  },
  'task-4': {
    id: 'task-4',
    title: 'Testing Phase',
    startDate: new Date('2025-01-20'),
    endDate: new Date('2025-01-30'),
    progress: 20,
    rowId: 'qa',
    dependencies: ['task-2', 'task-3'],
    color: '#ef4444'
  }
}

const sampleRows: TimelineRow[] = [
  {
    id: 'designer',
    label: 'Design Team',
    tasks: ['task-1']
  },
  {
    id: 'frontend',
    label: 'Frontend Developer',
    tasks: ['task-2']
  },
  {
    id: 'backend',
    label: 'Backend Developer',
    tasks: ['task-3']
  },
  {
    id: 'qa',
    label: 'QA Engineer',
    tasks: ['task-4']
  }
]

function App() {
  const handleTaskUpdate = (taskId: string, updates: Partial<TimelineTask>) => {
    console.log('Task update:', taskId, updates)
    // In a real app, this would update state/database
  }

  const handleTaskMove = (taskId: string, newRowId: string, newStartDate: Date) => {
    console.log('Task move:', taskId, newRowId, newStartDate)
    // In a real app, this would update state/database
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 p-4">
        <h1 className="text-2xl font-bold text-neutral-900">Timeline Component Demo</h1>
      </header>
      <main className="p-4">
        <TimelineView
          rows={sampleRows}
          tasks={sampleTasks}
          startDate={new Date('2025-01-01')}
          endDate={new Date('2025-01-31')}
          viewMode="week"
          onTaskUpdate={handleTaskUpdate}
          onTaskMove={handleTaskMove}
        />
      </main>
    </div>
  )
}

export default App