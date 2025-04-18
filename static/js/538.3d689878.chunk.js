"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[538],{8538:(e,i,n)=>{n.r(i),n.d(i,{default:()=>a});var t=n(5043),s=n(2646);const o=(0,n(2119).Ay)("div")`
  padding: 10px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  cursor: pointer;
  background: rgb(241, 242, 243);
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${e=>e.show?"visible":"hidden"};
  opacity: ${e=>e.show?"1":"0"};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: rgb(224, 224, 224);
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;var r=n(579);const a=()=>{const[e,i]=(0,t.useState)(!1),n=(0,t.useCallback)((()=>{const n=window.scrollY;!e&&n>350?i(!0):n<=350&&i(!1)}),[e]);(0,t.useEffect)((()=>(window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)})),[n]);return(0,r.jsx)(o,{onClick:()=>{document.getElementById("intro").scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})},show:e,children:(0,r.jsx)(s.A,{src:"scroll-top.svg",width:"20px",height:"20px"})})}}}]);
//# sourceMappingURL=538.3d689878.chunk.js.map