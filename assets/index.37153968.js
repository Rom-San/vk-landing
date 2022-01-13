var E=Object.defineProperty;var v=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var f=(t,e,i)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,m=(t,e)=>{for(var i in e||(e={}))P.call(e,i)&&f(t,i,e[i]);if(v)for(var i of v(e))C.call(e,i)&&f(t,i,e[i]);return t};import{v as O,q as _,b as p,r as V,o as a,c as r,a as o,d as h,t as b,n as u,w as g,e as k,F as y,f as A,g as L,h as w,i as N}from"./vendor.b0462ff0.js";const B=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}};B();var M="/vk-landing/assets/phone.9fe2144b.svg",U="/vk-landing/assets/mail.f6f1960d.svg";function I(t){if(!!t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://vk.com/js/api/openapi.js?169",e.onload=function(){VK.Retargeting.Init(t),VK.Retargeting.Hit()},document.head.appendChild(e)}}var D=(t,e)=>{const i=t.__vccOpts||t;for(const[c,s]of e)i[c]=s;return i};const z={directives:{mask:O.exports.mask},async created(){var t;if(this.hash=_.parse(location.hash),this.search=_.parse(location.search),!this.search)this.loader=!1;else{const e=this.search.ml;try{const i=await fetch(`${this.api}/mini-landing/${e}`);this.ml=await i.json(),this.loader=!1,document.title=this.ml.content.title,this.setDescription(),((t=this.ml)==null?void 0:t.additionalOptions.VkPixel)&&I(this.ml.additionalOptions.VkPixel),I()}catch(i){this.ml=null,this.loader=!1,console.log(i.message)}}},mounted(){p.supports("VKWebAppResizeWindow")&&setTimeout(()=>{const t=document.body.offsetHeight,e=t<8050?t:8050;p.send("VKWebAppResizeWindow",{height:e})},1e3)},data(){return{search:null,ml:null,hash:null,loader:!0,description:"",api:"https://prosto.bz/api",vkUrl:"https://vk.com/",youtubeUrl:"https://www.youtube.com/embed",vkUserEnter:"https://prosto.bz/ws/vk-user-enter",vkVideoUrl:"https://vk.com/video_ext.php?oid=",isInvalidPhone:!0,isInvalidEmail:!0,phone:null,phoneNumberLength:null,email:null,emailAttributes:!1,vkLink:"",agreement:!0}},computed:{getImage(){return this.ml.content?`${this.api}/file/${this.ml.content.image[0]}`:""},async getVideo(){let t;const e=this.ml.content.video,i="?controls=0&modestbranding=1&showinfo=0&rel=0";if(e.includes("https://youtube.com")&&(t=e.replace("watch?v=","embed/")+i),e.includes("https://youtu.be")&&(t=e.replace("https://youtu.be",this.youtubeUrl)+i),e.includes("https://vk.com")){const c=e.replace("https://vk.com/video","").split("_");t=`${this.vkVideoUrl}${c[0]}&id=${c[1]}`}return t},getTitle(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.title:""},getText(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.text:""},getPhoneIcon(){return M},getEmailIcon(){return U},getButtons(){var t,e;return((e=(t=this.ml)==null?void 0:t.buttons)==null?void 0:e.length)?this.ml.buttons:[]},isButtonDisabled(){return this.isInvalidPhone&&this.ml.additionalOptions.showPhone||this.isInvalidEmail&&this.ml.additionalOptions.showEmail||!this.agreement}},methods:{async onButton(){if(!this.isButtonDisabled){try{await this.postData();const t=await this.allowMessages();console.log("\u{1F680} allowMessages",t);const e=await p.send("VKWebAppGetUserInfo");await fetch(this.vkUserEnter,{method:"post",body:JSON.stringify(m(m(m({},e),this.hash),this.hash)),headers:{"Content-Type":"application/json"}}),console.log("\u{1F680} ~ onButton ~ this.vkLink",this.vkLink)}catch(t){console.log("\u041E\u0448\u0438\u0431\u043A\u0430:",t)}this.vkLink=`${this.vkUrl}im?sel=-${this.ml.buttons[0].botIdInSocialNetwork}`}},getQuery(t){let e={};return t.includes("#")?t.split("#")[1].split("&").forEach(s=>{const n=s.split("=");Object.assign(e,{[n[0]]:n[1]})}):(this.loader=!1,e=null),e},setDescription(){const t=this.ml.content.text.indexOf(".");this.description=this.ml.content.text.slice(0,t+1);const e=document.createElement("meta");e.setAttribute("name","description"),e.content=this.description,document.head.appendChild(e)},onChangePhone(){this.phoneNumberLength<11&&(this.isInvalidPhone=!0)},onChangeEmail(){this.emailAttributes?this.isInvalidEmail=!1:this.isInvalidEmail=!0},onClickPhone(){this.phone||(this.phone="+7")},onInputPhone(){const t=this.phone.replace(/[^\d]/g,"");this.phoneNumberLength=t.length,this.isInvalidPhone=this.phoneNumberLength<11},onInputEmail(){const t=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;this.emailAttributes=t.test(this.email),this.isInvalidEmail=!this.emailAttributes},async postData(){const t={id:this.ml.buttons[0].commandId,fields:{email:this.email,phone:this.phone}};try{return(await fetch(`${this.api}/info`,{method:"POST",body:JSON.stringify(t)})).text()}catch(e){console.log(e.message)}},async allowMessages(){try{const t=parseInt(this.ml.buttons[0].botIdInSocialNetwork);console.log("\u{1F680} ~ groupId",t);const e=await p.send("VKWebAppAllowMessagesFromGroup",{group_id:t});return console.log("\u{1F680} ~ allowMessages",e),e}catch(t){return console.log("\u{1F680} ~ allowMessages ~ e",t),await this.allowMessages()}}}},T={key:0,class:"wrapper"},S={class:"minilanding"},j={class:"headline"},K=["src"],W=["src"],F={class:"container"},H={class:"title"},R={class:"content"},q={class:"text"},Z={class:"form"},G={key:0,class:"label"},J=["src"],Q=["src"],X={class:"buttons"},Y=o("div",{class:"text"},"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",-1),$=[Y],ee={class:"footer"},te=w(" \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\xA0 "),se=o("a",{href:"https://prostolp.com/policy.pdf",target:"_blank"}," \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",-1),ne=o("div",{class:"made-in"},[w(" \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 "),o("a",{href:"http://prosto.bz",target:"_blank"},"prosto.bz")],-1),ie={key:1,id:"preloader"},oe=o("div",{id:"loader"},null,-1),le=[oe],ae={key:2,class:"empty"},re=o("div",{class:"text"},"\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",-1),ce=[re];function he(t,e,i,c,s,n){const d=V("mask");return a(),r(y,null,[!s.loader&&s.ml?(a(),r("div",T,[o("div",S,[o("div",j,[s.ml.content.image?(a(),r("img",{key:0,class:"image",src:n.getImage,alt:""},null,8,K)):h("",!0),s.ml.content.video?(a(),r("iframe",{key:1,class:"video",width:"585",src:n.getVideo,frameborder:"0",allow:"autoplay; encrypted-media; fullscreen;"},null,8,W)):h("",!0)]),o("div",F,[o("div",H,b(n.getTitle),1),o("div",R,[o("div",q,b(n.getText),1),o("form",Z,[s.ml&&(s.ml.additionalOptions.showPhone||s.ml.additionalOptions.showEmail)?(a(),r("div",G," \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F ")):h("",!0),s.ml&&s.ml.additionalOptions.showPhone?(a(),r("div",{key:1,class:u(["input-block",{invalid:s.isInvalidPhone}])},[o("img",{class:"icon",src:n.getPhoneIcon,alt:""},null,8,J),g(o("input",{type:"tel","onUpdate:modelValue":e[0]||(e[0]=l=>s.phone=l),onClick:e[1]||(e[1]=(...l)=>n.onClickPhone&&n.onClickPhone(...l)),onInput:e[2]||(e[2]=(...l)=>n.onInputPhone&&n.onInputPhone(...l)),onChange:e[3]||(e[3]=(...l)=>n.onChangePhone&&n.onChangePhone(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"},null,544),[[d,"+7(###) ###-##-##"],[k,s.phone]])],2)):h("",!0),s.ml&&s.ml.additionalOptions.showEmail?(a(),r("div",{key:2,class:u(["input-block",{invalid:s.isInvalidEmail}])},[o("img",{class:"icon",src:n.getEmailIcon,alt:""},null,8,Q),g(o("input",{type:"email","onUpdate:modelValue":e[4]||(e[4]=l=>s.email=l),onInput:e[5]||(e[5]=(...l)=>n.onInputEmail&&n.onInputEmail(...l)),onChange:e[6]||(e[6]=(...l)=>n.onChangeEmail&&n.onChangeEmail(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u0435\u043C\u0435\u0439\u043B"},null,544),[[k,s.email]])],2)):h("",!0)]),o("div",X,[(a(!0),r(y,null,A(n.getButtons,l=>(a(),r("div",{class:u(["button",{disabled:n.isButtonDisabled}]),key:l.name},[o("div",{class:u(["link",{"not-allowed":n.isButtonDisabled}]),onClick:e[7]||(e[7]=(...x)=>n.onButton&&n.onButton(...x))},$,2)],2))),128))])])]),o("div",ee,[o("div",{class:u(["agreement",{"not-agreement":!s.agreement}])},[g(o("input",{type:"checkbox","onUpdate:modelValue":e[8]||(e[8]=l=>s.agreement=l)},null,512),[[L,s.agreement]]),te,se],2),ne])])])):h("",!0),s.loader?(a(),r("div",ie,le)):h("",!0),!s.loader&&!s.ml?(a(),r("div",ae,ce)):h("",!0)],64)}var de=D(z,[["render",he]]);N(de).mount("#app");
