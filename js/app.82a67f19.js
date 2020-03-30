(function(e){function t(t){for(var a,r,o=t[0],c=t[1],u=t[2],d=0,m=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(m.length)m.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(a=!1)}a&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={app:0},s=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/names/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),i=n.n(a);i.a},"4bf6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"header"}},[n("SearchBar",{attrs:{names:e.nameInfo},on:{select:function(t){return e.selectName(t)}}}),n("LanguageSwitch",{attrs:{id:"language_switch"}})],1),n("div",{staticClass:"body"},[n("div",{staticClass:"side",attrs:{id:"general_info"}},[n("h2",[e._v("\n        "+e._s(e.$t("info.title"))+"\n      ")]),n("div",e._l(e.$t("info.content"),function(t,a){return n("p",{key:a},[e._v("\n          "+e._s(t)+"\n        ")])}),0)]),n("div",{attrs:{id:"scatter_container"}},[e.loaded?n("NameScatterChart",{attrs:{nameInfo:e.nameInfo,selectedName:e.selectedName,selectedNameGender:e.selectedGender},on:{select:function(t){return e.selectName(t)}}}):n("div",[n("Loading")],1)],1),n("div",{staticClass:"side",attrs:{id:"name_info"}},[n("h2",[e._v("\n        "+e._s(e.$t("nameInformation"))+"\n      ")]),e.nameUsage?n("div",[n("NameUsageChart",{attrs:{name:e.selectedName,gender:e.selectedGender,nameUsage:e.nameUsage}})],1):e._e(),n("NameInfo",{attrs:{information:e.nameInformation,neighbours:e.neighbours}})],1)])])},s=[],r=(n("55dd"),n("768b")),o=(n("ffc1"),n("ac6a"),n("96cf"),n("3b8d")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{attrs:{id:"scatter_area",height:e.height,width:e.width}},[n("g",{attrs:{id:"scatter_content"}},e._l(e.nameInfo,function(t){return n("circle",{key:t.name+t.sexe,class:[1==t.sexe?"male":"female","name"],attrs:{cx:e.x(t.x),cy:e.y(t.y),r:e.scale(t.count),rInit:e.scale(t.count),fill:e.colorScale(t.idmax),id:"name_"+t.name_index+"_"+(1==t.sexe?1:2)},on:{mouseover:function(n){return e.$emit("select",t)}}})}),0)])},u=[],l=(n("c5f6"),n("5698")),d=n("08a8"),m={name:"NameScatterChart",props:{nameInfo:Array,selectedName:String,selectedNameGender:Number},data:function(){return{height:800,width:800,zoomScale:1,svg:null}},computed:{x:function(){var e=l["c"](this.nameInfo.map(function(e){return e.x})),t=Object(r["a"])(e,2),n=t[0],a=t[1],i=l["g"]().range([10,this.width-20]);return i.domain([n,a]),i},y:function(){var e=l["c"](this.nameInfo.map(function(e){return e.y})),t=Object(r["a"])(e,2),n=t[0],a=t[1],i=l["g"]().range([this.height-20,10]);return i.domain([n,a]),i},scale:function(){return l["f"]().domain(l["c"](this.nameInfo.map(function(e){return e.count}))).range([2,7])},colorScale:function(){var e=l["c"](this.nameInfo.map(function(e){return e.idmax})),t=Object(r["a"])(e,2),n=t[0],a=t[1],i=function(e){return Object(d["a"])((e-n)/(a-n))};return i}},watch:{selectedName:function(){this.highlightName()},selectedNameGender:function(){this.highlightName()}},methods:{highlightName:function(){l["i"](".name").attr("selected",null),l["h"]("#name_".concat(this.selectedName,"_").concat(this.selectedNameGender)).attr("selected",!0)}},mounted:function(){this.svg=l["h"]("#scatter_area"),this.g=l["h"]("#scatter_content");var e=l["j"]().scaleExtent([.3,20]).on("zoom",function(){this.g.style("stroke-width","".concat(1.5/l["b"].transform.k,"px")),this.g.attr("transform",l["b"].transform);var e=l["b"].transform.k;l["i"](".name").each(function(){var t=l["h"](this);t.attr("r",t.attr("rInit")/(1+Math.log(e)/1.5))})}.bind(this));this.svg.call(e)}},h=m,f=(n("d0e4"),n("2877")),g=Object(f["a"])(h,c,u,!1,null,"6bc399e3",null),p=g.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("\n        "+e._s(e.name)+"\n    ")]),n("svg",{attrs:{id:"lineplot_area",height:e.height,width:e.width}},[n("g",[n("path",{staticClass:"line",attrs:{d:e.series}}),n("text",{staticClass:"date",attrs:{x:"0",y:e.height}},[e._v("1900")]),n("text",{staticClass:"date",attrs:{x:e.width-40,y:e.height}},[e._v("2017")])])])])},_=[],b=(n("7f7f"),{name:"NameUsageChart",props:{name:String,gender:Number,nameUsage:Array},data:function(){return{valueline:null,height:200,width:400,series:[],x:null,y:null}},created:function(){this.x=l["e"]().range([0,this.width]).domain([1900,2018]),this.y=l["e"]().range([this.height-20,0]),this.x.domain([1900,2018]).nice(),this.y.domain([0,1]);var e=this.x,t=this.y;this.valueline=l["d"]().x(function(t){return e(t[0])}).y(function(e){return t(e[1])}),this.updateData()},watch:{name:function(){this.updateData()},nameUsage:function(){this.updateData()}},methods:{updateData:function(){for(var e=0,t=0;t<this.nameUsage.length;t++)this.nameUsage[t].name==this.name&&this.nameUsage[t].sexe==this.gender&&(e=t);this.series=this.valueline(this.nameUsage[e].series.slice(0,this.nameUsage[e].series.length-1))}}}),x=b,y=(n("5ccb"),Object(f["a"])(x,v,_,!1,null,"40a4ae87",null)),w=y.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("span",{staticClass:"info_title"},[e._v(e._s(e.$t("name"))+" : ")]),e._v(" "+e._s(e.information.name)+"\n    ")]),n("div",[n("span",{staticClass:"info_title"},[e._v(e._s(e.$t("max"))+" : ")]),e._v(" "+e._s(e.information.max)+" (in "+e._s(e.information.idmax)+")\n    ")]),n("div",[n("span",{staticClass:"info_title"},[e._v(e._s(e.$t("neighbours"))+" : ")]),n("ul",e._l(e.neighbours,function(t,a){return n("li",{key:a},[e._v("\n                "+e._s(t.name)+"\n            ")])}),0)])])},I=[],j={name:"NameInfo",props:{information:Object,neighbours:Array}},S=j,O=(n("d53a"),Object(f["a"])(S,N,I,!1,null,"495a2b5b",null)),C=O.exports,L=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},$=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lds-ring"},[n("div"),n("div"),n("div"),n("div")])}],U={name:"Loading"},k=U,E=(n("675b"),Object(f["a"])(k,L,$,!1,null,"7f04d130",null)),P=E.exports,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"text-align":"center"}},[n("div",{staticClass:"input_wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",name:"search",placeholder:e.$t("search")},domProps:{value:e.name},on:{focus:function(t){e.displaySuggestions=!0},focusout:e.hideSuggestions,input:function(t){t.target.composing||(e.name=t.target.value)}}}),e.displaySuggestions?n("div",{staticClass:"name_dropdown"},[n("ul",e._l(e.suggestions,function(t){return n("li",{key:t.name+t.gender,on:{click:function(n){return e.selectName(t.name,t.gender)}}},[e._v("\n                    "+e._s(t.name)+" ("+e._s(1==t.gender?"M":"F")+")\n                ")])}),0)]):e._e()])])},M=[],A=(n("f559"),{name:"SearchBar",props:{names:Array},data:function(){return{suggestions:[],name:"",gender:null,displaySuggestions:!1}},watch:{name:function(){for(var e=[],t=this.name.toLowerCase(),n=0;n<this.names.length;n++)this.names[n].name_index.toLowerCase().startsWith(t)&&e.push({name:this.names[n].name_index,gender:this.names[n].sexe_index});this.suggestions=e.slice(0,50)}},methods:{hideSuggestions:function(){setTimeout(function(){this.displaySuggestions=!1}.bind(this),300)},selectName:function(e,t){this.name=e,this.gender=t,this.$emit("select",{name_index:e,sexe_index:t})}}}),R=A,D=(n("99b0"),Object(f["a"])(R,G,M,!1,null,"bd439e24",null)),T=D.exports,q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{attrs:{type:"button"},on:{click:function(t){return e.switchLocale()}}},["en"===e.selectedLanguage?n("span",[e._v("FR")]):n("span",[e._v("EN")])])])},z=[],B=n("a925");a["a"].use(B["a"]);var F={en:{info:{title:"What do i see here?",content:["Here you can see a visualisation of the trend for french names from 1900 until 2017.","The closer two dots are on the visualisation the more similar their trend are (t-SNE). The size depends on the total number of babies who received the names. ","For clarity I removed the names given less that 1000 times, so don't panic if you don't see your names, it means you are special 🙃."]},nameInformation:"Name's information",name:"Name",max:"Max",neighbours:"Neighbours",search:"Search..."},fr:{info:{title:"Qu'es ce que je vois?",content:["Vous voyer une visualisation de la mode des prénoms de 1900 à 2017.","Au plus deux points sont proches au plus ils ont suivis une mode similaire (t-SNE). La taille dépends du nombre total d'enfants qui otn recu le prénom.","Pour rendre la visualisation plus claire j'ai supprimé les prénoms donnés moins de 1000 fois, donc si vous ne trouvez pas votre prénoms pas de panique, c'est que vous êtes spécial 🙃."]},nameInformation:"Information du prénom",name:"Prénom",neighbours:"Voisins",search:"Chercher..."}},J=new B["a"]({locale:"en",fallbackLocale:"en",messages:F}),V={name:"LanguageSwitch",data:function(){return{selectedLanguage:"en"}},methods:{switchLocale:function(){"en"===this.selectedLanguage?this.selectedLanguage="fr":this.selectedLanguage="en",J.locale=this.selectedLanguage}}},W=V,H=(n("dd33"),Object(f["a"])(W,q,z,!1,null,"446cc976",null)),Q=H.exports,K={name:"app",components:{NameScatterChart:p,NameUsageChart:w,NameInfo:C,SearchBar:T,Loading:P,LanguageSwitch:Q},data:function(){return{nameInfo:[],nameUsage:null,selectedName:"BENJAMIN",selectedGender:1,nameInformation:{},neighbours:[],loaded:!1}},mounted:function(){this.fetchData()},methods:{fetchData:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadNameInfo();case 2:return this.nameInfo=e.sent,e.next=5,this.loadNameUsage();case 5:this.nameUsage=e.sent,this.loaded=!0;case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),loadNameInfo:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["a"]("info.csv");case 2:return t=e.sent,t.forEach(function(e){e.x=+e.x,e.y=+e.y,e.idmax=+e.idmax,e.count=+e.count}),e.abrupt("return",t);case 5:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),loadNameUsage:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["a"]("name_usage.csv");case 2:return t=e.sent,t.forEach(function(e){for(var t=new Array,n=0,a=Object.entries(e);n<a.length;n++){var i=Object(r["a"])(a[n],2),s=i[0],o=i[1];"name"!=s&&"sexe"!=s&&(e[s]=+o,t.push([+s,e[s]]))}e.series=t}),e.abrupt("return",t);case 5:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),selectName:function(e){this.selectedName=e.name_index,this.selectedGender=+e.sexe_index;for(var t=0,n=0;n<this.nameInfo.length;n++)this.nameInfo[n].name_index==this.selectedName&&this.nameInfo[n].sexe_index==this.selectedGender&&(t=n);this.nameInformation=this.nameInfo[t],this.neighbours=this.nameInfo.map(function(e,t){var n=e.x-this.nameInformation.x,a=e.y-this.nameInformation.y;return{dist:Math.sqrt(n*n+a*a),index:t}}.bind(this)).sort(function(e,t){return e.dist>t.dist?1:e.dist==t.dist?0:-1}).slice(1,6).map(function(e){return this.nameInfo[e.index]}.bind(this))}}},X=K,Y=(n("034f"),Object(f["a"])(X,i,s,!1,null,null,null)),Z=Y.exports;a["a"].config.productionTip=!1,new a["a"]({i18n:J,render:function(e){return e(Z)}}).$mount("#app")},"5ccb":function(e,t,n){"use strict";var a=n("4bf6"),i=n.n(a);i.a},"64a9":function(e,t,n){},"675b":function(e,t,n){"use strict";var a=n("6c1e"),i=n.n(a);i.a},"6c1e":function(e,t,n){},"741f":function(e,t,n){},"99b0":function(e,t,n){"use strict";var a=n("ec8b"),i=n.n(a);i.a},a953:function(e,t,n){},d0e4:function(e,t,n){"use strict";var a=n("a953"),i=n.n(a);i.a},d53a:function(e,t,n){"use strict";var a=n("f19d"),i=n.n(a);i.a},dd33:function(e,t,n){"use strict";var a=n("741f"),i=n.n(a);i.a},ec8b:function(e,t,n){},f19d:function(e,t,n){}});
//# sourceMappingURL=app.82a67f19.js.map