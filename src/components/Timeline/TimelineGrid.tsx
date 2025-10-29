import React, { forwardRef } from 'react';
import type { TimelineRow, TimeScale, TimelineConfig } from '@/types/timeline.types';
import { TimelineRow as TimelineRowComponent } from './TimelineRow';
import { generateDateRange, isToday } from '@/utils/date.utils';
import { calculatePosition } from '@/utils/position.utils';

interface TimelineGridProps {
  rows: TimelineRow[];
  startDate: Date;
  endDate: Date;
  config: TimelineConfig;
  timeScale: TimeScale;
  children?: React.ReactNode;
}

export const TimelineGrid = forwardRef<HTMLDivElement, TimelineGridProps>(({
  rows,
  startDate,
  endDate,
  config,
  timeScale,
  children
}, ref) => {
  // Generate date range for grid columns
  const dateColumns = generateDateRange(startDate, endDate, timeScale.timeUnit);
  const totalWidth = dateColumns.length * timeScale.columnWidth;
  const totalHeight = rows.length * config.rowHeight;

  // Calculate current date position
  const today = new Date();
  const todayPosition = today >= startDate && today <= endDate 
    ? calculatePosition(today, startDate, timeScale.pixelsPerDay)
    : -1;

  return (
    <div className="timeline-grid flex w-full h-full">
      {/* Left panel with row labels */}
      <div 
        className="timeline-left-panel flex-shrink-0 bg-neutral-50 border-r border-neutral-200"
        style={{ width: `${config.leftPanelWidth}px` }}
      >
        {/* Header space */}
        <div 
          className="timeline-header-spacer bg-neutral-100 border-b border-neutral-200 flex items-center px-4"
          style={{ height: `${config.headerHeight}px` }}
        >
          <span className="text-sm font-medium text-neutral-700">Resources</span>
        </div>

        {/* Row labels */}
        <div className="timeline-rows">
          {rows.map((row) => (
            <div
              key={row.id}
              className="timeline-row-label flex items-center px-4 border-b border-neutral-100 hover:bg-neutral-100 transition-colors"
              style={{ height: `${config.rowHeight}px` }}
              role="rowheader"
              aria-label={`${row.label} row`}
            >
              <div className="flex items-center space-x-3">
                {row.avatar && (
                  <img
                    src={row.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full bg-neutral-200"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-neutral-900 truncate">
                    {row.label}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {row.tasks.length} task{row.tasks.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel with timeline grid */}
      <div className="timeline-right-panel flex-1 overflow-auto timeline-scrollbar">
        <div 
          ref={ref}
          className="timeline-content relative"
          style={{ 
            width: `${totalWidth}px`,
            minHeight: `${config.headerHeight + totalHeight}px`
          }}
        >
          {/* Time axis header */}
          <div 
            className="timeline-header sticky top-0 bg-white border-b border-neutral-200 z-10"
            style={{ height: `${config.headerHeight}px` }}
            role="row"
          >
            {dateColumns.map((date, index) => (
              <div
                key={date.toISOString()}
                className="timeline-header-cell absolute flex items-center justify-center border-r border-neutral-100 text-xs font-medium text-neutral-700"
                style={{
                  left: `${index * timeScale.columnWidth}px`,
                  width: `${timeScale.columnWidth}px`,
                  height: '100%',
                  backgroundColor: isToday(date) ? '#fef3c7' : 'white', // amber-100 for today
                }}
                role="columnheader"
                aria-label={`${timeScale.labelFormat(date)}`}
              >
                {timeScale.labelFormat(date)}
              </div>
            ))}
          </div>

          {/* Grid rows and vertical lines */}
          <div className="timeline-grid-content relative">
            {/* Vertical grid lines */}
            {dateColumns.map((date, index) => (
              <div
                key={`line-${date.toISOString()}`}
                className="absolute top-0 bottom-0 border-r"
                style={{
                  left: `${index * timeScale.columnWidth}px`,
                  borderColor: config.gridLineColor,
                }}
                aria-hidden="true"
              />
            ))}

            {/* Current date indicator */}
            {todayPosition >= 0 && (
              <div
                className="absolute top-0 bottom-0 w-0.5 z-15"
                style={{
                  left: `${todayPosition}px`,
                  backgroundColor: config.currentDateColor,
                }}
                aria-hidden="true"
              >
                <div
                  className="absolute -top-2 -left-6 px-1 py-0.5 text-xs text-white rounded text-center"
                  style={{ backgroundColor: config.currentDateColor }}
                >
                  Today
                </div>
              </div>
            )}

            {/* Timeline rows */}
            {rows.map((row, index) => (
              <TimelineRowComponent
                key={row.id}
                row={row}
                rowIndex={index}
                config={config}
                totalWidth={totalWidth}
              />
            ))}

            {/* Children (task bars, dependency lines, etc.) */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});