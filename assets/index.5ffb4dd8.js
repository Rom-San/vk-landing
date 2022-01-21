var V=Object.defineProperty;var g=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var f=(t,e,n)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,m=(t,e)=>{for(var n in e||(e={}))A.call(e,n)&&f(t,n,e[n]);if(g)for(var n of g(e))x.call(e,n)&&f(t,n,e[n]);return t};import{v as E,q as k,b as u,r as P,o as a,c as r,a as o,d as h,t as _,n as p,w as v,e as y,F as b,f as C,g as O,h as I,i as L}from"./vendor.b0462ff0.js";const K=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}};K();var N="/vk-landing/assets/phone.9fe2144b.svg",T="/vk-landing/assets/mail.f6f1960d.svg";function B(t){if(!!t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://vk.com/js/api/openapi.js?169",e.onload=function(){VK.Retargeting.Init(t),VK.Retargeting.Hit()},document.head.appendChild(e)}}function M(t){window.vkAsyncInit=function(){VK.init({apiId:t})},setTimeout(function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://vk.com/js/api/openapi.js?169",e.async=!0,document.getElementById("vk_api_transport").appendChild(e)},0)}var U=(t,e)=>{const n=t.__vccOpts||t;for(const[c,s]of e)n[c]=s;return n};const D={directives:{mask:E.exports.mask},async created(){var t;if(this.hash=k.parse(location.hash),this.search=k.parse(location.search),console.log("\u{1F680} ~ created",this.hash),!this.hash)this.loader=!1;else{const e=this.hash.ml;try{const n=await fetch(`${this.api}/mini-landing/${e}`);this.ml=await n.json(),this.loader=!1,document.title=this.ml.content.title,this.groupId=parseInt(this.ml.buttons[0].botIdInSocialNetwork),this.setDescription(),M(this.vkApiId),((t=this.ml)==null?void 0:t.additionalOptions.VkPixel)&&B(this.ml.additionalOptions.VkPixel,7831726)}catch(n){this.ml=null,this.loader=!1,console.log(n.message)}}},async mounted(){u.supports("VKWebAppResizeWindow")&&setTimeout(()=>{const t=document.body.offsetHeight,e=t<8050?t:8050;u.send("VKWebAppResizeWindow",{height:e})},1e3)},data(){return{search:null,ml:null,hash:null,loader:!0,description:"",groupId:null,vkApiId:7831726,api:"https://prosto.bz/api",vkUrl:"https://vk.com/",vkUserInfo:{},vkAuth:{},vkApi:"https://api.vk.com/method/",youtubeUrl:"https://www.youtube.com/embed",vkVideoUrl:"https://vk.com/video_ext.php?oid=",isInvalidPhone:!0,isInvalidEmail:!0,phone:null,phoneNumberLength:null,email:null,emailAttributes:!1,vkLink:"",agreement:!0,isVkVideo:!1,vkVideoFrame:"",vkVideoHash:null}},watch:{async groupId(t){console.log(t),this.vkUserInfo=await u.send("VKWebAppGetUserInfo"),this.vkAuth=await u.send("VKWebAppGetAuthToken",{app_id:this.vkApiId,scope:""}),console.log("\u{1F680} ~ mounted ~ this.vkAuth",this.vkAuth);const e=this.ml.content.video;if(e.includes("https://vk.com")&&this.vkAuth.access_token){const n=/(?!video)[\d-]+/g,c=e.match(n);VK.Auth.login(s=>{console.log("\u{1F680} ~ VK.Auth.login ~ r",s);const i={owner_id:c[0],videos:c[1],access_token:this.vkAuth.access_token,v:5.131};console.log("\u{1F680} ~ params",i),VK.Api.call("video.get",i,d=>{console.log("\u{1F680} ~ videos ~ response",d),this.vkVideoSrc=videos.items[0].player})})}}},computed:{getImage(){return this.ml.content?`${this.api}/file/${this.ml.content.image[0]}`:""},getVideo(){let t;const e=this.ml.content.video,n="?controls=0&modestbranding=1&showinfo=0&rel=0";return e.includes("https://youtube.com")&&(t=e.replace("watch?v=","embed/")+n),e.includes("https://youtu.be")&&(t=e.replace("https://youtu.be",this.youtubeUrl)+n),e.includes("https://vk.com")&&this.vkVideoSrc&&(this.isVkVideo=!0,t=this.vkVideoSrc),t},getTitle(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.title:""},getText(){var t;return((t=this.ml)==null?void 0:t.content)?this.ml.content.text:""},getPhoneIcon(){return N},getEmailIcon(){return T},getButtons(){var t,e;return((e=(t=this.ml)==null?void 0:t.buttons)==null?void 0:e.length)?this.ml.buttons:[]},isButtonDisabled(){return this.isInvalidPhone&&this.ml.additionalOptions.showPhone||this.isInvalidEmail&&this.ml.additionalOptions.showEmail||!this.agreement}},methods:{async onButton(){if(!this.isButtonDisabled){try{await this.postData(),await fetch(`${this.api}/vk-user-enter`,{method:"post",body:JSON.stringify(m(m(m({},this.vkUserInfo),this.search),this.hash)),headers:{"Content-Type":"application/json"}})}catch(t){console.log("\u041E\u0448\u0438\u0431\u043A\u0430:",t)}this.vkLink=`${this.vkUrl}im?sel=-${this.ml.buttons[0].botIdInSocialNetwork}`,window.top.location.href=this.vkLink}},getQuery(t){let e={};return t.includes("#")?t.split("#")[1].split("&").forEach(s=>{const i=s.split("=");Object.assign(e,{[i[0]]:i[1]})}):(this.loader=!1,e=null),e},setDescription(){const t=this.ml.content.text.indexOf(".");this.description=this.ml.content.text.slice(0,t+1);const e=document.createElement("meta");e.setAttribute("name","description"),e.content=this.description,document.head.appendChild(e)},onChangePhone(){this.phoneNumberLength<11&&(this.isInvalidPhone=!0)},onChangeEmail(){this.emailAttributes?this.isInvalidEmail=!1:this.isInvalidEmail=!0},onClickPhone(){this.phone||(this.phone="+7")},onInputPhone(){const t=this.phone.replace(/[^\d]/g,"");this.phoneNumberLength=t.length,this.isInvalidPhone=this.phoneNumberLength<11},onInputEmail(){const t=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;this.emailAttributes=t.test(this.email),this.isInvalidEmail=!this.emailAttributes},async postData(){const t={id:this.ml.buttons[0].commandId,fields:{email:this.email,phone:this.phone}};try{return(await fetch(`${this.api}/info`,{method:"POST",body:JSON.stringify(t)})).text()}catch(e){console.log(e.message)}},async allowMessages(){try{const t=await u.send("VKWebAppAllowMessagesFromGroup",{group_id:this.groupId});return console.log("\u{1F680} ~ allowMessages",t),t}catch(t){return console.log("\u{1F680} ~ allowMessages ~ e",t),await this.allowMessages()}}}},S={key:0,class:"wrapper"},j={class:"minilanding"},z={class:"headline"},H=["src"],W=["src"],F=["innerHTML"],R={class:"container"},q={class:"title"},G={class:"content"},Z={class:"text"},J={class:"form"},Q={key:0,class:"label"},X=["src"],Y=["src"],$={class:"buttons"},ee=o("div",{class:"text"},"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",-1),te=[ee],se={class:"footer"},ie=I(" \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\xA0 "),ne=o("a",{href:"https://prostolp.com/policy.pdf",target:"_blank"}," \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",-1),oe=o("div",{class:"made-in"},[I(" \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 "),o("a",{href:"http://prosto.bz",target:"_blank"},"prosto.bz")],-1),le={key:1,id:"preloader"},ae=o("div",{id:"loader"},null,-1),re=[ae],ce={key:2,class:"empty"},he=o("div",{class:"text"},"\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",-1),de=[he];function ue(t,e,n,c,s,i){const d=P("mask");return a(),r(b,null,[!s.loader&&s.ml?(a(),r("div",S,[o("div",j,[o("div",z,[s.ml.content.image?(a(),r("img",{key:0,class:"image",src:i.getImage,alt:""},null,8,H)):h("",!0),s.ml.content.video&&!s.isVkVideo?(a(),r("iframe",{key:1,class:"video",width:"585",src:i.getVideo,frameborder:"0",allow:"autoplay; encrypted-media; fullscreen;"},null,8,W)):h("",!0),s.isVkVideo?(a(),r("div",{key:2,class:"vk-video",innerHTML:s.vkVideoFrame},null,8,F)):h("",!0)]),o("div",R,[o("div",q,_(i.getTitle),1),o("div",G,[o("div",Z,_(i.getText),1),o("form",J,[s.ml&&(s.ml.additionalOptions.showPhone||s.ml.additionalOptions.showEmail)?(a(),r("div",Q," \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F ")):h("",!0),s.ml&&s.ml.additionalOptions.showPhone?(a(),r("div",{key:1,class:p(["input-block",{invalid:s.isInvalidPhone}])},[o("img",{class:"icon",src:i.getPhoneIcon,alt:""},null,8,X),v(o("input",{type:"tel","onUpdate:modelValue":e[0]||(e[0]=l=>s.phone=l),onClick:e[1]||(e[1]=(...l)=>i.onClickPhone&&i.onClickPhone(...l)),onInput:e[2]||(e[2]=(...l)=>i.onInputPhone&&i.onInputPhone(...l)),onChange:e[3]||(e[3]=(...l)=>i.onChangePhone&&i.onChangePhone(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"},null,544),[[d,"+7(###) ###-##-##"],[y,s.phone]])],2)):h("",!0),s.ml&&s.ml.additionalOptions.showEmail?(a(),r("div",{key:2,class:p(["input-block",{invalid:s.isInvalidEmail}])},[o("img",{class:"icon",src:i.getEmailIcon,alt:""},null,8,Y),v(o("input",{type:"email","onUpdate:modelValue":e[4]||(e[4]=l=>s.email=l),onInput:e[5]||(e[5]=(...l)=>i.onInputEmail&&i.onInputEmail(...l)),onChange:e[6]||(e[6]=(...l)=>i.onChangeEmail&&i.onChangeEmail(...l)),placeholder:"\u0412\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 \u0435\u043C\u0435\u0439\u043B"},null,544),[[y,s.email]])],2)):h("",!0)]),o("div",$,[(a(!0),r(b,null,C(i.getButtons,l=>(a(),r("div",{class:p(["button",{disabled:i.isButtonDisabled}]),key:l.name},[o("div",{class:p(["link",{"not-allowed":i.isButtonDisabled}]),onClick:e[7]||(e[7]=(...w)=>i.onButton&&i.onButton(...w))},te,2)],2))),128))])])]),o("div",se,[o("div",{class:p(["agreement",{"not-agreement":!s.agreement}])},[v(o("input",{type:"checkbox","onUpdate:modelValue":e[8]||(e[8]=l=>s.agreement=l)},null,512),[[O,s.agreement]]),ie,ne],2),oe])])])):h("",!0),s.loader?(a(),r("div",le,re)):h("",!0),!s.loader&&!s.ml?(a(),r("div",ce,de)):h("",!0)],64)}var pe=U(D,[["render",ue]]);L(pe).mount("#app");
