# Uzence Frontend Assignment — Timeline View

## Overview
Build a **Timeline View** UI component **from scratch** using **React, TypeScript, Tailwind CSS, and Storybook**.

This component should display tasks on a timeline grid with different view modes, support basic interactions (drag, resize), and demonstrate clean, scalable, and accessible frontend engineering practices.

---

## Tech Stack (Mandatory)
You **must** use only the following:
- **React (with TypeScript)**
- **Tailwind CSS**
- **Storybook**

> Do **not** use any pre-built component libraries (e.g., Radix, Material UI, Chakra UI, Ant Design, ShadCN).
>  
> Do **not** use AI-based or visual builders (e.g., Lovable, v0.dev, Plasmic).

Assignments not following these restrictions will be rejected.

---

## Objective
Create a **Timeline View** that can:
- Visually represent tasks/events across time.
- Support multiple view modes (e.g., Day / Week / Month).
- Handle user interactions like drag, resize, and selection.
- Provide accessible and responsive UX.
- Demonstrate Storybook-driven development.

---

## Component Requirements

### 1. Timeline Layout
- Horizontal time axis with labeled intervals (based on selected view mode).
- Vertical rows for tasks or resource groups.
- Grid alignment with time divisions.
- Smooth horizontal and vertical scrolling.

### 2. Task Bars
- Each task should display as a **bar** positioned based on start and end dates.
- Bars should show title and progress visually.
- Include rounded corners and hover/active effects (Tailwind only).
- Keyboard accessibility:
  - `Tab` focus between tasks.
  - `Enter`/`Space` opens sidebar or triggers edit mode.
  - Arrow keys move focus between tasks.

### 3. Interactions
- **Drag**: Move task horizontally to change start date.
- **Resize**: Adjust task start/end via left/right handles.
- **Click**: Open a sidebar/modal with editable details.
- **Keyboard Navigation**: Optional but adds bonus points.

### 4. View Modes
- Toggle between Day / Week / Month.
- Dynamically update the time scale and grid accordingly.

### 5. Dependencies (Bonus)
- Show lines connecting dependent tasks (end → start).
- Use SVG lines or paths within the same scrollable container.

### 6. Sidebar (Bonus)
- Lazy-loaded panel to edit task details (title, dates, progress).
- Can be a simple right-side overlay.

### 7. Accessibility
- Use semantic roles and `aria-labels`.
- Ensure the component is keyboard-navigable.
- Storybook accessibility addon is a plus.

---

## Storybook Requirements
Include **at least 7 stories**:

| Story Name | Description |
|-------------|-------------|
| **Default** | Basic timeline with sample tasks |
| **Empty State** | Timeline with no tasks |
| **With Dependencies** | Shows tasks connected by dependency lines |
| **View Modes** | Toggle between day, week, month views |
| **Interactive Playground** | Drag, resize, and edit |
| **Mobile View** | Responsive design demonstration |
| **Accessibility** | Keyboard navigation and aria roles |
| **(Bonus)** Large Dataset | 30+ tasks with virtualization/performance optimization |

Each story should be isolated, reproducible, and documented with args/controls.

---

## Utility Functions (Suggested)
Implement your own date/position helpers (in `/utils`):
- `calculatePosition(date, startDate, pixelsPerDay)`
- `calculateDuration(start, end, pixelsPerDay)`
- `calculateDateFromPosition(x, startDate, pixelsPerDay)`

No third-party date libraries (e.g., `moment`, `date-fns`) are allowed.

---

## Folder Structure (Suggested)
```

src/
├─ components/
│   └─ Timeline/
│        ├─ TimelineView.tsx
│        ├─ TaskBar.tsx
│        ├─ Sidebar.tsx
│        └─ index.ts
├─ utils/
│   └─ position.utils.ts
├─ types/
│   └─ timeline.types.ts
├─ stories/
│   └─ TimelineView.stories.tsx
├─ App.tsx
└─ main.tsx

```

---

## Evaluation Criteria

| Criteria | Description | Weight |
|-----------|--------------|--------|
| **Code Quality** | Clean, modular, reusable React + TypeScript code | 30% |
| **UI & UX** | Responsive, pixel-perfect, visually consistent | 20% |
| **Functionality** | Interactions (drag/resize/view modes) | 20% |
| **Accessibility** | Keyboard + screen reader support | 10% |
| **Storybook Documentation** | Well-structured stories + controls | 10% |
| **Performance & Scalability** | Efficient re-renders, smooth scroll | 10% |

---

## Setup & Scripts
```

npm install
npm run dev
npm run storybook
npm run build

```

> Configure `tsconfig.json` with `"strict": true` and `"jsx": "react-jsx"`  
> Use Tailwind for all styling (`@apply`, utility classes, responsive variants).

---

## Submission Instructions
1. Push your code to a **public GitHub repository**.
2. Include a clear **README.md** with:
   - Setup instructions
   - Tech stack
   - Storybook link (hosted on Vercel / Netlify / Chromatic)
   - Notes (if any)
3. Submit your **GitHub repo link** + **Storybook live link** before:
   > **01 November 2025, 11:59 PM IST**

---

## Submission Checklist
- [ ] Built using React + TypeScript + Tailwind + Storybook  
- [ ] No external UI libraries or AI builders  
- [ ] Timeline grid with at least 10+ tasks  
- [ ] Drag, resize, and keyboard interactions  
- [ ] Storybook with 7+ stories  
- [ ] Responsive design tested (desktop + mobile)  
- [ ] Accessible and semantic HTML structure  
- [ ] README with Storybook deploy link  
- [ ] Code passes npm run build with no errors  

---

**Thank you for your time and effort — we’re excited to review your submission!**  
**– Team Uzence**
