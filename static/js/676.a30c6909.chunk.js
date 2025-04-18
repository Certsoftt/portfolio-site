"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[676],{1676:(e,r,a)=>{a.r(r),a.d(r,{default:()=>O});var s=a(1319),n=a(4647),i=a(9281),t=a(1362),l=a(5043),d=a(6545);const o={name:"",email:"",message:""};function m(e){let r={};return e.name||(r.name="Name is required"),e.email?/\S+@\S+\.\S+/.test(e.email)||(r.email="Email address is invalid"):r.email="Email address is required",e.message||(r.message="Message is required"),r}var c=a(5639),h=a(2119);const p=(0,h.Ay)("p")`
  margin-top: 1.5rem;
`,x=(0,h.Ay)("div")`
  position: relative;
  max-width: 700px;
`,g=(0,h.Ay)("div")`
  border-radius: 3rem;
  max-width: 400px;
`;var u=a(579);const y=(0,i.C)()((e=>{let{title:r,content:a,t:s}=e;return(0,u.jsxs)(x,{children:[(0,u.jsx)("h6",{children:s(r)}),(0,u.jsx)(g,{children:(0,u.jsx)(p,{children:s(a)})})]})})),j=(0,h.Ay)("div")`
  display: inline-block;
  width: 100%;
  padding: 10px 5px;
`,v=(0,h.Ay)("input")`
  font-size: 0.875rem;
`,b=(0,h.Ay)("div")`
  display: inline-block;
  width: 100%;
  padding: 10px 5px;
  margin-bottom: -0.625rem;
`,A=(0,h.Ay)("textarea")`
  resize: none;
  font-size: 0.875rem;
  height: 185px;
`,f=(0,h.Ay)("label")`
  display: block;
  padding-bottom: 10px;
  text-transform: capitalize;
`,C=(0,i.C)()((e=>{let{name:r,placeholder:a,onChange:s,t:n}=e;return(0,u.jsxs)(j,{children:[(0,u.jsx)(f,{htmlFor:r,children:n(r)}),(0,u.jsx)(v,{placeholder:n(a),name:r,id:r,onChange:s})]})})),w=(0,i.C)()((e=>{let{name:r,placeholder:a,onChange:s,t:n}=e;return(0,u.jsxs)(b,{children:[(0,u.jsx)(f,{htmlFor:r,children:n(r)}),(0,u.jsx)(A,{placeholder:n(a),id:r,name:r,onChange:s})]})})),S=(0,h.Ay)("div")`
  padding: 5rem 0;

  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
`,k=(0,h.Ay)("form")`
  width: 100%;
  max-width: 520px;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`,q=(0,h.Ay)("span")`
  display: block;
  font-weight: 600;
  color: rgb(255, 130, 92);
  height: 0.775rem;
  padding: 0 0.675rem;
`,E=(0,h.Ay)("div")`
  text-align: end;
  position: relative;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`,O=(0,i.C)()((e=>{let{title:r,content:a,id:i,t:h}=e;const{values:p,errors:x,handleChange:g,handleSubmit:j}=(e=>{const[r,a]=(0,l.useState)({values:{...o},errors:{...o}});return{handleChange:e=>{e.persist();const{name:r,value:s}=e.target;a((e=>({...e,values:{...e.values,[r]:s},errors:{...e.errors,[r]:""}})))},handleSubmit:async s=>{s.preventDefault();const n=r.values,i=e(n);a((e=>({...e,errors:i})));try{Object.values(i).every((e=>""===e))&&((await fetch("",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).ok?(s.target.reset(),a((()=>({values:{...o},errors:{...o}}))),d.A.success({message:"Success",description:"Your message has been sent!"})):d.A.error({message:"Error",description:"There was an error sending your message, please try again later."}))}catch(t){d.A.error({message:"Error",description:"Failed to submit form. Please try again later."})}},values:r.values,errors:r.errors}})(m),v=e=>{let{type:r}=e;const a=x[r];return(0,u.jsx)(q,{children:a})};return(0,u.jsx)(S,{id:i,children:(0,u.jsxs)(s.A,{justify:"space-between",align:"middle",children:[(0,u.jsx)(n.A,{lg:12,md:11,sm:24,xs:24,children:(0,u.jsx)(t.q7,{direction:"left",triggerOnce:!0,children:(0,u.jsx)(y,{title:r,content:a})})}),(0,u.jsx)(n.A,{lg:12,md:12,sm:24,xs:24,children:(0,u.jsx)(t.q7,{direction:"right",triggerOnce:!0,children:(0,u.jsxs)(k,{autoComplete:"off",onSubmit:j,children:[(0,u.jsxs)(n.A,{span:24,children:[(0,u.jsx)(C,{type:"text",name:"name",placeholder:"Your Name",value:p.name||"",onChange:g}),(0,u.jsx)(v,{type:"name"})]}),(0,u.jsxs)(n.A,{span:24,children:[(0,u.jsx)(C,{type:"text",name:"email",placeholder:"Your Email",value:p.email||"",onChange:g}),(0,u.jsx)(v,{type:"email"})]}),(0,u.jsxs)(n.A,{span:24,children:[(0,u.jsx)(w,{placeholder:"Your Message",value:p.message||"",name:"message",onChange:g}),(0,u.jsx)(v,{type:"message"})]}),(0,u.jsx)(E,{children:(0,u.jsx)(c.$,{name:"submit",children:h("Submit")})})]})})})]})})}))}}]);
//# sourceMappingURL=676.a30c6909.chunk.js.map