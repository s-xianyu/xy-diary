(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-happy-2048"],{2947:function(e,t,i){"use strict";i.r(t);var a=i("5b9c"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(r);t["default"]=n.a},"5b9c":function(e,t,i){"use strict";var a=i("ee27").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("d0af"));i("d81d"),i("a630"),i("3ca3"),i("cb29"),i("4160");var r={name:"TOSb",data:function(){return{size:4,score:0,list:[],intiNum:[2,4],pr:.9,bestScore:uni.getStorageSync("bestScore"),over:!1,direction:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],flag:0,text:"",lastX:0,lastY:0}},methods:{init:function(){this.newGame()},newGame:function(){var e=this;this.score=0,this.over=!1,this.list=Array.from(Array(this.size)).map((function(){return Array(e.size).fill(void 0)})),this.setRandom()},back:function(){var e=getCurrentPages();1===e.length?window.history.back():uni.navigateBack()},handletouchstart:function(e){this.lastX=e.touches[0].pageX,this.lastY=e.touches[0].pageY},handletouchend:function(e){this.flag=0,this.text="没有滑动"},handletouchmove:function(e){if(0===this.flag){var t=e.touches[0].pageX,i=e.touches[0].pageY,a=t-this.lastX,n=i-this.lastY,r="";this.mindex=-1,Math.abs(a)>Math.abs(n)?a<0?(r="向左滑动",this.flag=1,this.move(0)):a>0&&(r="向右滑动",this.flag=2,this.move(2)):n<0?(r="向上滑动",this.flag=3,this.move(1)):n>0&&(r="向下滑动",this.flag=4,this.move(3)),this.lastX=t,this.lastY=i,this.text=r,this.setRandom()}},setRandom:function(){if(this.hasAvailableCells()){var e=this.randomAvailableCells(),t=(0,n.default)(e,2),i=t[0],a=t[1];this.list[i][a]=this.randomValue()}},move:function(e){var t=this,i=this.rotate(Array.from(this.list),e).map((function(e,i){return t.moveLeft(e)}));this.list=this.rotate(i,this.size-e),this.setLocalstorage(),this.isAvailable()||(this.over=!0)},randomValue:function(){return Math.random()<this.pr?this.intiNum[0]:this.intiNum[1]},randomAvailableCells:function(){var e=this.availableCells();if(e.length)return e[Math.floor(Math.random()*e.length)]},setLocalstorage:function(){var e=uni.getStorageSync("bestScore");e?this.score>e&&(uni.setStorageSync("bestScore",this.score),this.bestScore=this.score):(uni.setStorageSync("bestScore",this.score),this.bestScore=this.score)},moveLeft:function(e){for(var t=this,i=[],a=0;a<this.size;a++)e[a]&&i.push({x:a,merged:!1,value:e[a]});return i.forEach((function(a){var n=t.farthestPosition(e,a),r=e[n-1];r&&r===a.value&&!i[n-1].merged?(e[n-1]=2*r,e[a.x]=void 0,a={x:n-1,merged:!0,value:2*r},t.score+=2*r):n!==a.x&&(e[n]=a.value,e[a.x]=void 0,a.x=n)})),e},rotate:function(e,t){var i=this;if(t%=4,0===t)return e;console.log("arr",e);for(var a=Array.from(Array(this.size)).map((function(){return Array(i.size).fill(void 0)})),n=0;n<this.size;n++)for(var r=0;r<this.size;r++)a[this.size-1-n][r]=e[r][n];return t>1&&(a=this.rotate(a,t-1)),a},farthestPosition:function(e,t){var i=t.x;while(i>0&&!e[i-1])i-=1;return i},isAvailable:function(){return this.hasAvailableCells()||this.hasMergedCells()},availableCells:function(){for(var e=[],t=0;t<this.size;t++)for(var i=0;i<this.size;i++)this.list[t][i]||e.push([t,i]);return e},hasAvailableCells:function(){return!!this.availableCells().length},hasMergedCells:function(){for(var e=0;e<this.size;e++)for(var t=0;t<this.size;t++){var i=this.list[e][t];if(i)for(var a=0;a<4;a++){var n=this.direction[a];if(this.withinBounds(e+n.x,t+n.y)){var r=this.list[e+n.x][t+n.y];if(r&&r===i)return!0}}}return!1},withinBounds:function(e,t){return e>0&&t>0&&e<this.size&&t<this.size}},created:function(){this.init()}};t.default=r},"67be":function(e,t,i){"use strict";var a=i("f311"),n=i.n(a);n.a},7329:function(e,t,i){"use strict";i.r(t);var a=i("9f1a"),n=i("2947");for(var r in n)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("67be");var o,c=i("f0c5"),s=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"3448baca",null,!1,a["a"],o);t["default"]=s.exports},"83cb":function(e,t,i){"use strict";function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},"9f1a":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"wrapper",attrs:{name:"TOSb"},on:{touchmove:function(t){arguments[0]=t=e.$handleEvent(t),e.handletouchmove.apply(void 0,arguments)},touchstart:function(t){arguments[0]=t=e.$handleEvent(t),e.handletouchstart.apply(void 0,arguments)},touchend:function(t){arguments[0]=t=e.$handleEvent(t),e.handletouchend.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"header"},[i("v-uni-view",{staticClass:"header-left"},[i("v-uni-text",[e._v("2048")])],1),i("v-uni-view",{staticClass:"header-right"},[i("v-uni-view",{staticClass:"header-right-score"},[i("v-uni-view",{staticClass:"score"},[i("v-uni-text",{staticClass:"score-title"},[e._v("当前分数")]),i("v-uni-text",{staticClass:"score-num"},[e._v(e._s(e.score))])],1),i("v-uni-view",{staticClass:"score"},[i("v-uni-text",{staticClass:"score-title"},[e._v("历史最高分")]),i("v-uni-text",{staticClass:"score-num"},[e._v(e._s(e.bestScore))])],1)],1),i("v-uni-view",{staticClass:"header-right-btn"},[i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.newGame.apply(void 0,arguments)}}},[e._v("新游戏")]),i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back.apply(void 0,arguments)}}},[e._v("返回")])],1)],1)],1),e.over?i("v-uni-view",{staticClass:"over"},[i("p",[e._v("Game over!")]),i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.newGame.apply(void 0,arguments)}}},[e._v("再来一次")])],1):e._e(),i("v-uni-view",{staticClass:"box"},e._l(e.list,(function(t,a){return i("v-uni-view",{key:a,staticClass:"row"},e._l(t,(function(t,a){return i("v-uni-view",{key:a,staticClass:"col",class:"n-"+t},[e._v(e._s(null!=t?t:""))])})),1)})),1)],1)},r=[]},b6802:function(e,t,i){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=e[i];return a}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},c1e7:function(e,t,i){"use strict";function a(e,t){var i=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var a,n,r=[],o=!0,c=!1;try{for(i=i.call(e);!(o=(a=i.next()).done);o=!0)if(r.push(a.value),t&&r.length===t)break}catch(s){c=!0,n=s}finally{try{o||null==i["return"]||i["return"]()}finally{if(c)throw n}}return r}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a,i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0")},cb29:function(e,t,i){var a=i("23e7"),n=i("81d5"),r=i("44d2");a({target:"Array",proto:!0},{fill:n}),r("fill")},cd6e:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* mixin */\n/* 颜色变量 */body[data-v-3448baca], html[data-v-3448baca]{width:100%;height:auto}\n/* 单行文字隐藏 */.elp[data-v-3448baca]{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block}\n/* 按钮置灰 */.disabled[data-v-3448baca]{opacity:.3;-webkit-filter:grayscale(100%);filter:grayscale(100%)}\n/* u-search icon 搜索兼容 */[type=search][data-v-3448baca]::-webkit-search-decoration{display:none}@font-face{font-family:xy;src:url(https://schbrain-static-online.oss-cn-hangzhou.aliyuncs.com/resources/xy.ttf) format("truetype");font-weight:700;font-style:normal}[data-v-3448baca] .deep-class .uni-picker-container{z-index:100000!important}.wrapper[data-v-3448baca]{background-color:#fff5e4;width:100%;height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;position:relative;padding:%?30?%}.wrapper .header[data-v-3448baca]{width:100%;gap:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:#776e65}.wrapper .header-left[data-v-3448baca]{-webkit-box-flex:1;-webkit-flex:1;flex:1;background-color:#fad434;padding:%?70?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?10?%;font-size:%?48?%;font-weight:bolder}.wrapper .header-right[data-v-3448baca]{-webkit-box-flex:2;-webkit-flex:2;flex:2;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.wrapper .header-right-score[data-v-3448baca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:100%;gap:%?20?%}.wrapper .header-right-score .score[data-v-3448baca]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:#cec1b3;border-radius:%?10?%;padding:%?10?%}.wrapper .header-right-score .score-title[data-v-3448baca]{font-size:%?26?%}.wrapper .header-right-score .score-num[data-v-3448baca]{font-size:%?40?%}.wrapper .header-right-btn[data-v-3448baca]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;gap:%?20?%}.wrapper .header-right-btn .btn[data-v-3448baca]{-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:%?10?%;border-radius:%?10?%;cursor:pointer;text-align:center;color:#f9f6f2;background:#8f7a66}.wrapper .over[data-v-3448baca]{position:absolute;top:0;left:0;bottom:0;right:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:rgba(238,228,218,.73);z-index:1000;color:#8f7a66}.wrapper .over p[data-v-3448baca]{font-size:%?60?%;font-weight:700;margin-bottom:%?30?%}.wrapper .over .btn[data-v-3448baca]{padding:%?20?%;border-radius:%?10?%;cursor:pointer;text-align:center;color:#f9f6f2;background:#8f7a66}.wrapper .box[data-v-3448baca]{margin-top:%?100?%;width:100%;height:%?700?%;padding:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;box-sizing:border-box;border-radius:%?10?%;background:#bbada0}.wrapper .box .row[data-v-3448baca]{width:100%;height:23%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.wrapper .box .row .col[data-v-3448baca]{width:23%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?48?%;border-radius:%?6?%;background:#cec1b3}.wrapper .box .row .col.n-2[data-v-3448baca]{background:#f8f3e8}.wrapper .box .row .col.n-4[data-v-3448baca]{background:#ede0c8}.wrapper .box .row .col.n-8[data-v-3448baca]{background:#f26179}.wrapper .box .row .col.n-16[data-v-3448baca]{background:#f59563}.wrapper .box .row .col.n-32[data-v-3448baca]{background:#f67c5f}.wrapper .box .row .col.n-64[data-v-3448baca]{background:#f65e36}.wrapper .box .row .col.n-128[data-v-3448baca]{background:#edcf72}.wrapper .box .row .col.n-256[data-v-3448baca]{background:#edcc61}.wrapper .box .row .col.n-512[data-v-3448baca]{background:#9c0}.wrapper .box .row .col.n-1024[data-v-3448baca]{background:#3365a5}.wrapper .box .row .col.n-2048[data-v-3448baca]{background:#09c}.wrapper .box .row .col.n-4096[data-v-3448baca]{background:rgba(170,102,187,.8)}.wrapper .box .row .col.n-8192[data-v-3448baca]{background:#93c}',""]),e.exports=t},ceef:function(e,t,i){"use strict";function a(e){if(Array.isArray(e))return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},d0af:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var a=c(i("ceef")),n=c(i("c1e7")),r=c(i("dde1")),o=c(i("83cb"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t){return(0,a.default)(e)||(0,n.default)(e,t)||(0,r.default)(e,t)||(0,o.default)()}},dde1:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=r,i("fb6a"),i("d3b7"),i("a630"),i("3ca3");var a=n(i("b6802"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(e){if("string"===typeof e)return(0,a.default)(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?(0,a.default)(e,t):void 0}}},f311:function(e,t,i){var a=i("cd6e");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("856f1150",a,!0,{sourceMap:!1,shadowMode:!1})}}]);