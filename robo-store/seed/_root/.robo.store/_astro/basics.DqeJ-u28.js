function g(){}function L(e){return e()}function I(){return Object.create(null)}function x(e){e.forEach(L)}function T(e){return typeof e=="function"}function ue(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function q(e){return Object.keys(e).length===0}function H(e,...t){if(e==null){for(const i of t)i(void 0);return g}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function fe(e,t,n){e.$$.on_destroy.push(H(t,n))}let v=!1;function P(){v=!0}function Q(){v=!1}function R(e,t,n,i){for(;e<t;){const l=e+(t-e>>1);n(l)<=i?e=l+1:t=l}return e}function U(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let u=0;u<t.length;u++){const d=t[u];d.claim_order!==void 0&&r.push(d)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let l=0;for(let r=0;r<t.length;r++){const u=t[r].claim_order,d=(l>0&&t[n[l]].claim_order<=u?l+1:R(1,l,y=>t[n[y]].claim_order,u))-1;i[r]=n[d]+1;const a=d+1;n[a]=r,l=Math.max(a,l)}const f=[],c=[];let s=t.length-1;for(let r=n[l]+1;r!=0;r=i[r-1]){for(f.push(t[r-1]);s>=r;s--)c.push(t[s]);s--}for(;s>=0;s--)c.push(t[s]);f.reverse(),c.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<c.length;r++){for(;u<f.length&&c[r].claim_order>=f[u].claim_order;)u++;const d=u<f.length?f[u]:null;e.insertBefore(c[r],d)}}function D(e,t){if(v){for(U(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function se(e,t,n){v&&!n?D(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function V(e){e.parentNode&&e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function W(e){return document.createElement(e)}function N(e){return document.createTextNode(e)}function oe(){return N(" ")}function de(){return N("")}function _e(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function he(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function me(e){return e.dataset.svelteH}function z(e){return Array.from(e.childNodes)}function F(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function B(e,t,n,i,l=!1){F(e);const f=(()=>{for(let c=e.claim_info.last_index;c<e.length;c++){const s=e[c];if(t(s)){const r=n(s);return r===void 0?e.splice(c,1):e[c]=r,l||(e.claim_info.last_index=c),s}}for(let c=e.claim_info.last_index-1;c>=0;c--){const s=e[c];if(t(s)){const r=n(s);return r===void 0?e.splice(c,1):e[c]=r,l?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=c,s}}return i()})();return f.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,f}function G(e,t,n,i){return B(e,l=>l.nodeName===t,l=>{const f=[];for(let c=0;c<l.attributes.length;c++){const s=l.attributes[c];n[s.name]||f.push(s.name)}f.forEach(c=>l.removeAttribute(c))},()=>i(t))}function pe(e,t,n){return G(e,t,n,W)}function J(e,t){return B(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>N(t),!0)}function be(e){return J(e," ")}let S;function b(e){S=e}const m=[],O=[];let p=[];const C=[],K=Promise.resolve();let w=!1;function X(){w||(w=!0,K.then(M))}function k(e){p.push(e)}const E=new Set;let h=0;function M(){if(h!==0)return;const e=S;do{try{for(;h<m.length;){const t=m[h];h++,b(t),Y(t.$$)}}catch(t){throw m.length=0,h=0,t}for(b(null),m.length=0,h=0;O.length;)O.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];E.has(n)||(E.add(n),n())}p.length=0}while(m.length);for(;C.length;)C.pop()();w=!1,E.clear(),b(e)}function Y(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(k)}}function Z(e){const t=[],n=[];p.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),p=t}const ee=new Set;function te(e,t){e&&e.i&&(ee.delete(e),e.i(t))}function ye(e){return e?.length!==void 0?e:Array.from(e)}function ne(e,t,n){const{fragment:i,after_update:l}=e.$$;i&&i.m(t,n),k(()=>{const f=e.$$.on_mount.map(L).filter(T);e.$$.on_destroy?e.$$.on_destroy.push(...f):x(f),e.$$.on_mount=[]}),l.forEach(k)}function ie(e,t){const n=e.$$;n.fragment!==null&&(Z(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function le(e,t){e.$$.dirty[0]===-1&&(m.push(e),X(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function $e(e,t,n,i,l,f,c=null,s=[-1]){const r=S;b(e);const u=e.$$={fragment:null,ctx:[],props:f,update:g,not_equal:l,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:I(),dirty:s,skip_bound:!1,root:t.target||r.$$.root};c&&c(u.root);let d=!1;if(u.ctx=n?n(e,t.props||{},(a,y,...A)=>{const j=A.length?A[0]:y;return u.ctx&&l(u.ctx[a],u.ctx[a]=j)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](j),d&&le(e,a)),y}):[],u.update(),d=!0,x(u.before_update),u.fragment=i?i(u.ctx):!1,t.target){if(t.hydrate){P();const a=z(t.target);u.fragment&&u.fragment.l(a),a.forEach(V)}else u.fragment&&u.fragment.c();t.intro&&te(e.$$.fragment),ne(e,t.target,t.anchor),Q(),M()}b(r)}class ge{$$=void 0;$$set=void 0;$destroy(){ie(this,1),this.$destroy=g}$on(t,n){if(!T(n))return g;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const l=i.indexOf(n);l!==-1&&i.splice(l,1)}}$set(t){this.$$set&&!q(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const re="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(re);let o=[],_=0;const $=4;let ce=e=>{let t=[],n={get(){return n.lc||n.listen(()=>{})(),n.value},lc:0,listen(i){return n.lc=t.push(i),()=>{for(let f=_+$;f<o.length;)o[f]===i?o.splice(f,$):f+=$;let l=t.indexOf(i);~l&&(t.splice(l,1),--n.lc||n.off())}},notify(i,l){let f=!o.length;for(let c of t)o.push(c,n.value,i,l);if(f){for(_=0;_<o.length;_+=$)o[_](o[_+1],o[_+2],o[_+3]);o.length=0}},off(){},set(i){let l=n.value;l!==i&&(n.value=i,n.notify(l))},subscribe(i){let l=n.listen(i);return i(n.value),l},value:e};return n};const xe=ce(!1);export{ge as S,W as a,oe as b,pe as c,z as d,ye as e,be as f,me as g,V as h,$e as i,he as j,se as k,D as l,_e as m,g as n,ae as o,fe as p,xe as q,de as r,ue as s,N as t,J as u};
