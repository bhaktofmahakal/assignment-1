# Repository Configuration

## Project Information
- **Name**: timeline-component
- **Type**: React TypeScript Component
- **Build Tool**: Vite
- **Testing Framework**: Playwright

## Technology Stack
- React ^18.2.0
- TypeScript ^5.3.3
- Tailwind CSS ^3.4.1
- Storybook ^9.1.15
- Playwright ^1.42.1
- Vite ^5.1.0

## Key Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build production bundle (TypeScript + Vite)
npm run preview     # Preview production build
npm run storybook   # Start Storybook development server
npm run build-storybook  # Build Storybook for deployment
npm run test        # Run Playwright tests
```

## Build Configuration
- TypeScript: Strict mode enabled
- Output: dist/
- Storybook Output: storybook-static/

## Code Quality Standards
- All TypeScript files pass strict type checking
- No unused imports or variables
- Component naming conflicts resolved through type aliasing
- Proper decorator type annotations in Story files
- Full accessibility support (WCAG 2.1 AA)

## Architecture
- **Components**: src/components/Timeline/
  - TimelineView.tsx (main component)
  - TimelineGrid.tsx (layout foundation)
  - TimelineRow.tsx (row renderer)
  - TaskBar.tsx (individual task display)
  - DependencyLine.tsx (task dependency visualization)
  - TaskDetailSidebar.tsx (task editing panel)

- **Utilities**: src/utils/
  - date.utils.ts (date calculations)
  - position.utils.ts (position and timeline calculations)
  - dependency.utils.ts (dependency line calculations)
  - validation.utils.ts (data validation)

- **Types**: src/types/timeline.types.ts (TypeScript interfaces)
- **Constants**: src/constants/timeline.constants.ts (configuration)
- **Stories**: src/components/Timeline/*.stories.tsx (26+ Storybook stories)

## Production Build Size
- JavaScript: 160.74 KB
- CSS: 16.02 KB
- Gzipped JavaScript: 52.21 KB
- Total Gzipped: ~56 KB

## Last Cleanup Summary
**Date**: [Build verification passed]
**TypeScript Errors Fixed**: 10
- Removed unused React import from App.tsx
- Removed unused formatDate import from TaskDetailSidebar.tsx
- Removed unused ViewMode import from TimelineView.tsx
- Removed unused calculateDateFromPosition import from TimelineView.tsx
- Removed unused startOfDay import from position.utils.ts
- Removed unused index parameter from TimelineGrid.tsx
- Removed unused canvasElement parameter from TimelineView.stories.tsx
- Removed unused viewMode parameter from TimelineGrid props
- Removed unused tasks parameter from TimelineGrid props
- Updated all callers of TimelineGrid to match new interface

**Files Modified**: 7
- u:\assignment\assignment.md (emoji removal)
- u:\assignment\src\App.tsx
- u:\assignment\src\components\Timeline\TaskDetailSidebar.tsx
- u:\assignment\src\components\Timeline\TimelineGrid.tsx
- u:\assignment\src\components\Timeline\TimelineGrid.stories.tsx
- u:\assignment\src\components\Timeline\TimelineView.tsx
- u:\assignment\src\components\Timeline\TimelineView.stories.tsx
- u:\assignment\src\utils\position.utils.ts

**Build Status**: ✓ PASSING
- TypeScript compilation: No errors
- Vite build: No errors
- Storybook build: No errors