import{f as Q,b as u,W as U,o as h,c as g,w as o,i as Z,a as r,v as f,x as A,u as m,O as ee,z as ae,s as V,y as X,F as Y,X as te,A as se,D as le,_ as oe}from"./js/index-DmSYC_uc.js";const re=Q({__name:"2048",setup(ne){const n=u(4),v=u(0),i=u(),w=u([2,4]),j=u(.9),z=u(0),p=u(uni.getStorageSync("bestScore")||0),x=u(!1),L=u([{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}]),d=u(0),M=u(""),y=u(0),b=u(0);U(()=>$());const $=()=>{S()},S=()=>{v.value=0,x.value=!1,i.value=Array.from(Array(n.value)).map(()=>Array(n.value).fill("")),B()},D=()=>{te().length===1?window.history.back():uni.navigateBack()},E=e=>{y.value=e.touches[0].pageX,b.value=e.touches[0].pageY},F=()=>{d.value=0,M.value="没有滑动"},G=e=>{if(d.value!==0)return;const s=e.touches[0].pageX,a=e.touches[0].pageY,t=s-y.value,l=a-b.value;let c="";z.value=-1,Math.abs(t)>Math.abs(l)?t<0?(c="向左滑动",d.value=1,_(0)):t>0&&(c="向右滑动",d.value=2,_(2)):l<0?(c="向上滑动",d.value=3,_(1)):l>0&&(c="向下滑动",d.value=4,_(3)),y.value=s,b.value=a,M.value=c,B()},B=()=>{if(T()){const e=P();i.value[e[0]][e[1]]=O()}},_=e=>{const s=k(Array.from(i.value),e).map(a=>R(a));i.value=k(s,n.value-e),I(),q()||(x.value=!0)},O=()=>Math.random()<j.value?w.value[0]:w.value[1],P=()=>{const e=N();if(e.length)return e[Math.floor(Math.random()*e.length)]},I=()=>{const e=uni.getStorageSync("bestScore");e?v.value>e&&(uni.setStorageSync("bestScore",v.value),p.value=v.value):(uni.setStorageSync("bestScore",v.value),p.value=v.value)},R=e=>{const s=[];for(let a=0;a<n.value;a++)e[a]&&s.push({x:a,merged:!1,value:e[a]});return s.forEach(a=>{const t=W(e,a),l=e[t-1];l&&l===a.value&&!s[t-1].merged?(e[t-1]=l*2,e[a.x]=void 0,a={x:t-1,merged:!0,value:l*2},v.value+=l*2):t!==a.x&&(e[t]=a.value,e[a.x]=void 0,a.x=t)}),e},k=(e,s)=>{if(s=s%4,s===0)return e;let a=Array.from(Array(n.value)).map(()=>Array(n.value).fill(""));for(let t=0;t<n.value;t++)for(let l=0;l<n.value;l++)a[n.value-1-t][l]=e[l][t];return s>1&&(a=k(a,s-1)),a},W=(e,s)=>{let a=s.x;for(;a>0&&!e[a-1];)a=a-1;return a},q=()=>T()||H(),N=()=>{const e=[];for(let s=0;s<n.value;s++)for(let a=0;a<n.value;a++)i.value[s][a]||e.push([s,a]);return e},T=()=>!!N().length,H=()=>{for(let e=0;e<n.value;e++)for(let s=0;s<n.value;s++){const a=i.value[e][s];if(a)for(let t=0;t<4;t++){const l=L.value[t];if(J(e+l.x,s+l.y)){const c=i.value[e+l.x][s+l.y];if(c&&c===a)return!0}}}return!1},J=(e,s)=>e>0&&s>0&&e<n.value&&s<n.value;return(e,s)=>{const a=se,t=Z;return h(),g(t,{class:"wrapper",name:"TOSb",onTouchend:F,onTouchmove:G,onTouchstart:E},{default:o(()=>[r(t,{class:"header"},{default:o(()=>[r(t,{class:"header-left"},{default:o(()=>[r(a,null,{default:o(()=>[f("2048")]),_:1})]),_:1}),r(t,{class:"header-right"},{default:o(()=>[r(t,{class:"header-right-score"},{default:o(()=>[r(t,{class:"score"},{default:o(()=>[r(a,{class:"score-title"},{default:o(()=>[f("当前分数")]),_:1}),r(a,{class:"score-num"},{default:o(()=>[f(A(m(v)),1)]),_:1})]),_:1}),r(t,{class:"score"},{default:o(()=>[r(a,{class:"score-title"},{default:o(()=>[f("历史最高分")]),_:1}),r(a,{class:"score-num"},{default:o(()=>[f(A(m(p)),1)]),_:1})]),_:1})]),_:1}),r(t,{class:"header-right-btn"},{default:o(()=>[r(t,{class:"btn",onClick:S},{default:o(()=>[f("新游戏")]),_:1}),r(t,{class:"btn",onClick:D},{default:o(()=>[f("返回")]),_:1})]),_:1})]),_:1})]),_:1}),m(x)?(h(),g(t,{key:0,class:"over"},{default:o(()=>[ee("p",null,"Game over!"),r(t,{class:"btn",onClick:S},{default:o(()=>[f("再来一次")]),_:1})]),_:1})):ae("",!0),r(t,{class:"box"},{default:o(()=>[(h(!0),V(Y,null,X(m(i),(l,c)=>(h(),g(t,{key:c,class:"row"},{default:o(()=>[(h(!0),V(Y,null,X(l,(C,K)=>(h(),g(t,{key:K,class:le(["n-"+C,"col"])},{default:o(()=>[f(A(C??""),1)]),_:2},1032,["class"]))),128))]),_:2},1024))),128))]),_:1})]),_:1})}}}),ce=oe(re,[["__scopeId","data-v-5bc7c01d"]]);export{ce as default};
