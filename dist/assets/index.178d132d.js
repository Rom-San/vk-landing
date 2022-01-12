var P=Object.defineProperty;var f=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var v=(t,e,i)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,p=(t,e)=>{for(var i in e||(e={}))x.call(e,i)&&v(t,i,e[i]);if(f)for(var i of f(e))E.call(e,i)&&v(t,i,e[i]);return t};import{v as C,b as m,r as O,o as a,c as r,a as o,d as h,t as _,n as u,w as g,e as b,F as k,f as A,g as V,h as y,i as L}from"./vendor.15386a3e.js";const N=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}};N();var B="/vk-landing/assets/phone.9fe2144b.svg",M="/vk-landing/assets/mail.f6f1960d.svg";function w(t){if(!!t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://vk.com/js/api/openapi.js?169",e.onload=function(){VK.Retargeting.Init(t),VK.Retargeting.Hit()},document.head.appendChild(e)}}var D=(t,e)=>{const i=t.__vccOpts||t;for(const[c,s]of e)i[c]=s;return i};const z={directives:{mask:C.exports.mask},async created(){var e;const t=window.location.href;if(console.log("\u{1F680} ~ search",window.location),this.params=this.getQuery(t),!this.params)this.loader=!1;else{const i=this.params.ml;this.hash=this.params.hash;try{const c=await fetch(`${this.api}/mini-landing/${i}`);this.ml=await c.json(),this.loader=!1,document.title=this.ml.content.title,this.setDescription(),((e=this.ml)==null?void 0:e.additionalOptions.VkPixel)&&w(this.ml.additionalOptions.VkPixel),w()}catch(c){this.ml=null,this.loader=!1,console.log(c.message)}}},mounted(){m.supports("VKWebAppResizeWindow")&&setTimeout(()=>{const t=document.body.offsetHeight,e=t<8050?t:8050;m.send("VKWebAppResizeWindow",{height:e})},1e3)},data(){return{params:null,ml:null,hash:null,loader:!0,description:"",api:"https://prosto.bz/api",vkUrl:"https://vk.com/",youtubeUrl:"https://www.youtube.com/embed",vkUserEnter:"https://prosto.bz/ws/vk-user-enter",isInvalidPhone:!0,isInvalidEmail:!0,phone:null,phoneNumberLength:null,email:null,emailAttributes:!1,vkLink:"",agreement:!0}},computed:{getImage(){return this.ml.content?`${this.api}/file/${this.ml.content.image[0]}`:""},getVideo(){let t;const e=this.ml.content.video;return e.includes("https://youtube.com")?t=e.replace("watch?v=","embed/"):t=e.replace("https://youtu.be",this.youtubeUrl),t+"?controls=0&modestbranding=1&showinfo=0&rel=0"},getTitle(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.title:""},getText(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.text:""},getPhoneIcon(){return B},getEmailIcon(){return M},getButtons(){var t,e;return((e=(t=this.ml)==null?void 0:t.buttons)==null?void 0:e.length)?this.ml.buttons:[]},isButtonDisabled(){return this.isInvalidPhone&&this.ml.additionalOptions.showPhone||this.isInvalidEmail&&this.ml.additionalOptions.showEmail||!this.agreement}},methods:{async onButton(){if(!this.isButtonDisabled){await this.postData();const t=await this.allowMessages();console.log("\u{1F680} allowMessages",t);const e=await m.send("VKWebAppGetUserInfo");await fetch(vkUserEnter,{method:"post",body:JSON.stringify(p(p({},e),this.params)),headers:{"Content-Type":"application/json"}}),this.vkLink=`${this.vkUrl}im?sel=-${this.ml.buttons[0].botIdInSocialNetwork}`,console.log("\u{1F680} ~ onButton ~ this.vkLink",this.vkLink)}},getQuery(t){let e={};return t.includes("#")?t.split("#")[1].split("&").forEach(s=>{const n=s.split("=");Object.assign(e,{[n[0]]:n[1]})}):(this.loader=!1,e=null),e},setDescription(){const t=this.ml.content.text.indexOf(".");this.description=this.ml.content.text.slice(0,t+1);const e=document.createElement("meta");e.setAttribute("name","description"),e.content=this.description,document.head.appendChild(e)},onChangePhone(){this.phoneNumberLength<11&&(this.isInvalidPhone=!0)},onChangeEmail(){this.emailAttributes?this.isInvalidEmail=!1:this.isInvalidEmail=!0},onClickPhone(){this.phone||(this.phone="+7")},onInputPhone(){const t=this.phone.replace(/[^\d]/g,"");this.phoneNumberLength=t.length,this.isInvalidPhone=this.phoneNumberLength<11},onInputEmail(){const t=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;this.emailAttributes=t.test(this.email),this.isInvalidEmail=!this.emailAttributes},async postData(){const t={id:this.ml.buttons[0].commandId,fields:{email:this.email,phone:this.phone}};try{return(await fetch(`${this.api}/info`,{method:"POST",body:JSON.stringify(t)})).text()}catch(e){console.log(e.message)}},async allowMessages(){try{const t=parseInt(this.ml.buttons[0].botIdInSocialNetwork);console.log("\u{1F680} ~ groupId",t);const e=await m.send("VKWebAppAllowMessagesFromGroup",{group_id:t});return console.log("\u{1F680} ~ allowMessages",e),e}catch(t){return console.log("\u{1F680} ~ allowMessages ~ e",t),await this.allowMessages()}}}},T={key:0,class:"wrapper"},U={class:"minilanding"},j={class:"headline"},K=["src"],S=["src"],W={class:"container"},F={class:"title"},H={class:"content"},R={class:"text"},Z={class:"form"},G={key:0,class:"label"},J=["src"],Q=["src"],q={class:"buttons"},X=o("div",{class:"text"},"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",-1),Y=[X],$={class:"footer"},ee=y(" \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\xA0 "),te=o("a",{href:"https://prostolp.com/policy.pdf",target:"_blank"}," \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",-1),se=o("div",{class:"made-in"},[y(" \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 "),o("a",{href:"http://prosto.bz",target:"_blank"},"prosto.bz")],-1),ne={key:1,id:"preloader"},oe=o("div",{id:"loader"},null,-1),ie=[oe],le={key:2,class:"empty"},ae=o("div",{class:"text"},"\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",-1),re=[ae];function ce(t,e,i,c,s,n){const d=O("mask");return a(),r(k,null,[!s.loader&&s.ml?(a(),r("div",T,[o("div",U,[o("div",j,[s.ml.content.image?(a(),r("img",{key:0,class:"image",src:n.getImage,alt:""},null,8,K)):h("",!0),s.ml.content.video?(a(),r("iframe",{key:1,class:"video",width:"585",src:n.getVideo,frameborder:"0",allowfullscreen:""},null,8,S)):h("",!0)]),o("div",W,[o("div",F,_(n.getTitle),1),o("div",H,[o("div",R,_(n.getText),1),o("form",Z,[s.ml&&(s.ml.additionalOptions.showPhone||s.ml.additionalOptions.showEmail)?(a(),r("div",G," \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F ")):h("",!0),s.ml&&s.ml.additionalOptions.showPhone?(a(),r("div",{key:1,class:u(["input-block",{invalid:s.isInvalidPhone}])},[o("img",{class:"icon",src:n.getPhoneIcon,alt:""},null,8,J),g(o("input",{type:"tel","onUpdate:modelValue":e[0]||(e[0]=l=>s.phone=l),onClick:e[1]||(e[1]=(...l)=>n.onClickPhone&&n.onClickPhone(...l)),onInput:e[2]||(e[2]=(...l)=>n.onInputPhone&&n.onInputPhone(...l)),onChange:e[3]||(e[3]=(...l)=>n.onChangePhone&&n.onChangePhone(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"},null,544),[[d,"+7(###) ###-##-##"],[b,s.phone]])],2)):h("",!0),s.ml&&s.ml.additionalOptions.showEmail?(a(),r("div",{key:2,class:u(["input-block",{invalid:s.isInvalidEmail}])},[o("img",{class:"icon",src:n.getEmailIcon,alt:""},null,8,Q),g(o("input",{type:"email","onUpdate:modelValue":e[4]||(e[4]=l=>s.email=l),onInput:e[5]||(e[5]=(...l)=>n.onInputEmail&&n.onInputEmail(...l)),onChange:e[6]||(e[6]=(...l)=>n.onChangeEmail&&n.onChangeEmail(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u0435\u043C\u0435\u0439\u043B"},null,544),[[b,s.email]])],2)):h("",!0)]),o("div",q,[(a(!0),r(k,null,A(n.getButtons,l=>(a(),r("div",{class:u(["button",{disabled:n.isButtonDisabled}]),key:l.name},[o("div",{class:u(["link",{"not-allowed":n.isButtonDisabled}]),onClick:e[7]||(e[7]=(...I)=>n.onButton&&n.onButton(...I))},Y,2)],2))),128))])])]),o("div",$,[o("div",{class:u(["agreement",{"not-agreement":!s.agreement}])},[g(o("input",{type:"checkbox","onUpdate:modelValue":e[8]||(e[8]=l=>s.agreement=l)},null,512),[[V,s.agreement]]),ee,te],2),se])])])):h("",!0),s.loader?(a(),r("div",ne,ie)):h("",!0),!s.loader&&!s.ml?(a(),r("div",le,re)):h("",!0)],64)}var he=D(z,[["render",ce]]);L(he).mount("#app");
