import React from 'react';
import type { DependencyLine as DependencyLineType } from '@/utils/dependency.utils';

interface DependencyLineProps {
  line: DependencyLineType;
}

export const DependencyLine: React.FC<DependencyLineProps> = ({ line }) => {
  return (
    <path
      d={line.path}
      stroke={line.color}
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead)"
      className="dependency-line hover:stroke-primary-500 transition-colors duration-200"
      aria-label={`Dependency from task ${line.fromTaskId} to task ${line.toTaskId}`}
    />
  );
};