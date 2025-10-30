import{j as m}from"./jsx-runtime-DF2Pcvd1.js";import{g as n,a as k,s as v,T as E}from"./sampleData-DgE1yqBI.js";import{D as x}from"./timeline.constants-Dto3cMpA.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const{startDate:V,endDate:R}=k(),A={title:"Components/Timeline/TimelineGrid",component:E,parameters:{layout:"fullscreen",docs:{description:{component:`
# TimelineGrid Component

The foundational grid component that renders the timeline structure including:
- Left panel with row labels and avatars
- Time axis header with date/time labels  
- Grid lines for visual alignment
- Scrollable content area

This component provides the layout foundation for tasks and other timeline elements.
        `}}},args:{rows:v,startDate:V,endDate:R,config:x,timeScale:n("week")},argTypes:{},decorators:[i=>m.jsx("div",{style:{height:"500px",width:"100%"},children:m.jsx(i,{})})]},e={name:"Default Grid",args:{}},a={name:"Day View Grid",args:{viewMode:"day",timeScale:n("day")}},r={name:"Month View Grid",args:{viewMode:"month",timeScale:n("month")}},s={name:"Empty Grid (No Tasks)",args:{tasks:{}}},t={name:"Many Rows",args:{rows:Array.from({length:12},(i,o)=>({id:`row-${o+1}`,label:`Team ${o+1}`,avatar:`https://images.unsplash.com/photo-${15e11+o}?w=32&h=32&fit=crop&crop=face`,tasks:[]})),tasks:{}}};var c,d,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Default Grid',
  args: {}
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,g,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Day View Grid',
  args: {
    viewMode: 'day',
    timeScale: getTimeScale('day')
  }
}`,...(u=(g=a.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var h,w,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Month View Grid',
  args: {
    viewMode: 'month',
    timeScale: getTimeScale('month')
  }
}`,...(y=(w=r.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,T,G;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Empty Grid (No Tasks)',
  args: {
    tasks: {}
  }
}`,...(G=(T=s.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var S,M,D;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Many Rows',
  args: {
    rows: Array.from({
      length: 12
    }, (_, i) => ({
      id: \`row-\${i + 1}\`,
      label: \`Team \${i + 1}\`,
      avatar: \`https://images.unsplash.com/photo-\${1500000000000 + i}?w=32&h=32&fit=crop&crop=face\`,
      tasks: []
    })),
    tasks: {}
  }
}`,...(D=(M=t.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};const C=["Default","DayView","MonthView","EmptyGrid","ManyRows"];export{a as DayView,e as Default,s as EmptyGrid,t as ManyRows,r as MonthView,C as __namedExportsOrder,A as default};
