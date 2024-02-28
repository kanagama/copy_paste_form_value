var A=(e,i,l)=>{if(!i.has(e))throw TypeError("Cannot "+l)};var o=(e,i,l)=>(A(e,i,"read from private field"),l?l.call(e):i.get(e)),n=(e,i,l)=>{if(i.has(e))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(e):i.set(e,l)},a=(e,i,l,b)=>(A(e,i,"write to private field"),b?b.call(e,l):i.set(e,l),l);(function(){"use strict";var k,d,u,c,g,C,w,m,p,v,F,y,I,f;const e=Object.freeze({CopyPasteCheckboxId:"toggle-checkbox",FlashMessageCheckboxId:"message-checkbox",HiddenCheckboxId:"hidden-checkbox",StatusId:"copy-paste-form-status",FlashMessageId:"copy-paste-form-value-error-message",CopyBtnId:"copy_button_a",PasteBtnId:"paste_button_a",HiddenClass:"copy-paste-form-value-hidden",FlashMessageClass:"copy-paste-form-value-message"});class i{checkFormCount(){return this.getFormCount()==1}element(){return document.getElementsByTagName("form")}getFormCount(){return this.element().length}}class l{constructor(){n(this,k,void 0);a(this,k,new i)}storageName(){return"form_value"}getDisabledName(){return["_method","_csrfToken","_token"]}hasHiddenClass(){return document.getElementById(e.StatusId).classList.contains(e.HiddenClass)}inArray(t){return[].indexOf.call(this.getDisabledName(),t)}serializeArray(){if(!o(this,k).checkFormCount())return{};let t={};return document.querySelector("form").querySelectorAll("input, select, textarea").forEach(s=>{s.getAttribute("type")==="hidden"&&!this.hasHiddenClass()||s.getAttribute("type")==="submit"||s.getAttribute("type")==="reset"||s.getAttribute("type")==="radio"&&s.checked!==!0||(t[s.getAttribute("name")]=s.value)}),JSON.stringify(t)}setForm(t,s){return this.input(t,s)||this.select(t,s)||this.textarea(t,s)}dispatch(t){t.dispatchEvent(new Event("change")),t.dispatchEvent(new Event("change")),setTimeout(()=>{},20)}input(t,s){let r=document.querySelectorAll("input[name="+t+"]");if(r.length<=0)return console.log("input form not found."),!1;if(r.length>1){let x="";return r.forEach(M=>{if(x=M.getAttribute("type"),x!=="checkbox"&&x!=="radio")return!0;if(M.value===s)return M.checked=!0,this.dispatch(M),!1}),!0}return r.forEach(x=>x.getAttribute("type")==="hidden"&&!this.hasHiddenClass()?!0:(this.dispatch(x),!1)),!0}select(t,s){let r=document.querySelector("select[name="+t+"]");return r==null||r.length<=0?!1:(this.dispatch(r),!0)}textarea(t,s){let r=document.querySelector("textarea[name="+t+"]");return r==null||r.length<=0?!1:(r.value=s,this.dispatch(r),!0)}selectorEscape(t){return t.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g,"\\$&")}}k=new WeakMap;class b{constructor(){n(this,d,void 0);n(this,u,void 0);a(this,d,new l),a(this,u,new i),this.load(),this.toggle()}key(){return e.CopyBtnId}element(){return document.getElementById(this.key())}load(){this.element()||!o(this,u).checkFormCount()||(document.body.insertAdjacentHTML("beforeend",this.html()),this.element().addEventListener("click",()=>{this.clickEvent()}))}toggle(){chrome.storage.local.get([e.CopyPasteCheckboxId],t=>{this.hide(),t[e.CopyPasteCheckboxId]&&this.show(),console.log("loaded this "+this.key()+".")})}show(){this.element().style.display="flex"}hide(){this.element().style.display="none"}html(){return'<a title="Alt + i" id="'+this.key()+`" onMouseOver="this.style.border='solid 2px #3293e7';this.style.color='#3293e7';" onMouseOut="this.style.border='solid 2px #000';this.style.color='#000';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 90px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Copy</div></a>`}clickEvent(){if(!o(this,u).checkFormCount())return console.log("form not exists."),!1;const t={[o(this,d).storageName()]:o(this,d).serializeArray()};return chrome.storage.local.set(t,()=>{console.log("saved this form.")}),!0}}d=new WeakMap,u=new WeakMap;class H{constructor(){n(this,c,void 0);n(this,g,void 0);a(this,c,new l),a(this,g,new i),this.load(),this.toggle()}key(){return e.PasteBtnId}element(){return document.getElementById(this.key())}load(){this.element()||!o(this,g).checkFormCount()||(document.body.insertAdjacentHTML("beforeend",this.html()),this.element().addEventListener("click",()=>{this.clickEvent()}))}toggle(){chrome.storage.local.get([e.CopyPasteCheckboxId],t=>{this.hide(),t[e.CopyPasteCheckboxId]&&this.show(),console.log("loaded this "+this.key()+".")})}show(){this.element().style.display="flex"}hide(){this.element().style.display="none"}html(){return`<a title="Alt + o" id="paste_button_a" onMouseOver="this.style.border='solid 2px #3293e7';this.style.color='#3293e7';" onMouseOut="this.style.border='solid 2px #000';this.style.color='#000';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 30px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Paste</div></a>`}clickEvent(){return o(this,g).checkFormCount()?(chrome.storage.local.get([o(this,c).storageName()],t=>{if(!t.hasOwnProperty(o(this,c).storageName()))return console.log("copy data not exists."),!1;let s=JSON.parse(t[o(this,c).storageName()]);Object.keys(s).forEach(r=>{o(this,c).inArray(r)&&o(this,c).setForm(o(this,c).selectorEscape(r),s[r])})}),console.log("loaded this form."),!0):(console.log("form not exists."),!1)}}c=new WeakMap,g=new WeakMap;class B{constructor(){n(this,C,void 0);a(this,C,new i),this.load()}key(){return e.FlashMessageId}element(){return document.getElementById(this.key())}load(){this.element()||!o(this,C).checkFormCount()||document.body.insertAdjacentHTML("beforeend",this.html())}has(){return this.element().style.display==="flex"}show(){this.element().style.display="flex"}hide(){this.element().style.display="hide"}html(){return'<div  id="'+this.key()+'" style=" position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: calc(infinity); background-color: #f44336; color: white; padding: 10px 20px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); text-align: center; font-size: 16px; display: none; opacity: 0.8; font-weight: bold;">copy paste form value - Error</div>'}}C=new WeakMap;class E{constructor(){n(this,w,void 0);a(this,w,new i),this.load()}key(){return e.StatusId}element(){return document.getElementById(this.key())}load(){this.element()||!o(this,w).checkFormCount()||(document.body.insertAdjacentHTML("beforeend",this.html()),chrome.storage.local.get([e.HiddenCheckboxId],t=>{t[e.HiddenCheckboxId]&&this.addHidden()}),chrome.storage.local.get([e.FlashMessageCheckboxId],t=>{t[e.FlashMessageCheckboxId]&&this.addMessage()}))}html(){return'<div  id="'+this.key()+'" class="" style=" display: none !important;"></div>'}addHidden(){this.element().classList.add(e.HiddenClass)}removeHidden(){this.element().classList.remove(e.HiddenClass)}addMessage(){this.element().classList.add(e.FlashMessageClass)}removeMessage(){this.element().classList.remove(e.FlashMessageClass)}}w=new WeakMap;class P{constructor(){n(this,m,void 0);n(this,p,void 0);n(this,v,void 0);a(this,m,new b),a(this,p,new H),a(this,v,new i)}toggle(){return o(this,v).checkFormCount()?(chrome.storage.local.get([e.CopyPasteCheckboxId],t=>{const s=!t[e.CopyPasteCheckboxId];this.hide(),s&&this.show();const r={[e.CopyPasteCheckboxId]:s};chrome.storage.local.set(r,()=>{console.log("saved this "+e.CopyPasteCheckboxId+".")})}),!0):(console.log("form not exists."),!1)}show(){o(this,m).show(),o(this,p).show()}hide(){o(this,m).hide(),o(this,p).hide()}}m=new WeakMap,p=new WeakMap,v=new WeakMap;class L{constructor(){n(this,F,void 0);n(this,y,void 0);a(this,F,new i),a(this,y,new E)}toggle(){return o(this,F).checkFormCount()?(chrome.storage.local.get([e.HiddenCheckboxId],t=>{const s=!t[e.HiddenCheckboxId];o(this,y).removeHidden(),s&&o(this,y).addHidden();const r={[e.HiddenCheckboxId]:s};chrome.storage.local.set(r,()=>{console.log("saved this "+e.HiddenCheckboxId+".")})}),!0):(console.log("form not exists."),!1)}}F=new WeakMap,y=new WeakMap;class S{constructor(){n(this,I,void 0);n(this,f,void 0);a(this,I,new i),a(this,f,new E)}toggle(){return o(this,I).checkFormCount()?(chrome.storage.local.get([e.FlashMessageCheckboxId],t=>{const s=!t[e.FlashMessageCheckboxId];o(this,f).removeMessage(),s&&o(this,f).addMessage();const r={[e.FlashMessageCheckboxId]:s};chrome.storage.local.set(r,()=>{console.log("saved this "+e.FlashMessageCheckboxId+".")})}),!0):(console.log("form not exists."),!1)}}I=new WeakMap,f=new WeakMap;const N=new i,O=new b,_=new H;new B,new E;const j=new P,T=new L,z=new S;chrome.runtime.onMessage.addListener(h=>{if(!N.checkFormCount())return console.log("form not exists."),!1;switch(console.log(h),h){case"copy":O.clickEvent();break;case"paste":_.clickEvent();break;case"hidden":T.toggle();break;case"toggle":j.toggle();break;case"message":z.toggle();break}return console.log(h),!0})})();
