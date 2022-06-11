var A=Object.defineProperty;var _=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var I=(t,e,n)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,p=(t,e)=>{for(var n in e||(e={}))S.call(e,n)&&I(t,n,e[n]);if(_)for(var n of _(e))O.call(e,n)&&I(t,n,e[n]);return t};import{v as U,q as w,b as g,r as L,o as a,c,n as d,a as o,d as h,t as x,e as u,w as v,f as V,F as C,g as B,h as N,i as E,j as T}from"./vendor.ef8b176e.js";const F=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}};F();var M="/vk-landing/assets/phone.9fe2144b.svg",j="/vk-landing/assets/mail.f6f1960d.svg";function z(t){if(!!t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://vk.com/js/api/openapi.js?169",e.onload=function(){VK.Retargeting.Init(t),VK.Retargeting.Hit()},document.head.appendChild(e)}}function D(t){window.vkAsyncInit=function(){VK.init({apiId:t})},setTimeout(function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://vk.com/js/api/openapi.js?169",e.async=!0,document.getElementById("vk_api_transport").appendChild(e)},0)}var K=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n};const H={directives:{mask:U.exports.mask},async created(){var t,e;if(this.hash=w.parse(location.hash),this.search=w.parse(location.search),this.vkUserInfo=g.send("VKWebAppGetUserInfo"),this.api=this.hash.stage?this.getApiFromStage(this.hash.stage):"https://prosto.bz/api",(t=this.hash)==null?void 0:t.ml){const n=this.hash.ml;try{const r=await fetch(`${this.api}/mini-landing/${n}`);this.ml=await r.json(),this.loader=!1,document.title=this.ml.content.title,this.groupId=parseInt(this.ml.buttons[0].botIdInSocialNetwork),this.setDescription(),D(this.vkApiId),((e=this.ml)==null?void 0:e.additionalOptions.VkPixel)&&z(this.ml.additionalOptions.VkPixel)}catch(r){this.ml=null,this.loader=!1,console.log(r.message)}}else{const n=this.hash.group;this.enterUser(n)}},async mounted(){g.supports("VKWebAppResizeWindow")&&setTimeout(()=>{const t=document.body.offsetHeight,e=t<8050?t:8050;g.send("VKWebAppResizeWindow",{height:e})},1e3)},data(){return{search:null,ml:null,hash:null,loader:!0,description:"",groupId:null,vkApiId:7831726,api:null,vkUrl:"https://vk.com/",vkUserInfo:{},vkAuth:{},vkApi:"https://api.vk.com/method/",youtubeUrl:"https://www.youtube.com/embed",vkVideoUrl:"https://vk.com/video_ext.php?oid=",isInvalidPhone:!0,isInvalidEmail:!0,phone:null,phoneNumberLength:null,email:null,emailAttributes:!1,vkLink:"",agreement:!0,isVkVideo:!1,vkVideoFrame:"",vkVideoHash:null}},watch:{async groupId(t){console.log(t)}},computed:{previewStyle(){var t,e,n,r;return((e=(t=this.ml)==null?void 0:t.content)==null?void 0:e.pageFormat)==="fullscreen"?((r=(n=this.ml)==null?void 0:n.content)==null?void 0:r.image)?`background-image: url('${this.api}/file/${this.ml.content.image[0]}')`:`background: ${this.ml.content.backgroundColor}`:`background: ${this.ml.content.backgroundColor}`},titleStyle(){var t,e;return((e=(t=this.ml)==null?void 0:t.content)==null?void 0:e.titleColor)?`color: ${this.ml.content.titleColor}`:"color: #686FB0"},textStyle(){var t,e;return((e=(t=this.ml)==null?void 0:t.content)==null?void 0:e.textColor)?`color: ${this.ml.content.textColor}`:"color: #574E72"},getImage(){return this.ml.content?`${this.api}/file/${this.ml.content.image[0]}`:""},getVideo(){let t;const e=this.ml.content.video,n="?controls=0&modestbranding=1&showinfo=0&rel=0";return e.includes("https://youtube.com")&&(t=e.replace("watch?v=","embed/")+n),e.includes("https://youtu.be")&&(t=e.replace("https://youtu.be",this.youtubeUrl)+n),e.includes("https://vk.com")&&this.vkVideoSrc&&(this.isVkVideo=!0,t=e),t},getTitle(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.title:""},getText(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.text:""},getPhoneIcon(){return M},getEmailIcon(){return j},getButtons(){var t,e;return((e=(t=this.ml)==null?void 0:t.buttons)==null?void 0:e.length)?this.ml.buttons:[]},isButtonDisabled(){return this.isInvalidPhone&&this.ml.additionalOptions.showPhone||this.isInvalidEmail&&this.ml.additionalOptions.showEmail||!this.agreement}},methods:{getApiFromStage(t){let e=null;switch(t){case"1":e="https://develop.dev.prosto.bz/api";break;case"2":e="http://localhost:3000/api";break}return e},sendClick(){const t=`${this.api}/mini-landing/${this.hash.ml}/vk`;fetch(t,{method:"PATCH"})},async onButton(){if(!this.isButtonDisabled){this.sendClick(),await this.postData();const t=this.ml.buttons[0].botIdInSocialNetwork;this.enterUser(t)}},async enterUser(t){try{await fetch(`${this.api}/vk-user-enter`,{method:"post",body:JSON.stringify(p(p(p({},this.vkUserInfo),this.search),this.hash)),headers:{"Content-Type":"application/json"}})}catch(e){console.log("\u041E\u0448\u0438\u0431\u043A\u0430:",e)}this.vkLink=`${this.vkUrl}im?sel=-${t}`,window.top.location.href=this.vkLink},getQuery(t){let e={};return t.includes("#")?t.split("#")[1].split("&").forEach(s=>{const i=s.split("=");Object.assign(e,{[i[0]]:i[1]})}):(this.loader=!1,e=null),e},setDescription(){const t=this.ml.content.text.indexOf(".");this.description=this.ml.content.text.slice(0,t+1);const e=document.createElement("meta");e.setAttribute("name","description"),e.content=this.description,document.head.appendChild(e)},onChangePhone(){this.phoneNumberLength<11&&(this.isInvalidPhone=!0)},onChangeEmail(){this.emailAttributes?this.isInvalidEmail=!1:this.isInvalidEmail=!0},onClickPhone(){this.phone||(this.phone="+7")},onInputPhone(){const t=this.phone.replace(/[^\d]/g,"");this.phoneNumberLength=t.length,this.isInvalidPhone=this.phoneNumberLength<11},onInputEmail(){const t=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;this.emailAttributes=t.test(this.email),this.isInvalidEmail=!this.emailAttributes},async postData(){const t={id:this.ml.buttons[0].commandId,fields:{email:this.email,phone:this.phone},tags:this.ml.buttons[0].tags};try{return(await fetch(`${this.api}/info`,{method:"POST",body:JSON.stringify(t)})).text()}catch(e){console.log(e.message)}},async allowMessages(){try{const t=await g.send("VKWebAppAllowMessagesFromGroup",{group_id:this.groupId});return console.log("\u{1F680} ~ allowMessages",t),t}catch(t){return console.log("\u{1F680} ~ allowMessages ~ e",t),await this.allowMessages()}}}},W={key:0,class:"headline"},R=["src"],q=["src"],Z=["innerHTML"],G={class:"container"},J={class:"content"},Q={class:"form"},X=["src"],Y=["src"],$={class:"buttons"},ee=o("div",{class:"text"},"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",-1),te=[ee],se={class:"footer"},ie=E(" \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\xA0 "),ne=o("a",{href:"https://prostolp.com/policy.pdf",target:"_blank"}," \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",-1),oe=[ie,ne],le=E(" \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 "),re=o("a",{href:"http://prosto.bz",target:"_blank"},"prosto.bz",-1),ae=[le,re],ce={key:1,id:"preloader"},he=o("div",{id:"loader"},null,-1),de=[he],ue={key:2,class:"empty"},me=o("div",{class:"text"},"\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",-1),pe=[me];function ge(t,e,n,r,s,i){var f,y,k,b;const m=L("mask");return a(),c(C,null,[!s.loader&&s.ml?(a(),c("div",{key:0,class:"wrapper",style:d(i.previewStyle)},[o("div",{class:u(["minilanding",{wide:((y=(f=s.ml)==null?void 0:f.content)==null?void 0:y.pageFormat)==="fullscreen"}])},[((b=(k=s.ml)==null?void 0:k.content)==null?void 0:b.pageFormat)!=="fullscreen"?(a(),c("div",W,[s.ml.content.image?(a(),c("img",{key:0,class:"image",src:i.getImage,alt:""},null,8,R)):h("",!0),s.ml.content.video&&!s.isVkVideo?(a(),c("iframe",{key:1,class:"video",width:"585",src:i.getVideo,frameborder:"0",allow:"autoplay; encrypted-media; fullscreen;"},null,8,q)):h("",!0),s.isVkVideo?(a(),c("div",{key:2,class:"vk-video",innerHTML:s.vkVideoFrame},null,8,Z)):h("",!0)])):h("",!0),o("div",G,[o("div",{class:"title",style:d(i.titleStyle)},x(i.getTitle),5),o("div",J,[o("div",{class:"text",style:d(i.textStyle)},x(i.getText),5),o("form",Q,[s.ml&&(s.ml.additionalOptions.showPhone||s.ml.additionalOptions.showEmail)?(a(),c("div",{key:0,class:"label",style:d(i.textStyle)}," \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F ",4)):h("",!0),s.ml&&s.ml.additionalOptions.showPhone?(a(),c("div",{key:1,class:u(["input-block",{invalid:s.isInvalidPhone}])},[o("img",{class:"icon",src:i.getPhoneIcon,alt:""},null,8,X),v(o("input",{type:"tel","onUpdate:modelValue":e[0]||(e[0]=l=>s.phone=l),onClick:e[1]||(e[1]=(...l)=>i.onClickPhone&&i.onClickPhone(...l)),onInput:e[2]||(e[2]=(...l)=>i.onInputPhone&&i.onInputPhone(...l)),onChange:e[3]||(e[3]=(...l)=>i.onChangePhone&&i.onChangePhone(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",style:d(i.textStyle)},null,36),[[m,"+7(###) ###-##-##"],[V,s.phone]])],2)):h("",!0),s.ml&&s.ml.additionalOptions.showEmail?(a(),c("div",{key:2,class:u(["input-block",{invalid:s.isInvalidEmail}])},[o("img",{class:"icon",src:i.getEmailIcon,alt:""},null,8,Y),v(o("input",{type:"email","onUpdate:modelValue":e[4]||(e[4]=l=>s.email=l),onInput:e[5]||(e[5]=(...l)=>i.onInputEmail&&i.onInputEmail(...l)),onChange:e[6]||(e[6]=(...l)=>i.onChangeEmail&&i.onChangeEmail(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u0435\u043C\u0435\u0439\u043B",style:d(i.textStyle)},null,36),[[V,s.email]])],2)):h("",!0)]),o("div",$,[(a(!0),c(C,null,B(i.getButtons,l=>(a(),c("div",{class:u(["button",{disabled:i.isButtonDisabled}]),key:l.name},[o("div",{class:u(["link",{"not-allowed":i.isButtonDisabled}]),onClick:e[7]||(e[7]=(...P)=>i.onButton&&i.onButton(...P))},te,2)],2))),128))])])]),o("div",se,[o("div",{class:u(["agreement",{"not-agreement":!s.agreement}]),style:d(i.textStyle)},[v(o("input",{name:"agreement",type:"checkbox","onUpdate:modelValue":e[8]||(e[8]=l=>s.agreement=l)},null,512),[[N,s.agreement]]),o("label",{for:"agreement",style:d(i.textStyle)},oe,4)],6),o("div",{class:"made-in",style:d(i.textStyle)},ae,4)])],2)],4)):h("",!0),s.loader?(a(),c("div",ce,de)):h("",!0),!s.loader&&!s.ml?(a(),c("div",ue,pe)):h("",!0)],64)}var ve=K(H,[["render",ge]]);T(ve).mount("#app");
