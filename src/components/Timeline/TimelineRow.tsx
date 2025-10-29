import React from 'react';
import type { TimelineRow as TimelineRowType, TimelineConfig } from '@/types/timeline.types';

interface TimelineRowProps {
  row: TimelineRowType;
  rowIndex: number;
  config: TimelineConfig;
  totalWidth: number;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  row,
  rowIndex,
  config,
  totalWidth
}) => {
  const isEvenRow = rowIndex % 2 === 0;

  return (
    <div
      className={`timeline-row absolute border-b border-neutral-100 ${
        isEvenRow ? 'bg-white' : 'bg-neutral-25'
      } hover:bg-neutral-50 transition-colors`}
      style={{
        top: `${rowIndex * config.rowHeight}px`,
        height: `${config.rowHeight}px`,
        width: `${totalWidth}px`,
      }}
      role="row"
      aria-label={`${row.label} timeline row`}
    >
      {/* Row content area - this is where tasks will be positioned */}
      <div className="absolute inset-0" />
    </div>
  );
};