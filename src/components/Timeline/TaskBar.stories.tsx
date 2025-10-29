import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TaskBar } from './TaskBar';
import type { TimelineTask } from '@/types/timeline.types';

const sampleTask: TimelineTask = {
  id: 'story-task-1',
  title: 'Sample Task',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-10'),
  progress: 60,
  assignee: 'John Doe',
  rowId: 'row-1',
  color: '#0d67f8ff',
  isMilestone: false,
  dependencies: [],
};

const meta: Meta<typeof TaskBar> = {
  title: 'Components/Timeline/TaskBar',
  component: TaskBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# TaskBar Component

Individual task representation in the timeline. Supports drag and drop, resize handles, 
progress indication, and various visual states.

## Features

- **Progress Visualization**: Progress bar overlay showing completion percentage
- **Drag Handles**: Left and right resize handles for duration adjustment  
- **Visual States**: Hover, selected, dragging states with appropriate styling
- **Accessibility**: Full keyboard support and ARIA attributes
- **Milestones**: Special diamond styling for milestone tasks
        `,
      },
    },
  },
  args: {
    task: sampleTask,
    onClick: action('onClick'),
    onMouseDown: action('onMouseDown'),
    isSelected: false,
    isDragging: false,
  },
  argTypes: {
    task: {
      description: 'Task data object containing all task properties',
    },
    isSelected: {
      control: { type: 'boolean' },
      description: 'Whether the task is currently selected',
    },
    isDragging: {
      control: { type: 'boolean' },
      description: 'Whether the task is currently being dragged',
    },
    onClick: {
      action: 'onClick',
      description: 'Callback fired when task is clicked',
    },
    onMouseDown: {
      action: 'onMouseDown',
      description: 'Callback fired when mouse down on drag handles',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '300px', height: '60px', position: 'relative', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic task bar
export const Default: Story = {
  name: 'Default Task',
  args: {},
};

// Selected state
export const Selected: Story = {
  name: 'Selected Task',
  args: {
    isSelected: true,
  },
};

// Dragging state
export const Dragging: Story = {
  name: 'Dragging Task',
  args: {
    isDragging: true,
  },
};

// High progress task
export const HighProgress: Story = {
  name: 'High Progress (90%)',
  args: {
    task: {
      ...sampleTask,
      progress: 90,
      color: '#10b981',
    },
  },
};

// Low progress task
export const LowProgress: Story = {
  name: 'Low Progress (15%)',
  args: {
    task: {
      ...sampleTask,
      progress: 15,
      color: '#ef4444',
    },
  },
};

// Completed task
export const Completed: Story = {
  name: 'Completed Task (100%)',
  args: {
    task: {
      ...sampleTask,
      progress: 100,
      color: '#059669',
      title: 'Completed Task',
    },
  },
};

// Milestone task
export const Milestone: Story = {
  name: 'Milestone Task',
  args: {
    task: {
      ...sampleTask,
      title: 'Project Milestone',
      isMilestone: true,
      color: '#f97316',
      progress: 0,
    },
  },
};

// Long title task
export const LongTitle: Story = {
  name: 'Long Title Task',
  args: {
    task: {
      ...sampleTask,
      title: 'This is a very long task title that should be truncated properly',
      color: '#8b5cf6',
    },
  },
};

// Custom colors
export const CustomColors: Story = {
  name: 'Custom Color Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[
        { color: '#ec4899', title: 'Pink Task' },
        { color: '#06b6d4', title: 'Cyan Task' },
        { color: '#84cc16', title: 'Lime Task' },
        { color: '#f59e0b', title: 'Amber Task' },
        { color: '#6366f1', title: 'Indigo Task' },
      ].map((variant, index) => (
        <div key={index} style={{ position: 'relative', height: '40px' }}>
          <TaskBar
            task={{
              ...sampleTask,
              id: `color-task-${index}`,
              title: variant.title,
              color: variant.color,
            }}
            onClick={action('onClick')}
            onMouseDown={action('onMouseDown')}
            style={{
              left: '0px',
              width: '200px',
              top: '0px',
              height: '32px',
            }}
            isSelected={false}
            isDragging={false}
          />
        </div>
      ))}
    </div>
  ),
};