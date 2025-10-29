import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';
import { TimelineView } from './TimelineView';
import { sampleRows, sampleTasks, generateLargeDataset, getTimelineRange } from '@/data/sampleData';
import type { ViewMode } from '@/types/timeline.types';

const { startDate, endDate } = getTimelineRange();

const meta: Meta<typeof TimelineView> = {
  title: 'Components/Timeline/TimelineView',
  component: TimelineView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Timeline/Gantt View Component

A comprehensive timeline component built with React, TypeScript, and Tailwind CSS. 
Features drag-and-drop, task dependencies, multiple view modes, and full accessibility support.

## Features

- **Multiple View Modes**: Day, Week, and Month views with appropriate time scales
- **Interactive Tasks**: Drag to move, resize handles for duration changes  
- **Dependencies**: Visual connecting lines between dependent tasks
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive**: Adapts to different screen sizes
- **Performance**: Optimized for large datasets (100+ tasks)

## Usage

The component requires rows (resources/teams) and tasks data, along with date range and view mode.
All interactions are callback-based for easy integration with state management.
        `,
      },
    },
  },
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate,
    endDate,
    viewMode: 'week' as ViewMode,
    onTaskUpdate: action('onTaskUpdate'),
    onTaskMove: action('onTaskMove'),
  },
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['day', 'week', 'month'],
      description: 'Timeline view mode affecting time scale and grid density',
    },
    startDate: {
      control: { type: 'date' },
      description: 'Timeline start date',
    },
    endDate: {
      control: { type: 'date' },
      description: 'Timeline end date',
    },
    onTaskUpdate: {
      action: 'onTaskUpdate',
      description: 'Callback fired when task properties are updated',
    },
    onTaskMove: {
      action: 'onTaskMove', 
      description: 'Callback fired when task is moved to different row',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default Story - Basic timeline with sample tasks
export const Default: Story = {
  name: 'Default',
  args: {
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic timeline showing a typical project with multiple teams, tasks, and dependencies.',
      },
    },
  },
};

// 2. Empty State - Timeline with no tasks
export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    rows: sampleRows,
    tasks: {},
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with team rows but no tasks assigned. Shows the grid structure and empty state.',
      },
    },
  },
};

// 3. With Dependencies - Shows tasks connected by dependency lines
export const WithDependencies: Story = {
  name: 'With Dependencies', 
  args: {
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates task dependencies with connecting lines and arrows. Tasks show logical flow and blocking relationships.',
      },
    },
  },
};

// 4. View Modes - Toggle between day, week, month views
export const DayView: Story = {
  name: 'Day View',
  args: {
    viewMode: 'day',
  },
  parameters: {
    docs: {
      description: {
        story: 'Day view showing detailed daily timeline with narrow columns for precise task scheduling.',
      },
    },
  },
};

export const WeekView: Story = {
  name: 'Week View', 
  args: {
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Week view balancing detail and overview, ideal for sprint planning and short-term scheduling.',
      },
    },
  },
};

export const MonthView: Story = {
  name: 'Month View',
  args: {
    viewMode: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'Month view providing high-level project overview with broader time perspective.',
      },
    },
  },
};

// 5. Interactive Playground - Drag, resize, and edit
export const InteractivePlayground: Story = {
  name: 'Interactive Playground',
  args: {
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: `Interactive demo showcasing all interactions:
        - **Drag tasks** horizontally to change dates or vertically to change assigned team
        - **Resize tasks** using left/right edge handles to adjust duration
        - **Click tasks** to open detail sidebar for editing
        - **Keyboard navigation** with Tab, Arrow keys, Enter/Space
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for timeline to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find and interact with a task
    const taskBars = canvas.getAllByRole('button');
    if (taskBars.length > 0) {
      // Click on first task to open sidebar
      await userEvent.click(taskBars[0]);
      
      // Verify sidebar opened
      await expect(canvas.getByRole('complementary')).toBeVisible();
    }
  },
};

// 6. Mobile View - Responsive design demonstration  
export const MobileView: Story = {
  name: 'Mobile View',
  args: {
    viewMode: 'week',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Mobile-responsive timeline with adapted layout, touch-friendly interactions, and optimized spacing.',
      },
    },
  },
};

// 7. Accessibility - Keyboard navigation demonstration
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    viewMode: 'week',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: `Accessibility features demonstrated:
        - **Keyboard Navigation**: Tab between tasks, Arrow keys to navigate, Enter/Space to interact
        - **Screen Reader Support**: ARIA labels, roles, and descriptions
        - **Focus Management**: Visible focus indicators and logical focus flow  
        - **Color Contrast**: WCAG 2.1 AA compliant color combinations
        - **Semantic HTML**: Proper roles and element hierarchy
        `,
      },
    },
  },
  play: async () => {
    // Test keyboard navigation
    await userEvent.tab();
    await userEvent.tab();
    
    // Test Enter key interaction
    await userEvent.keyboard('{Enter}');
    
    // Allow time for interaction
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};

// 8. Large Dataset - 100+ tasks with virtualization/performance optimization
export const LargeDataset: Story = {
  name: 'Large Dataset (Performance)',
  args: {
    ...generateLargeDataset(100),
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 100+ tasks demonstrating smooth rendering and interactions even with large datasets.',
      },
    },
  },
};

// 9. Custom Styling - Different themes and colors
export const CustomStyling: Story = {
  name: 'Custom Styling',
  args: {
    viewMode: 'week',
    className: 'shadow-xl border-2 border-primary-200',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with custom styling applied, demonstrating extensibility through CSS classes.',
      },
    },
  },
};

// 10. Error Handling - Edge cases and error states
export const ErrorHandling: Story = {
  name: 'Error Handling',
  args: {
    rows: [
      {
        id: 'row-1',
        label: 'Test Team',
        tasks: ['invalid-task-id'], // Task that doesn't exist
      },
    ],
    tasks: {
      'task-1': {
        id: 'task-1',
        title: 'Valid Task',
        startDate: new Date('invalid'), // Invalid date
        endDate: new Date(),
        progress: 50,
        rowId: 'row-1',
      },
    } as any,
    viewMode: 'week',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error handling demonstration with invalid data, missing references, and edge cases.',
      },
    },
  },
};