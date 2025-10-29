import type { Meta, StoryObj } from '@storybook/react';
import { TimelineGrid } from './TimelineGrid';
import { sampleRows, getTimelineRange } from '@/data/sampleData';
import { DEFAULT_TIMELINE_CONFIG } from '@/constants/timeline.constants';
import { getTimeScale } from '@/utils/position.utils';

const { startDate, endDate } = getTimelineRange();

const meta: Meta<typeof TimelineGrid> = {
  title: 'Components/Timeline/TimelineGrid',
  component: TimelineGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# TimelineGrid Component

The foundational grid component that renders the timeline structure including:
- Left panel with row labels and avatars
- Time axis header with date/time labels  
- Grid lines for visual alignment
- Scrollable content area

This component provides the layout foundation for tasks and other timeline elements.
        `,
      },
    },
  },
  args: {
    rows: sampleRows,
    startDate,
    endDate,
    config: DEFAULT_TIMELINE_CONFIG,
    timeScale: getTimeScale('week'),
  },
  argTypes: {},
  decorators: [
    (Story: any) => (
      <div style={{ height: '500px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Grid',
  args: {},
};

export const DayView: Story = {
  name: 'Day View Grid',
  args: {
    viewMode: 'day',
    timeScale: getTimeScale('day'),
  },
};

export const MonthView: Story = {
  name: 'Month View Grid', 
  args: {
    viewMode: 'month',
    timeScale: getTimeScale('month'),
  },
};

export const EmptyGrid: Story = {
  name: 'Empty Grid (No Tasks)',
  args: {
    tasks: {},
  },
};

export const ManyRows: Story = {
  name: 'Many Rows',
  args: {
    rows: Array.from({ length: 12 }, (_, i) => ({
      id: `row-${i + 1}`,
      label: `Team ${i + 1}`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=32&h=32&fit=crop&crop=face`,
      tasks: [],
    })),
    tasks: {},
  },
};