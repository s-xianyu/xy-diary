import{f as F,b as u,j as L,d as N,e as T,U,k as V,l as E,o as x,c as A,w as e,i as j,a,v as c,x as p,u as o,O as y,s as q,y as z,F as H,D as J,Q as M,B as O,_ as Q}from"./js/index-CuKw8z3y.js";import{_ as R}from"./index.mv4jfwet.js";import{u as X}from"./setting.u2JGhJOv.js";import"./index.C9z8RdmZ.js";const G=F({__name:"fish",setup(K){const{fishInfo:m}=X(),r=uni.createInnerAudioContext(),l=uni.createInnerAudioContext(),h=u(0),d=u([]),b=u(!1),f=u(!1),v=u(),g=u(!1),_=u(!1),C=[{type:"功德",tips:"功德 +1 佛主保佑你"},{type:"抗疫",tips:"阳性 -1 健健康康"}];L(()=>({title:"功德+1"})),N(()=>{setTimeout(()=>{I()},1e3),k(f.value)}),T(()=>{l.pause(),clearInterval(v.value)}),U(()=>{clearInterval(v.value),l.destroy(),r.destroy()});const I=()=>{l.src||(l.sessionCategory="ambient",l.loop=!0,l.src="https://schbrain-static-online.schbrain.com/resources/bgm.mp3"),l.play()},$=()=>l.pause(),B=()=>{r.stop(),r.src||(r.sessionCategory="ambient",r.src="https://admin.daishuyule.cn/agreement/image/sound.mp3"),r.play()},S=n=>{b.value=n,n?$():I()},k=n=>{f.value=n,n?v.value=setInterval(()=>{w()},2e3):clearInterval(v.value)},w=()=>{const n=(m.count??0)+1;g.value=!0,d.value.push({label:C[h.value].tips,index:n}),m.count=n,setTimeout(()=>{g.value=!1,d.value.length>5&&d.value.shift()},300),B()};return(n,s)=>{const t=j,P=O,D=V(E("s-popup"),R);return x(),A(t,{class:"fish"},{default:e(()=>[a(t,{class:"count"},{default:e(()=>[a(t,{class:"count-num"},{default:e(()=>[c(p(o(m).count||0),1)]),_:1}),a(t,{class:"count-label"},{default:e(()=>[c(p(C[o(h)].type),1)]),_:1})]),_:1}),a(t,{class:"box"},{default:e(()=>[y("div",{class:"box-tip"},[(x(!0),q(H,null,z(o(d),i=>(x(),A(t,{key:i.index,class:"box-tip-item"},{default:e(()=>[c(p(i.label),1)]),_:2},1024))),128))]),y("div",{class:J([{active:o(g)},"box-fish"]),onClick:w},[a(P,{src:"https://s21.ax1x.com/2024/08/19/pAPJhXd.png",style:{width:"380rpx",height:"300rpx"}})],2)]),_:1}),a(t,{class:"footer"},{default:e(()=>[a(t,{class:"footer-btn",onClick:s[0]||(s[0]=i=>S(!o(b)))},{default:e(()=>[c(p(o(b)?"取消沉浸":"沉浸模式"),1)]),_:1}),a(t,{class:"footer-btn",onClick:s[1]||(s[1]=i=>k(!o(f)))},{default:e(()=>[c(p(o(f)?"取消自动":"自动敲鱼"),1)]),_:1}),a(t,{class:"footer-btn",onClick:s[2]||(s[2]=i=>_.value=!0)},{default:e(()=>[c("重置")]),_:1})]),_:1}),a(D,{show:o(_),"onUpdate:show":s[3]||(s[3]=i=>M(_)?_.value=i:null),title:"确认清空吗？",onCommit:s[4]||(s[4]=i=>o(m).count=0)},{default:e(()=>[y("div",{class:"message"},"重置后，功德值会清空，请谨慎操作!")]),_:1},8,["show"])]),_:1})}}}),se=Q(G,[["__scopeId","data-v-6aad06b4"]]);export{se as default};