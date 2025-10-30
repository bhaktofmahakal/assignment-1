import{j as s}from"./jsx-runtime-DF2Pcvd1.js";import{a as g,T as _}from"./TaskBar-DLjm3KB0.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./timeline.constants-Dto3cMpA.js";const e={id:"story-task-1",title:"Sample Task",startDate:new Date("2025-01-01"),endDate:new Date("2025-01-10"),progress:60,assignee:"John Doe",rowId:"row-1",color:"#0d67f8ff",isMilestone:!1,dependencies:[]},N={title:"Components/Timeline/TaskBar",component:_,parameters:{layout:"centered",docs:{description:{component:`
# TaskBar Component

Individual task representation in the timeline. Supports drag and drop, resize handles, 
progress indication, and various visual states.

## Features

- **Progress Visualization**: Progress bar overlay showing completion percentage
- **Drag Handles**: Left and right resize handles for duration adjustment  
- **Visual States**: Hover, selected, dragging states with appropriate styling
- **Accessibility**: Full keyboard support and ARIA attributes
- **Milestones**: Special diamond styling for milestone tasks
        `}}},args:{task:e,onClick:g("onClick"),onMouseDown:g("onMouseDown"),isSelected:!1,isDragging:!1},argTypes:{task:{description:"Task data object containing all task properties"},isSelected:{control:{type:"boolean"},description:"Whether the task is currently selected"},isDragging:{control:{type:"boolean"},description:"Whether the task is currently being dragged"},onClick:{action:"onClick",description:"Callback fired when task is clicked"},onMouseDown:{action:"onMouseDown",description:"Callback fired when mouse down on drag handles"}},decorators:[r=>s.jsx("div",{style:{width:"300px",height:"60px",position:"relative",padding:"20px"},children:s.jsx(r,{})})]},o={name:"Default Task",args:{}},a={name:"Selected Task",args:{isSelected:!0}},t={name:"Dragging Task",args:{isDragging:!0}},n={name:"High Progress (90%)",args:{task:{...e,progress:90,color:"#10b981"}}},i={name:"Low Progress (15%)",args:{task:{...e,progress:15,color:"#ef4444"}}},l={name:"Completed Task (100%)",args:{task:{...e,progress:100,color:"#059669",title:"Completed Task"}}},c={name:"Milestone Task",args:{task:{...e,title:"Project Milestone",isMilestone:!0,color:"#f97316",progress:0}}},p={name:"Long Title Task",args:{task:{...e,title:"This is a very long task title that should be truncated properly",color:"#8b5cf6"}}},d={name:"Custom Color Variants",render:()=>s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[{color:"#ec4899",title:"Pink Task"},{color:"#06b6d4",title:"Cyan Task"},{color:"#84cc16",title:"Lime Task"},{color:"#f59e0b",title:"Amber Task"},{color:"#6366f1",title:"Indigo Task"}].map((r,m)=>s.jsx("div",{style:{position:"relative",height:"40px"},children:s.jsx(_,{task:{...e,id:`color-task-${m}`,title:r.title,color:r.color},onClick:g("onClick"),onMouseDown:g("onMouseDown"),style:{left:"0px",width:"200px",top:"0px",height:"32px"},isSelected:!1,isDragging:!1})},m))})};var k,u,T;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Default Task',
  args: {}
}`,...(T=(u=o.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};var h,f,x;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Selected Task',
  args: {
    isSelected: true
  }
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var D,y,C;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Dragging Task',
  args: {
    isDragging: true
  }
}`,...(C=(y=t.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var w,S,b;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'High Progress (90%)',
  args: {
    task: {
      ...sampleTask,
      progress: 90,
      color: '#10b981'
    }
  }
}`,...(b=(S=n.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var v,M,P;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Low Progress (15%)',
  args: {
    task: {
      ...sampleTask,
      progress: 15,
      color: '#ef4444'
    }
  }
}`,...(P=(M=i.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var j,L,H;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Completed Task (100%)',
  args: {
    task: {
      ...sampleTask,
      progress: 100,
      color: '#059669',
      title: 'Completed Task'
    }
  }
}`,...(H=(L=l.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var A,I,B;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Milestone Task',
  args: {
    task: {
      ...sampleTask,
      title: 'Project Milestone',
      isMilestone: true,
      color: '#f97316',
      progress: 0
    }
  }
}`,...(B=(I=c.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};var V,z,E;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Long Title Task',
  args: {
    task: {
      ...sampleTask,
      title: 'This is a very long task title that should be truncated properly',
      color: '#8b5cf6'
    }
  }
}`,...(E=(z=p.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,R,W;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Custom Color Variants',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }}>\r
      {[{
      color: '#ec4899',
      title: 'Pink Task'
    }, {
      color: '#06b6d4',
      title: 'Cyan Task'
    }, {
      color: '#84cc16',
      title: 'Lime Task'
    }, {
      color: '#f59e0b',
      title: 'Amber Task'
    }, {
      color: '#6366f1',
      title: 'Indigo Task'
    }].map((variant, index) => <div key={index} style={{
      position: 'relative',
      height: '40px'
    }}>\r
          <TaskBar task={{
        ...sampleTask,
        id: \`color-task-\${index}\`,
        title: variant.title,
        color: variant.color
      }} onClick={action('onClick')} onMouseDown={action('onMouseDown')} style={{
        left: '0px',
        width: '200px',
        top: '0px',
        height: '32px'
      }} isSelected={false} isDragging={false} />\r
        </div>)}\r
    </div>
}`,...(W=(R=d.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const Q=["Default","Selected","Dragging","HighProgress","LowProgress","Completed","Milestone","LongTitle","CustomColors"];export{l as Completed,d as CustomColors,o as Default,t as Dragging,n as HighProgress,p as LongTitle,i as LowProgress,c as Milestone,a as Selected,Q as __namedExportsOrder,N as default};
