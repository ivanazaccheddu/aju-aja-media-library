!function(){"use strict";var e,t={47487:function(e,t,r){var n=r(92541),i=r(74538);(0,n.X)("page-latest",i.LatestMediaPage)},84234:function(e,t,r){r.r(t),r.d(t,{CircleIconButton:function(){return n.M},FilterOptions:function(){return i.j},FiltersToggleButton:function(){return o._},MaterialIcon:function(){return a.O},NavigationContentApp:function(){return u.o},NavigationMenuList:function(){return c.S},Notifications:function(){return l.T},NumericInputWithUnit:function(){return f.O},PopupMain:function(){return s.W8},PopupTop:function(){return s.HF},SpinnerLoader:function(){return d.i},UserThumbnail:function(){return p.q}});var n=r(17714),i=r(47446),o=r(2915),a=r(2299),u=r(72917),c=r(5671),l=r(72436),f=r(15517),s=r(60940),d=r(26309),p=r(86142)},40824:function(e,t,r){r.r(t),r.d(t,{LazyLoadItemListAsync:function(){return y}}),r(92070),r(52004),r(28407),r(56394),r(38288),r(55677),r(92129),r(24655),r(20288),r(54458),r(23675),r(74517),r(99751),r(38833),r(10815),r(55090),r(79174);var n=r(35466),i=r(98578),o=r(62546),a=r(58982),u=r(32832),c=r(83632),l=r(28986);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function y(e){var t,r,a=(t=(0,o.useItemListLazyLoad)(e),r=13,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);a=!0);}catch(e){u=!0,i=e}finally{try{a||null==r.return||r.return()}finally{if(u)throw i}}return o}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),f=a[0],s=a[1],d=a[2],y=a[3],g=a[4],v=a[5],b=a[6],h=a[7],O=a[8],P=a[9],j=a[10],w=a[11],S=a[12];return(0,n.useEffect)((function(){return y(new l.g(e.pageItems,e.maxItems,e.firstItemRequestUrl,e.requestUrl,v,b)),i.PageStore.on("window_scroll",h),i.PageStore.on("document_visibility_change",O),h(),function(){i.PageStore.removeListener("window_scroll",h),i.PageStore.removeListener("document_visibility_change",O),d&&(d.cancelAll(),y(null))}}),[]),s?f.length?n.createElement("div",{className:g.listOuter},w(),n.createElement("div",{ref:P,className:"items-list-wrap"},n.createElement("div",{ref:j,className:g.list},f.map((function(t,r){return n.createElement(c.H,p({key:r},(0,c.j)(e,t,r)))})))),S()):null:n.createElement(u.K,{className:g.listOuter})}y.propTypes=s({},a.ItemListAsync.propTypes),y.defaultProps=s(s({},a.ItemListAsync.defaultProps),{},{pageItems:2})},36191:function(e,t,r){r.r(t),r.d(t,{PageHeader:function(){return n.m},PageMain:function(){return i.r},PageSidebar:function(){return o.$},PageSidebarContentOverlay:function(){return a.a}});var n=r(56006),i=r(29198),o=r(22947),a=r(41542)},74538:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LatestMediaPage=void 0;var i=n(r(35466)),o=r(43613),a=r(98578),u=r(25910),c=r(40824),l=r(37637),f=r(80473);t.LatestMediaPage=function(e){var t=e.id,r=void 0===t?"latest-media":t,n=e.title,s=void 0===n?f.translateString("Recent uploads"):n;return i.default.createElement(l.Page,{id:r},i.default.createElement(o.ApiUrlConsumer,null,(function(e){return i.default.createElement(u.MediaListWrapper,{title:s,className:"items-list-ver"},i.default.createElement(c.LazyLoadItemListAsync,{requestUrl:e.media,hideViews:!a.PageStore.get("config-media-item").displayViews,hideAuthor:!a.PageStore.get("config-media-item").displayAuthor,hideDate:!a.PageStore.get("config-media-item").displayPublishDate}))})))}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,r,i,o){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],i=e[l][1],o=e[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(u=!1,o<a&&(a=o));u&&(e.splice(l--,1),t=i())}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,i,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=131,function(){var e={131:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,a=r[0],u=r[1],c=r[2],l=0;for(i in u)n.o(u,i)&&(n.m[i]=u[i]);if(c)var f=c(n);for(t&&t(r);l<a.length;l++)o=a[l],n.o(e,o)&&e[o]&&e[o][0](),e[a[l]]=0;return n.O(f)},r=self.webpackChunkmediacms_frontend=self.webpackChunkmediacms_frontend||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=n.O(void 0,[431],(function(){return n(47487)}));i=n.O(i)}();