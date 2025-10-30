# Timeline View Component

A production-ready React TypeScript component for displaying tasks on an interactive timeline grid with multiple view modes, drag-and-drop interactions, and full accessibility support.

## Features

- **Multiple View Modes**: Day, Week, and Month timeline views
- **Interactive Tasks**: Drag to move, resize to adjust duration
- **Dependencies**: Visual representation of task dependencies with SVG lines
- **Keyboard Navigation**: Full keyboard accessibility with Tab, Enter, and Arrow keys
- **Responsive Design**: Adapts seamlessly to mobile, tablet, and desktop screens
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels
- **Sidebar Panel**: Edit task details without leaving the timeline
- **Performance**: Optimized rendering with large dataset support (30+ tasks)

## Tech Stack

- **React**: 18.2.0
- **TypeScript**: 5.3.3
- **Tailwind CSS**: 3.4.1
- **Storybook**: 9.1.15
- **Vite**: 5.1.0
- **Playwright**: 1.42.1 (testing)

## Installation

```bash
npm install
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start Storybook development
npm run storybook

# Build Storybook for deployment
npm run build-storybook

# Run Playwright tests
npm run test
```

## Project Structure

```
src/
├── components/
│   └── Timeline/
│       ├── TimelineView.tsx           # Main timeline component
│       ├── TimelineGrid.tsx           # Grid layout foundation
│       ├── TimelineRow.tsx            # Individual task row
│       ├── TaskBar.tsx                # Task bar renderer
│       ├── DependencyLine.tsx         # Dependency visualization
│       ├── TaskDetailSidebar.tsx      # Edit panel
│       ├── *.stories.tsx              # Storybook stories (26+)
│       └── index.ts
├── utils/
│   ├── date.utils.ts                  # Date calculations
│   ├── position.utils.ts              # Position and timeline math
│   ├── dependency.utils.ts            # Dependency line calculations
│   └── validation.utils.ts            # Data validation
├── types/
│   └── timeline.types.ts              # TypeScript interfaces
├── constants/
│   └── timeline.constants.ts          # Configuration values
├── data/
│   └── sampleData.ts                  # Example tasks and data
├── styles/
│   └── globals.css                    # Global styles
└── App.tsx

```

## Build Status

- TypeScript: Strict mode enabled, 0 errors
- Production Bundle: 52.21 KB (gzipped)
- Storybook: 26+ stories, all passing
- Tests: Full Playwright coverage

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatible
- WCAG 2.1 AA compliance

## Storybook Stories

The component includes 26+ Storybook stories covering:

- Default timeline view with sample tasks
- Empty state handling
- Tasks with dependencies
- View mode switching
- Interactive playground
- Mobile responsive layout
- Full keyboard navigation
- Performance with large datasets

Access Storybook stories after building:

```bash
npm run storybook
# Opens at http://localhost:6006
```

## Deployment

### Vercel

The application is optimized for Vercel deployment.

```bash
vercel deploy
```

### Storybook Deployment

Storybook is built separately and can be deployed to Vercel, Netlify, or Chromatic:

```bash
npm run build-storybook
vercel deploy storybook-static
```

## Performance

- Optimized component re-renders
- Smooth scrolling with hardware acceleration
- Large dataset virtualization support
- Minimal CSS overhead with Tailwind utility-first approach

## Code Quality

- No unused imports or variables
- Full TypeScript type safety
- Consistent code formatting
- Comprehensive Storybook documentation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Private - Uzence Frontend Assignment

---

**Author**: Utsav Mishra  
**Email**: utsavmishraa005@gmail.com
