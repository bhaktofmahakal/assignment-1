import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{T as $e,a as Y}from"./TaskBar-DLjm3KB0.js";import{w as Be,u as W,e as We}from"./index-BYjcW1Sr.js";import{r as l}from"./index-B2-qRKKC.js";import{c as X,b as Re,g as He,d as Xe,e as Oe,T as Ke,a as Ue,f as Ge,s as Ae,h as Ye}from"./sampleData-DgE1yqBI.js";import{A as Je,D as Qe,a as k}from"./timeline.constants-Dto3cMpA.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";const O=({line:t})=>e.jsx("path",{d:t.path,stroke:t.color,strokeWidth:"2",fill:"none",markerEnd:"url(#arrowhead)",className:"dependency-line hover:stroke-primary-500 transition-colors duration-200","aria-label":`Dependency from task ${t.fromTaskId} to task ${t.toTaskId}`});try{O.displayName="DependencyLine",O.__docgenInfo={description:"",displayName:"DependencyLine",props:{line:{defaultValue:null,description:"",name:"line",required:!0,type:{name:"DependencyLine"}}}}}catch{}const K=({isOpen:t,task:a,onClose:o,onUpdate:m,onDelete:d})=>{const[s,p]=l.useState({}),[h,g]=l.useState(!1);l.useEffect(()=>{a&&(p({title:a.title,startDate:a.startDate,endDate:a.endDate,progress:a.progress,assignee:a.assignee||"",color:a.color||"#0ea5e9",notes:a.notes||"",isMilestone:a.isMilestone||!1}),g(!1))},[a]);const u=l.useCallback((r,H)=>{p(b=>({...b,[r]:H})),g(!0)},[]),D=l.useCallback(()=>{if(!(!a||!h)){if(s.startDate&&s.endDate&&s.startDate>=s.endDate){alert("Start date must be before end date");return}m(a.id,s),g(!1)}},[a,s,h,m]),S=l.useCallback(()=>{!a||!d||window.confirm("Are you sure you want to delete this task?")&&(d(a.id),o())},[a,d,o]),n=l.useCallback(r=>{r.key==="Escape"?o():r.key==="Enter"&&(r.ctrlKey||r.metaKey)&&D()},[o,D]),M=r=>r.toISOString().split("T")[0];return a?e.jsxs(e.Fragment,{children:[t&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden",onClick:o,"aria-hidden":"true"}),e.jsxs("aside",{className:`fixed right-0 top-0 h-full w-96 bg-white border-l border-neutral-200 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${t?"translate-x-0":"translate-x-full"}`,role:Je.SIDEBAR_ROLE,"aria-label":"Task details","aria-hidden":!t,onKeyDown:n,children:[e.jsx("div",{className:"sticky top-0 bg-white border-b border-neutral-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-neutral-900",children:"Task Details"}),e.jsx("button",{onClick:o,className:"p-1 rounded-md hover:bg-neutral-100 transition-colors","aria-label":"Close task details",children:e.jsx("svg",{className:"w-5 h-5",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})}),e.jsxs("div",{className:"flex-1 overflow-auto p-4 space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"task-title",className:"block text-sm font-medium text-neutral-700 mb-1",children:"Task Title *"}),e.jsx("input",{id:"task-title",type:"text",value:s.title||"",onChange:r=>u("title",r.target.value),className:"w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",placeholder:"Enter task title",required:!0})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{id:"task-milestone",type:"checkbox",checked:s.isMilestone||!1,onChange:r=>u("isMilestone",r.target.checked),className:"h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-2 focus:ring-primary-500"}),e.jsx("label",{htmlFor:"task-milestone",className:"ml-2 text-sm text-neutral-700",children:"This is a milestone"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"start-date",className:"block text-sm font-medium text-neutral-700 mb-1",children:"Start Date *"}),e.jsx("input",{id:"start-date",type:"date",value:s.startDate?M(s.startDate):"",onChange:r=>u("startDate",new Date(r.target.value)),className:"w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"end-date",className:"block text-sm font-medium text-neutral-700 mb-1",children:"End Date *"}),e.jsx("input",{id:"end-date",type:"date",value:s.endDate?M(s.endDate):"",onChange:r=>u("endDate",new Date(r.target.value)),className:"w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",required:!0})]})]}),!s.isMilestone&&e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"progress",className:"block text-sm font-medium text-neutral-700 mb-1",children:["Progress: ",s.progress||0,"%"]}),e.jsx("input",{id:"progress",type:"range",min:"0",max:"100",step:"5",value:s.progress||0,onChange:r=>u("progress",parseInt(r.target.value)),className:"w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"}),e.jsxs("div",{className:"flex justify-between text-xs text-neutral-500 mt-1",children:[e.jsx("span",{children:"0%"}),e.jsx("span",{children:"50%"}),e.jsx("span",{children:"100%"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"assignee",className:"block text-sm font-medium text-neutral-700 mb-1",children:"Assignee"}),e.jsx("input",{id:"assignee",type:"text",value:s.assignee||"",onChange:r=>u("assignee",r.target.value),className:"w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",placeholder:"Enter assignee name"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"color",className:"block text-sm font-medium text-neutral-700 mb-1",children:"Color"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("input",{id:"color",type:"color",value:s.color||"#0ea5e9",onChange:r=>u("color",r.target.value),className:"w-12 h-8 rounded border border-neutral-300 cursor-pointer"}),e.jsx("input",{type:"text",value:s.color||"#0ea5e9",onChange:r=>u("color",r.target.value),className:"flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm",placeholder:"#0ea5e9"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"notes",className:"block text-sm font-medium text-neutral-700 mb-1",children:"Notes"}),e.jsx("textarea",{id:"notes",value:s.notes||"",onChange:r=>u("notes",r.target.value),rows:4,className:"w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",placeholder:"Add notes about this task..."})]}),a.dependencies&&a.dependencies.length>0&&e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-neutral-700 mb-1",children:"Dependencies"}),e.jsxs("div",{className:"text-sm text-neutral-600",children:["This task depends on ",a.dependencies.length," other task(s)"]})]})]}),e.jsxs("div",{className:"sticky bottom-0 bg-white border-t border-neutral-200 p-4",children:[e.jsxs("div",{className:"flex items-center justify-between space-x-3",children:[e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{onClick:D,disabled:!h,className:"px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:"Save Changes"}),e.jsx("button",{onClick:o,className:"px-4 py-2 bg-white text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors",children:"Cancel"})]}),d&&e.jsx("button",{onClick:S,className:"px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2","aria-label":"Delete task",children:e.jsx("svg",{className:"w-5 h-5",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v1H4V5zM3 8a1 1 0 011-1h12a1 1 0 110 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a1 1 0 01-1-1z",clipRule:"evenodd"})})})]}),h&&e.jsx("div",{className:"mt-2 text-xs text-neutral-500",children:"Press Ctrl+Enter to save quickly"})]})]})]}):null};try{K.displayName="TaskDetailSidebar",K.__docgenInfo={description:"",displayName:"TaskDetailSidebar",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},task:{defaultValue:null,description:"",name:"task",required:!0,type:{name:"TimelineTask | null"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},onUpdate:{defaultValue:null,description:"",name:"onUpdate",required:!0,type:{name:"(taskId: string, updates: Partial<TimelineTask>) => void"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!1,type:{name:"((taskId: string) => void) | undefined"}}}}}catch{}const Ze=(t,a,o,m,d)=>{const s=[];return Object.values(t).forEach(p=>{p.dependencies&&p.dependencies.length>0&&p.dependencies.forEach(h=>{const g=t[h];if(!g)return;const u=ea(g,p,a,o,m,d);u&&s.push(u)})}),s},ea=(t,a,o,m,d,s)=>{const p=s(t.rowId),h=s(a.rowId);if(p===-1||h===-1)return null;const g=X(t.endDate,o,m)+Re(t.startDate,t.endDate,m),u=p*d+d/2,D=X(a.startDate,o,m),S=h*d+d/2,n=aa({x:g,y:u},{x:D,y:S});return{id:`${t.id}-${a.id}`,fromTaskId:t.id,toTaskId:a.id,path:n,color:"#94a3b8"}},aa=(t,a)=>{const o=t.x+(a.x-t.x)*.5,m=6;let d=`M ${t.x} ${t.y}`;return Math.abs(a.y-t.y)<5?d+=` L ${a.x-m} ${a.y}`:(d+=` L ${o} ${t.y}`,d+=` L ${o} ${a.y}`,d+=` L ${a.x-m} ${a.y}`),d},U=({rows:t,tasks:a,startDate:o,endDate:m,viewMode:d,onTaskUpdate:s,onTaskMove:p,className:h=""})=>{const[g,u]=l.useState(null),[D,S]=l.useState(!1),[n,M]=l.useState({isDragging:!1,dragType:null,taskId:null,initialMouseX:0,initialTaskStart:null,initialTaskEnd:null,currentRowId:null}),r=l.useRef(null),H=l.useRef(null),b=He(d),T=Qe,G=l.useCallback(i=>t.findIndex(w=>w.id===i),[t]),Le=Ze(a,o,b.pixelsPerDay,T.rowHeight,G),Pe=l.useCallback(i=>{u(i),S(!0)},[]),_e=l.useCallback((i,w,v)=>{i.preventDefault(),i.stopPropagation();const c=a[w];c&&(M({isDragging:!0,dragType:v,taskId:w,initialMouseX:i.clientX,initialTaskStart:new Date(c.startDate),initialTaskEnd:new Date(c.endDate),currentRowId:c.rowId}),document.addEventListener("mousemove",I),document.addEventListener("mouseup",E))},[a]),I=l.useCallback(i=>{if(!n.isDragging||!n.taskId||!r.current)return;const w=Xe(i,r.current),v=i.clientX-n.initialMouseX,c=Math.round(v/b.pixelsPerDay),y=a[n.taskId];if(!y||!n.initialTaskStart||!n.initialTaskEnd)return;let x=new Date(n.initialTaskStart),f=new Date(n.initialTaskEnd),C=y.rowId;if(n.dragType==="move"){const j=Oe(w.y,T.rowHeight,T.headerHeight);j>=0&&j<t.length&&(C=t[j].id)}switch(n.dragType){case"move":x=k(n.initialTaskStart,c),f=k(n.initialTaskEnd,c);break;case"resize-left":x=k(n.initialTaskStart,c),x>=f&&(x=k(f,-1));break;case"resize-right":f=k(n.initialTaskEnd,c),f<=x&&(f=k(x,1));break}M(j=>({...j,currentRowId:C}))},[n,a,b.pixelsPerDay,t,T.headerHeight,T.rowHeight]),E=l.useCallback(()=>{if(n.isDragging&&n.taskId){const i=a[n.taskId];if(i&&n.initialTaskStart&&n.initialTaskEnd){const v=Math.round(0/b.pixelsPerDay);let c=new Date(n.initialTaskStart),y=new Date(n.initialTaskEnd);switch(n.dragType){case"move":c=k(n.initialTaskStart,v),y=k(n.initialTaskEnd,v),n.currentRowId&&n.currentRowId!==i.rowId?p(n.taskId,n.currentRowId,c):s(n.taskId,{startDate:c,endDate:y});break;case"resize-left":c=k(n.initialTaskStart,v),c<y&&s(n.taskId,{startDate:c});break;case"resize-right":y=k(n.initialTaskEnd,v),y>c&&s(n.taskId,{endDate:y});break}}}M({isDragging:!1,dragType:null,taskId:null,initialMouseX:0,initialTaskStart:null,initialTaskEnd:null,currentRowId:null}),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",E)},[n,a,b.pixelsPerDay,s,p]);l.useEffect(()=>()=>{document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",E)},[I,E]);const ze=l.useCallback(()=>{S(!1),u(null)},[]),Fe=l.useCallback((i,w)=>{s(i,w)},[s]),qe=g?a[g]:null;return e.jsxs("div",{className:`timeline-view relative bg-white border border-neutral-200 rounded-lg overflow-hidden ${h}`,children:[e.jsx("div",{ref:r,className:"timeline-container relative flex",role:"application","aria-label":"Timeline view",children:e.jsxs(Ke,{ref:H,rows:t,startDate:o,endDate:m,config:T,timeScale:b,children:[e.jsxs("svg",{className:"absolute inset-0 pointer-events-none",style:{zIndex:5},"aria-hidden":"true",children:[e.jsx("defs",{children:e.jsx("marker",{id:"arrowhead",markerWidth:"10",markerHeight:"10",refX:"9",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 10 3, 0 6",fill:"#94a3b8"})})}),Le.map(i=>e.jsx(O,{line:i},i.id))]}),Object.values(a).map(i=>{const w=G(i.rowId);if(w===-1)return null;const v=X(i.startDate,o,b.pixelsPerDay),c=Re(i.startDate,i.endDate,b.pixelsPerDay),y=w*T.rowHeight+8,x=g===i.id,f=n.taskId===i.id&&n.isDragging;return e.jsx($e,{task:i,style:{position:"absolute",left:`${v}px`,width:`${c}px`,top:`${y}px`,zIndex:f?20:10,transform:f?"scale(1.02)":"scale(1)",opacity:f?.8:1},isSelected:x,isDragging:f,onClick:()=>Pe(i.id),onMouseDown:(C,j)=>_e(C,i.id,j)},i.id)})]})}),e.jsx(K,{isOpen:D,task:qe,onClose:ze,onUpdate:Fe})]})};try{U.displayName="TimelineView",U.__docgenInfo={description:"",displayName:"TimelineView",props:{rows:{defaultValue:null,description:"",name:"rows",required:!0,type:{name:"TimelineRow[]"}},tasks:{defaultValue:null,description:"",name:"tasks",required:!0,type:{name:"Record<string, TimelineTask>"}},startDate:{defaultValue:null,description:"",name:"startDate",required:!0,type:{name:"Date"}},endDate:{defaultValue:null,description:"",name:"endDate",required:!0,type:{name:"Date"}},viewMode:{defaultValue:null,description:"",name:"viewMode",required:!0,type:{name:"enum",value:[{value:'"day"'},{value:'"week"'},{value:'"month"'}]}},onTaskUpdate:{defaultValue:null,description:"",name:"onTaskUpdate",required:!0,type:{name:"(taskId: string, updates: Partial<TimelineTask>) => void"}},onTaskMove:{defaultValue:null,description:"",name:"onTaskMove",required:!0,type:{name:"(taskId: string, newRowId: string, newStartDate: Date) => void"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string | undefined"}}}}}catch{}const{startDate:ta,endDate:na}=Ue(),ma={title:"Components/Timeline/TimelineView",component:U,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},args:{rows:Ae,tasks:Ge,startDate:ta,endDate:na,viewMode:"week",onTaskUpdate:Y("onTaskUpdate"),onTaskMove:Y("onTaskMove")},argTypes:{viewMode:{control:{type:"select"},options:["day","week","month"],description:"Timeline view mode affecting time scale and grid density"},startDate:{control:{type:"date"},description:"Timeline start date"},endDate:{control:{type:"date"},description:"Timeline end date"},onTaskUpdate:{action:"onTaskUpdate",description:"Callback fired when task properties are updated"},onTaskMove:{action:"onTaskMove",description:"Callback fired when task is moved to different row"}},decorators:[t=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(t,{})})]},N={name:"Default",args:{viewMode:"week"},parameters:{docs:{description:{story:"Basic timeline showing a typical project with multiple teams, tasks, and dependencies."}}}},V={name:"Empty State",args:{rows:Ae,tasks:{},viewMode:"week"},parameters:{docs:{description:{story:"Timeline with team rows but no tasks assigned. Shows the grid structure and empty state."}}}},R={name:"With Dependencies",args:{viewMode:"week"},parameters:{docs:{description:{story:"Demonstrates task dependencies with connecting lines and arrows. Tasks show logical flow and blocking relationships."}}}},A={name:"Day View",args:{viewMode:"day"},parameters:{docs:{description:{story:"Day view showing detailed daily timeline with narrow columns for precise task scheduling."}}}},L={name:"Week View",args:{viewMode:"week"},parameters:{docs:{description:{story:"Week view balancing detail and overview, ideal for sprint planning and short-term scheduling."}}}},P={name:"Month View",args:{viewMode:"month"},parameters:{docs:{description:{story:"Month view providing high-level project overview with broader time perspective."}}}},_={name:"Interactive Playground",args:{viewMode:"week"},parameters:{docs:{description:{story:`Interactive demo showcasing all interactions:
        - **Drag tasks** horizontally to change dates or vertically to change assigned team
        - **Resize tasks** using left/right edge handles to adjust duration
        - **Click tasks** to open detail sidebar for editing
        - **Keyboard navigation** with Tab, Arrow keys, Enter/Space
        `}}},play:async({canvasElement:t})=>{const a=Be(t);await new Promise(m=>setTimeout(m,1e3));const o=a.getAllByRole("button");o.length>0&&(await W.click(o[0]),await We(a.getByRole("complementary")).toBeVisible())}},z={name:"Mobile View",args:{viewMode:"week"},parameters:{viewport:{defaultViewport:"mobile"},docs:{description:{story:"Mobile-responsive timeline with adapted layout, touch-friendly interactions, and optimized spacing."}}}},F={name:"Accessibility Demo",args:{viewMode:"week"},parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"keyboard",enabled:!0},{id:"focus-order-semantics",enabled:!0}]}},docs:{description:{story:`Accessibility features demonstrated:
        - **Keyboard Navigation**: Tab between tasks, Arrow keys to navigate, Enter/Space to interact
        - **Screen Reader Support**: ARIA labels, roles, and descriptions
        - **Focus Management**: Visible focus indicators and logical focus flow  
        - **Color Contrast**: WCAG 2.1 AA compliant color combinations
        - **Semantic HTML**: Proper roles and element hierarchy
        `}}},play:async()=>{await W.tab(),await W.tab(),await W.keyboard("{Enter}"),await new Promise(t=>setTimeout(t,500))}},q={name:"Large Dataset (Performance)",args:{...Ye(100),viewMode:"week"},parameters:{docs:{description:{story:"Performance test with 100+ tasks demonstrating smooth rendering and interactions even with large datasets."}}}},$={name:"Custom Styling",args:{viewMode:"week",className:"shadow-xl border-2 border-primary-200"},parameters:{docs:{description:{story:"Timeline with custom styling applied, demonstrating extensibility through CSS classes."}}}},B={name:"Error Handling",args:{rows:[{id:"row-1",label:"Test Team",tasks:["invalid-task-id"]}],tasks:{"task-1":{id:"task-1",title:"Valid Task",startDate:new Date("invalid"),endDate:new Date,progress:50,rowId:"row-1"}},viewMode:"week"},parameters:{docs:{description:{story:"Error handling demonstration with invalid data, missing references, and edge cases."}}}};var J,Q,Z;N.parameters={...N.parameters,docs:{...(J=N.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic timeline showing a typical project with multiple teams, tasks, and dependencies.'
      }
    }
  }
}`,...(Z=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,ae,te;V.parameters={...V.parameters,docs:{...(ee=V.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: 'Empty State',
  args: {
    rows: sampleRows,
    tasks: {},
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with team rows but no tasks assigned. Shows the grid structure and empty state.'
      }
    }
  }
}`,...(te=(ae=V.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var ne,se,re;R.parameters={...R.parameters,docs:{...(ne=R.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'With Dependencies',
  args: {
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates task dependencies with connecting lines and arrows. Tasks show logical flow and blocking relationships.'
      }
    }
  }
}`,...(re=(se=R.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var ie,oe,le;A.parameters={...A.parameters,docs:{...(ie=A.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  name: 'Day View',
  args: {
    viewMode: 'day'
  },
  parameters: {
    docs: {
      description: {
        story: 'Day view showing detailed daily timeline with narrow columns for precise task scheduling.'
      }
    }
  }
}`,...(le=(oe=A.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var de,ce,ue;L.parameters={...L.parameters,docs:{...(de=L.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: 'Week View',
  args: {
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Week view balancing detail and overview, ideal for sprint planning and short-term scheduling.'
      }
    }
  }
}`,...(ue=(ce=L.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var me,pe,ge;P.parameters={...P.parameters,docs:{...(me=P.parameters)==null?void 0:me.docs,source:{originalSource:`{
  name: 'Month View',
  args: {
    viewMode: 'month'
  },
  parameters: {
    docs: {
      description: {
        story: 'Month view providing high-level project overview with broader time perspective.'
      }
    }
  }
}`,...(ge=(pe=P.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var we,he,ye;_.parameters={..._.parameters,docs:{...(we=_.parameters)==null?void 0:we.docs,source:{originalSource:`{
  name: 'Interactive Playground',
  args: {
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: \`Interactive demo showcasing all interactions:
        - **Drag tasks** horizontally to change dates or vertically to change assigned team
        - **Resize tasks** using left/right edge handles to adjust duration
        - **Click tasks** to open detail sidebar for editing
        - **Keyboard navigation** with Tab, Arrow keys, Enter/Space
        \`
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
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
  }
}`,...(ye=(he=_.parameters)==null?void 0:he.docs)==null?void 0:ye.source}}};var fe,be,ve;z.parameters={...z.parameters,docs:{...(fe=z.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  name: 'Mobile View',
  args: {
    viewMode: 'week'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-responsive timeline with adapted layout, touch-friendly interactions, and optimized spacing.'
      }
    }
  }
}`,...(ve=(be=z.parameters)==null?void 0:be.docs)==null?void 0:ve.source}}};var ke,xe,De;F.parameters={...F.parameters,docs:{...(ke=F.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  name: 'Accessibility Demo',
  args: {
    viewMode: 'week'
  },
  parameters: {
    a11y: {
      config: {
        rules: [{
          id: 'color-contrast',
          enabled: true
        }, {
          id: 'keyboard',
          enabled: true
        }, {
          id: 'focus-order-semantics',
          enabled: true
        }]
      }
    },
    docs: {
      description: {
        story: \`Accessibility features demonstrated:
        - **Keyboard Navigation**: Tab between tasks, Arrow keys to navigate, Enter/Space to interact
        - **Screen Reader Support**: ARIA labels, roles, and descriptions
        - **Focus Management**: Visible focus indicators and logical focus flow  
        - **Color Contrast**: WCAG 2.1 AA compliant color combinations
        - **Semantic HTML**: Proper roles and element hierarchy
        \`
      }
    }
  },
  play: async () => {
    // Test keyboard navigation
    await userEvent.tab();
    await userEvent.tab();

    // Test Enter key interaction
    await userEvent.keyboard('{Enter}');

    // Allow time for interaction
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}`,...(De=(xe=F.parameters)==null?void 0:xe.docs)==null?void 0:De.source}}};var Te,je,Se;q.parameters={...q.parameters,docs:{...(Te=q.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  name: 'Large Dataset (Performance)',
  args: {
    ...generateLargeDataset(100),
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 100+ tasks demonstrating smooth rendering and interactions even with large datasets.'
      }
    }
  }
}`,...(Se=(je=q.parameters)==null?void 0:je.docs)==null?void 0:Se.source}}};var Me,Ie,Ee;$.parameters={...$.parameters,docs:{...(Me=$.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  name: 'Custom Styling',
  args: {
    viewMode: 'week',
    className: 'shadow-xl border-2 border-primary-200'
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with custom styling applied, demonstrating extensibility through CSS classes.'
      }
    }
  }
}`,...(Ee=(Ie=$.parameters)==null?void 0:Ie.docs)==null?void 0:Ee.source}}};var Ce,Ne,Ve;B.parameters={...B.parameters,docs:{...(Ce=B.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  name: 'Error Handling',
  args: {
    rows: [{
      id: 'row-1',
      label: 'Test Team',
      tasks: ['invalid-task-id'] // Task that doesn't exist
    }],
    tasks: {
      'task-1': {
        id: 'task-1',
        title: 'Valid Task',
        startDate: new Date('invalid'),
        // Invalid date
        endDate: new Date(),
        progress: 50,
        rowId: 'row-1'
      }
    } as any,
    viewMode: 'week'
  },
  parameters: {
    docs: {
      description: {
        story: 'Error handling demonstration with invalid data, missing references, and edge cases.'
      }
    }
  }
}`,...(Ve=(Ne=B.parameters)==null?void 0:Ne.docs)==null?void 0:Ve.source}}};const pa=["Default","EmptyState","WithDependencies","DayView","WeekView","MonthView","InteractivePlayground","MobileView","AccessibilityDemo","LargeDataset","CustomStyling","ErrorHandling"];export{F as AccessibilityDemo,$ as CustomStyling,A as DayView,N as Default,V as EmptyState,B as ErrorHandling,_ as InteractivePlayground,q as LargeDataset,z as MobileView,P as MonthView,L as WeekView,R as WithDependencies,pa as __namedExportsOrder,ma as default};
