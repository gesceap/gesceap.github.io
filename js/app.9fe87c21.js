(function(e){function t(t){for(var s,o,a=t[0],l=t[1],u=t[2],d=0,h=[];d<a.length;d++)o=a[d],i[o]&&h.push(i[o][0]),i[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);c&&c(t);while(h.length)h.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(s=!1)}s&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var s={},i={app:0},r=[];function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=s,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("64a9"),i=n.n(s);i.a},"1bad":function(e,t,n){"use strict";var s=n("810b"),i=n.n(s);i.a},"1cc3":function(e,t,n){"use strict";var s=n("5f0e"),i=n.n(s);i.a},"32df":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var s=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Looper"),e._m(0)],1)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"sm"}},[n("a",{attrs:{href:"https://www.youtube.com/channel/UChvIb5lU1CswBTno6BCGG4Q",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"YouTube",src:"/img/yt.png"}})]),n("a",{attrs:{href:"https://www.facebook.com/gesceap/",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"Facebook",src:"/img/fb.png"}})]),n("a",{attrs:{href:"https://twitter.com/gesceap_",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"Twitter",src:"/img/tw.png"}})]),n("a",{attrs:{href:"https://gesceap.bandcamp.com",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"Bandcamp",src:"/img/bc.png"}})]),n("a",{attrs:{href:"https://github.com/gesceap",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"GitHub",src:"/img/gh.png"}})]),n("a",{attrs:{href:"https://soundcloud.com/gesceap",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{alt:"SoundCloud",src:"/img/sc.png"}})])])}],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[e.loaded?n("Background",{attrs:{playing:e.playing,sources:e.sources,"stop-animating":e.stopAnimating}}):e._e(),e.loaded?n("div",{staticClass:"square"},[n("div",{staticClass:"looper"},e._l(e.showSources,function(t,s){return n("Sample",{key:t.filename,attrs:{source:t,playing:e.playing.find(function(e){return e.filename===t.filename}),queuedIn:e.playing.length&&e.startQueue.indexOf(s)>-1,queuedOut:e.endQueue.indexOf(s)>-1},on:{sampleClick:e.queueSample}})}),1)]):n("div",{staticClass:"loading"},[e._v("Loading 19.2MB please wait")])],1)},a=[],l=n("e295"),u=n.n(l),c=n("1fc0"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("canvas",{ref:"canvas"})},h=[],p=n("c9a3"),f=n.n(p);const g=new s["a"];function m(e,t,n,s,i,r,o,a){const l=t,u=2*Math.PI/n,c=r*Math.cos(u*l)+s,d=r*Math.sin(u*l)+i;return a&&(e.beginPath(),e.arc(c,d,o,0,2*Math.PI),e.fill()),[c,d]}function w({context:e,numPoints:t,width:n,height:s,dpr:i}){e.fillStyle="#fff",e.strokeStyle="#fff",e.lineWidth=1*i;const r=[];for(let o=0;o<t;o+=1)r.push(m(e,o,t,n/2,s/2,n/2,2*i,!1));for(let o=0;o<r.length;o+=1){const t=r[o][0],n=r[o][1];for(let s=0;s<r.length;s+=1){const i=r[s][0],o=r[s][1];e.beginPath(),e.moveTo(t,n),e.lineTo(i,o),e.stroke()}}}const y=10.5,v=20,b={},x=16;for(let ue=0;ue<x;++ue)b[ue]={draw:({context:e,delta:t,x:n,y:s,squareSize:i,dpr:r,features:{energy:o},stopAnimating:a})=>{let l,u;e.save(),a?(e.translate(n+y,s+y),l=i-v,u=i-v):(e.translate(n+y-o,s+y-o),l=i-v+2*o,u=i-v+2*o),w({delta:t,context:e,width:l,height:u,dpr:r,numPoints:2+ue}),e.restore()}};var S=b,C={props:["sources","playing","stopAnimating"],data(){return{context:null,raf:null,dpr:1,squareSize:135,marginSize:2,maxSize:546,fill:"rgba(0,0,0,0)",animations:S,tick:!1,noise:null}},mounted(){const{canvas:e}=this.$refs;this.context=e.getContext("2d"),window.addEventListener("resize",this.resize),this.resize(),g.$on("loop",e=>{e%2===0?(this.fill="lime",this.tick=!0):this.tick=!1}),this.noise=new f.a("prime16"+Date.now()),this.raf=requestAnimationFrame(this.loop)},methods:{loop(e){this.raf=requestAnimationFrame(this.loop);const{dpr:t,context:n,maxSize:s,squareSize:i,marginSize:r,tick:o,noise:a,stopAnimating:l}=this,{canvas:u}=n,{width:c,height:d}=u,h=e/2;l||n.drawImage(u,-8,-8,c+16,d+16);const p=a.noise2D(h/500,h/1064);l||n.drawImage(u,p,10*Math.sin(h/5e3+5*Math.sin(p/500))-Math.cos(h/500),c+20*p+Math.sin(h/500),d+20*Math.cos(p/600+2*Math.sin(h/500))),n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,0,c,d);let f=-1;n.fillStyle=this.fill;for(let g=0;g<16;g++){const e=this.playing.findIndex(e=>e.index===g);if(g%4===0&&f++,e<0)continue;const a=this.sources[g].analyser&&this.sources[g].analyser.get(),p=c/2-s*t/2+(i*t*(g%4)+r*t*(g%4)),m=d/2-s*t/2+(i*t*f+r*t*f);this.animations[g]?(n.save(),this.animations[g].draw({canvas:u,context:n,delta:h,x:p,y:m,squareSize:i,tick:o,dpr:t,features:a,stopAnimating:l}),n.restore()):n.fillRect(p,m,i*t,i*t)}this.fill="rgba(0,0,0,0)"},resize(){const{canvas:e}=this.$refs,{innerWidth:t,innerHeight:n}=window,{dpr:s}=this;this.squareSize=document.querySelector(".sample").clientWidth,this.maxSize=document.querySelector(".looper").clientWidth,e.width=t*s,e.height=n*s,e.style.width=`${t}px`,e.style.height=`${n}px`}}},k=C,O=(n("1cc3"),n("2877")),q=Object(O["a"])(k,d,h,!1,null,"0d565b89",null),A=q.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:{sample:!0,playing:e.playingClass,queuedIn:e.queuedInClass,queuedOut:e.queuedOutClass},attrs:{name:e.source.name},on:{click:e.emitClick}})},P=[],M={props:["source","playing","queuedIn","queuedOut"],data(){return{playingClass:!1,queuedInClass:!1,queuedOutClass:!1}},created(){g.$on("loop",this.handleClasses)},methods:{emitClick(){this.$emit("sampleClick",this.source),this.handleClasses()},handleClasses(e=0){const{playing:t,queuedIn:n,queuedOut:s}=this;this.playingClass=!1,this.queuedInClass=!1,this.queuedOutClass=!1,e%2===0&&(this.playingClass=!!t),this.queuedInClass=!!n,this.queuedOutClass=!!s}}},I=M,$=(n("1bad"),Object(O["a"])(I,_,P,!1,null,"a2322aac",null)),B=$.exports;try{window.AudioContext=window.AudioContext||window.webkitAudioContext,window.audioContext=new window.AudioContext}catch(le){throw new Error("No Web Audio API support")}const z=function(e){this.context=e,this.bufferList={},this.playingSounds={},this.merger=this.context.createChannelMerger(1),this.merger.connect(this.context.destination)};z.prototype={addSound:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer";var s=this;n.onload=function(){s.context.decodeAudioData(n.response,function(t){if(!t)throw new Error(`Error decoding file data: ${e}`);s.bufferList[e]=t}),t&&t()},n.onerror=function(){throw new Error("BufferLoader: XHR error")},n.send()},stopSoundWithUrl:function(e,t){if(this.playingSounds.hasOwnProperty(e))for(var n in this.playingSounds[e])this.playingSounds[e].hasOwnProperty(n)&&this.playingSounds[e][n].stop(t)}};const j=new z(window.audioContext);window.webAudioAPISoundManager=j;const E=function(e,t){this.url=e,window.webAudioAPISoundManager=window.webAudioAPISoundManager||new z(window.audioContext),this.manager=window.webAudioAPISoundManager,this.manager.addSound(this.url,t)};E.prototype={play:function(e){var t=this.manager.bufferList[this.url];for(var n in this.settings={time:0,loop:!1,volume:.5},e)e.hasOwnProperty(n)&&(this.settings[n]=e[n]);if("undefined"!==typeof t){var s=this.makeSource(t);s.loop=this.settings.loop,s.start(this.settings.time),this.manager.playingSounds.hasOwnProperty(this.url)||(this.manager.playingSounds[this.url]=[]),this.manager.playingSounds[this.url].push(s)}},stop:function({time:e=0}){this.manager.stopSoundWithUrl(this.url,e)},makeSource:function(e){var t=this.manager.context.createBufferSource(),n=this.manager.context.createGain();return n.gain.value=this.settings.volume,t.buffer=e,t.connect(n),this.source=t,n.connect(this.manager.merger),t}};const L="/loops/",T=["Lecwd04-loops-r1-edited.wav","Inspo01-loops-r2-edited.wav","Brindisi-loops-r3-edited.wav","734-loops-r4-edited.wav","Lecwd04-loops-b1-edited.wav","Groovr02-loops-b2-edited.wav","Brindisi-loops-b3-edited.wav","Fastfood-loops-b4-edited.wav","Lecwd04-loops-s1-edited.wav","Groovr02-loops-s2-edited.wav","Brindisi-loops-s3-edited.wav","Fastfood-loops-s4-edited.wav","Lecwd04-loops-d1-edited.wav","Groovr02-loops-d2-edited.wav","Brindisi-loops-d3-edited.wav","Fastfood-loops-d4-edited.wav"],Q=["Rhythm 1","Rhythm 2","Rhythm 3","Rhythm 4","Bass 1","Bass 2","Bass 3","Bass 4","Synth 1","Synth 2","Synth 3","Synth 4","Drum 1","Drum 2","Drum 3","Drum 4"],G=["r","b","s","d"];function R(e){return new Promise(t=>{new E(e,t)})}function W(e,t,n){return new Promise(async s=>{const i=`${L}${e}`;await R(i),s({filename:e,name:n,type:G[t],playing:!1})})}async function D(){let e=-1;const t=await Promise.all(T.map((t,n)=>{return n%4===0&&e++,W(t,e,Q[n])}));return t}function F(e){return new c["a"](e,Object.assign({},u.a))}let U=null,N=null;const H=25;let J,X=!1,Y=130;const K=.1;let V=0;const Z={};var ee={name:"Looper",data(){return{loaded:!1,counter:0,sources:[],showSources:[],startQueue:[],endQueue:[],stopAnimating:!1,baseUrl:"/loops/"}},components:{Background:A,Sample:B},computed:{playing(){const e=[];return this.sources.forEach((t,n)=>{if(!t.playing)return!1;e.push({...t,index:n})}),e}},async created(){function e(e){return new Promise(t=>setTimeout(t,e))}U=j.context,N=new Worker("/metronome-worker.js"),N.onmessage=e=>{"tick"===e.data&&this.scheduler()},N.postMessage({interval:H}),this.analyser=F({audioContext:j.context,source:j.merger,bufferSize:256,featureExtractors:["rms","energy","buffer"]}),this.$set(this,"sources",await D()),this.loaded=!0;for(let t=0;t<this.sources.length;++t)this.showSources.push(this.sources[t]),await e(100);window.toggleAnimating=()=>{this.stopAnimating=!this.stopAnimating}},methods:{startInterval(){return X=!X,X?(J=0,V=U.currentTime,N.postMessage("start"),"stop"):(N.postMessage("stop"),"play")},scheduler(){while(V<U.currentTime+K)this.scheduleNote(J,V),this.nextNote()},scheduleNote(e,t){const{startQueue:n,endQueue:s}=this;if(e%64===0){for(let e=0;e<s.length;++e)this.stopSample(s[e]);for(let e=0;e<this.playing.length;++e)this.startSample(this.playing[e].index,t);for(let e=0;e<n.length;++e)this.startSample(n[e],t);n.splice(0,n.length),s.splice(0,s.length)}e%4===0&&g.$emit("loop")},nextNote(){const e=60/Y;V+=.25*e,J++,64===J&&(J=0)},queueSample(e){const t=e.filename,{endQueue:n,startQueue:s}=this,i=this.sources.findIndex(e=>e.filename===t);if(this.playing.length||this.startInterval(),i>-1){const e=this.sources[i].type,t=this.playing.find(t=>t.type===e),r=s.reduce((t,n,s)=>{return this.sources[n].type===e&&t.push(s),t},[]),o=!!r.length;s.indexOf(i)>-1?s.splice(s.indexOf(i),1):this.sources[i].playing&&n.indexOf(i)>-1?(n.splice(n.indexOf(i),1),o&&s.splice(s.indexOf(i),1)):this.sources[i].playing?n.push(i):(t&&n.push(t.index),o&&r.forEach(e=>{s.splice(e,1)}),s.push(i))}},startSample(e,t){const{baseUrl:n}=this,s=this.sources[e].filename;this.sources[e].playing=!0;const i=new E(`${n}${s}`);i.play({time:t}),this.sources[e].analyser=this.analyser,Z[s]&&delete Z[s],Z[s]=i},stopSample(e){this.sources[e].playing=!1}}},te=ee,ne=(n("ae96"),Object(O["a"])(te,o,a,!1,null,"690599c4",null)),se=ne.exports,ie={name:"App",components:{Looper:se},created(){console.log("%c2xAA (https://wray.pro)","background-image: linear-gradient(to left, #c30083, #0623c8); color: #ffffff; padding: 5px 20px;")}},re=ie,oe=(n("034f"),Object(O["a"])(re,i,r,!1,null,null,null)),ae=oe.exports;s["a"].config.productionTip=!1,new s["a"]({render:e=>e(ae)}).$mount("#app")},"5f0e":function(e,t,n){},"64a9":function(e,t,n){},"810b":function(e,t,n){},ae96:function(e,t,n){"use strict";var s=n("32df"),i=n.n(s);i.a}});
//# sourceMappingURL=app.9fe87c21.js.map