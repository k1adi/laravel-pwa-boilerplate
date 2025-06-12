import{u as d,r as i,j as e}from"./app-Bw-HDS2U.js";import{c as r}from"./createLucideIcon-KLntpfR-.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],f=r("wifi-off",c);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],h=r("wifi",l);function k(){const{isOnline:t,lastChanged:s}=d(),[n,a]=i.useState(!1);return i.useEffect(()=>{if(s){a(!0);const o=setTimeout(()=>{a(!1)},5e3);return()=>clearTimeout(o)}},[s]),i.useEffect(()=>{t||a(!0)},[t]),!n&&t?null:e.jsx("div",{className:`fixed bottom-4 right-7 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${t?"bg-green-500 text-white":"bg-gray-300 dark:bg-gray-700 text-black dark:text-white"}`,children:t?e.jsxs(e.Fragment,{children:[e.jsx(h,{size:18}),e.jsx("span",{children:"Online"})]}):e.jsxs(e.Fragment,{children:[e.jsx(f,{size:18}),e.jsx("span",{children:"Offline"})]})})}export{k as N};
