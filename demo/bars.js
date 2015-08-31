!function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var p=n[i]={exports:{}};t[i][0].call(p.exports,function(e){var n=t[i][1][e];return o(n?n:e)},p,p.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t){t.exports=e("./lib")},{"./lib":4}],2:[function(e,t){var n=e("generate-js"),r=e("./fragment"),o=e("./parser"),a=e("./nodes"),i=n.generate(function(){var e=this;e.defineProperties({blocks:{"if":a["IF-NODE"],unless:a["UNLESS-NODE"],each:a["EACH-NODE"],"with":a["WITH-NODE"]}})});i.definePrototype({compile:function(e){var t=this,n=o(e);return console.log(n),r.create(t,n)},registerBlock:function(e,t){var n=this;n.blocks[e]=t}}),t.exports=window.Bars=i},{"./fragment":3,"./nodes":10,"./parser":16,"generate-js":17}],3:[function(e,t){var n=e("generate-js"),r=window.Nodes=e("./nodes"),o=n.generate(function(e,t){var n=this;n.defineProperties({bars:e,struct:t})});o.definePrototype({render:function(e){var t=this,n=t.build();return e&&n.update(e),n},build:function(e){var t,n,a=this;if(e=e||a.struct,"BLOCK-NODE"===e.type)n=a.bars.blocks[e.name].create({blockString:e.blockString,nodesFrag:o.create(a.bars,e.nodesFrag),alternateFrag:o.create(a.bars,e.alternateFrag)});else if(n=r[e.type].create({contextMap:e.contextMap,staticMap:e.staticMap,name:e.name}),e.nodes)for(t=0;t<e.nodes.length;t++)n.appendChild(a.build(e.nodes[t]));if("TAG-NODE"===e.type&&e.attrs)for(t=0;t<e.attrs.length;t++)n.addAttr(a.build(e.attrs[t]));return n}}),t.exports=o},{"./nodes":10,"generate-js":17}],4:[function(e){e("./bars")},{"./bars":2}],5:[function(e,t){var n=e("./node"),r=n.generate(function(e){var t=this;t.supercreate(e),t.defineProperties({$el:document.createElement("X-BARS")})});r.definePrototype({isDOM:!0,type:"ATTR-NODE",update:function(e){var t,n=this;for(t=0;t<n.nodes.length;t++)n.nodes[t].update(e);n._elementAppendTo(n.$parent)},_elementAppendTo:function(e){var t=this;e instanceof Element&&(t.$parent=e,t.$parent.setAttribute(t.name,t.$el.innerHTML))},_elementRemove:function(){var e=this;e.$parent instanceof Element&&e.$parent.removeAttribute(e.name)}}),t.exports=r},{"./node":11}],6:[function(e,t){var n=e("./node"),r=n.generate(function(e){var t=this;t.supercreate(e),t.defineProperties({alternate:t.alternateFrag.render()}),t.con=!0,t.appendChild(t.nodesFrag.render())});r.definePrototype({type:"BLOCK-NODE",update:function(e){var t,n=this;if(n.con=n.condition(e),n.con)for(t=0;t<n.nodes.length;t++)n.nodes[t].update(e);else n.alternate.update(e);n._elementAppendTo(n.$parent)},condition:function(e){var t=this;return e(t.blockString)},_elementAppendTo:function(e){var t,n=this;if(n.con){for(t=0;t<n.nodes.length;t++)n.nodes[t]._elementAppendTo(e);n.alternate._elementRemove(),n.$parent=e}else{for(t=0;t<n.nodes.length;t++)n.nodes[t]._elementRemove();n.alternate._elementAppendTo(e),n.$parent=e}},_elementRemove:function(){var e,t=this;for(e=0;e<t.nodes.length;e++)t.nodes[e]._elementRemove();t.alternate._elementRemove(),t.$parent=null}}),t.exports=r},{"./node":11}],7:[function(e,t){var n=e("./block"),r=n.generate(function(e){var t=this;t.supercreate(e)});r.definePrototype({name:"each",update:function(e){var t,n=this,r=e(n.blockString);if(e=e.getContext(n.blockString),"object"==typeof r){var o=Object.keys(r);if(o.length){for(n.con=!0,t=0;t<o.length;t++)n.nodes[t]?n.nodes[t].update(e.getContext(o[t])):n.appendChild(n.nodesFrag.render(e.getContext(o[t])));for(t=r.length;t<n.nodes.length;t++)n.nodes[t].remove()}else n.alternate.update(e),n.con=!1}else n.alternate.update(e),n.con=!1;n._elementAppendTo(n.$parent)}}),t.exports=r},{"./block":6}],8:[function(e,t){function n(e,t){var n=e.split("/"),r=t.split("/");if("/"===t[0])return r.shift(),r;for(e&&"/"!==e[0]||n.shift();".."==r[0];)r.shift(),n.pop();return n.concat(r)}var r=e("./node"),o=r.generate(function(e){var t=this;t.supercreate(e),t.data={}});o.definePrototype({type:"FRAG-NODE",update:function(e){var t,n=this;"function"==typeof e?t=e:(n.data=e,t=n.getContext(""));for(var r=0;r<n.nodes.length;r++)n.nodes[r].update(t)},_elementAppendTo:function(e){for(var t=this,n=0;n<t.nodes.length;n++)t.nodes[n]._elementAppendTo(e),t.$parent=e},_elementRemove:function(){for(var e=this,t=0;t<e.nodes.length;t++)e.nodes[t]._elementRemove();e.$parent=null},getValue:function(e){for(var t=this,n=t.data,r=0;r<e.length;r++)n="@key"===e[r]||"@index"===e[r]?e[r-1]:n[e[r]];return n},getContext:function(e){function t(t){return r.getValue(n(e,t))}var r=this;return t.getContext=function(t){return r.getContext(n(e,t).join("/"))},t}}),t.exports=o},{"./node":11}],9:[function(e,t){var n=e("./block"),r=n.generate(function(e){var t=this;t.supercreate(e)});r.definePrototype({name:"if"}),t.exports=r},{"./block":6}],10:[function(e,t,n){n["TAG-NODE"]=e("./tag"),n["ATTR-NODE"]=e("./attr"),n["TEXT-NODE"]=e("./text"),n["FRAG-NODE"]=e("./frag"),n["IF-NODE"]=e("./if"),n["UNLESS-NODE"]=e("./unless"),n["EACH-NODE"]=e("./each"),n["WITH-NODE"]=e("./with")},{"./attr":5,"./each":7,"./frag":8,"./if":9,"./tag":12,"./text":13,"./unless":14,"./with":15}],11:[function(e,t){var n=e("generate-js"),r=n.generate(function(e){var t=this;t.defineProperties({nodes:[]}),t.defineProperties(e)});r.definePrototype({type:"NODE",update:function(e){var t=this;for(var n in t.contextMap)t.$el[n]=e(t.contextMap[n])},getParentTag:function(){for(var e=this,t=e.parent||null;t&&"TAG-NODE"!==t.type;)t=t.parent;return t},prevDom:function(){var e=this;if(e.parent){var t=e.parent.nodes.indexOf(e),n=e.parent.nodes[t-1]||null;if(!n)return e.parent.isDOM?void 0:e.parent.prevDom();var r=n.lastDom();return r?r:n.prevDom()}},lastDom:function(){var e=this;return e.isDOM||e.isDom()?e.$el:e.nodes[e.nodes.length-1].prevDom()},isDom:function(){var e=this;return"TEXT-NODE"===e.type||"TAG-NODE"===e.type},appendChild:function(e){var t=this;t.nodes.push(e),e._elementAppendTo(t.$el),e.parent=t,e.parentTag=t.getParentTag()},appendTo:function(e){var t=this;e instanceof Element&&t._elementAppendTo(e),r.isCreation(e)&&e.appendChild(t)},remove:function(){var e=this,t=e.parent.nodes.indexOf(e);t>=0&&e.parent.nodes.splice(t,1),e._elementRemove()},_elementAppendTo:function(e){var t=this;if(e instanceof Element&&(t.$el instanceof Element||t.$el instanceof Text)){var n=t.prevDom();n?e.insertBefore(t.$el,n.nextSibling):e.appendChild(t.$el),t.$parent=e}},_elementRemove:function(){var e=this;(e.$el instanceof Element||e.$el instanceof Text)&&e.$el.parentNode instanceof Element&&(e.$el.parentNode.removeChild(e.$el),e.$parent=null)},toJSON:function(){var e=this;return{type:e.type,name:e.name,contextMap:e.contextMap,staticMap:e.staticMap,alternate:e.alternate,nodes:e.nodes.length?e.nodes:void 0}}}),t.exports=r},{"generate-js":17}],12:[function(e,t){var n=e("./node"),r=n.generate(function(e){var t=this;t.supercreate(e),t.defineProperties({$el:document.createElement(e.name),attrs:[]})});r.definePrototype({isDOM:!0,type:"TAG-NODE",update:function(e){var t,n=this;for(t=0;t<n.attrs.length;t++)n.attrs[t].update(e);for(t=0;t<n.nodes.length;t++)n.nodes[t].update(e)},addAttr:function(e){var t=this;t.attrs.push(e),e._elementAppendTo(t.$el),e.parent=t,e.parentTag=t.getParentTag()}}),t.exports=r},{"./node":11}],13:[function(e,t){var n=e("./node"),r=n.generate(function(e){var t=this;t.supercreate(e),t.defineProperties({$el:document.createTextNode(e.staticMap&&e.staticMap.textContent)})});r.definePrototype({type:"TEXT-NODE"}),t.exports=r},{"./node":11}],14:[function(e,t){var n=e("./block"),r=n.generate(function(e){var t=this;t.supercreate(e)});r.definePrototype({name:"unless",condition:function(e){var t=this;return!e(t.blockString)}}),t.exports=r},{"./block":6}],15:[function(e,t){var n=e("./block"),r=n.generate(function(e){var t=this;t.supercreate(e)});r.definePrototype({name:"with",update:function(e){var t=this,n=e(t.blockString);"object"==typeof n?(t.con=!0,e=e.getContext(t.blockString),t.nodes[0].update(e)):(t.con=!1,t.alternate.update(e)),t._elementAppendTo(t.$parent)}}),t.exports=r},{"./block":6}],16:[function(e,t){function n(e,t,n,r,o,a){throw console.log(JSON.stringify(o[n-1]),JSON.stringify(o[n]),{mode:e,tree:t,index:n,length:r,buffer:o,close:close,indent:a}),new SyntaxError("Unexpected token: "+JSON.stringify(o[n]))}function r(e,t,n,r,o,a,i){var s=o[n];return">"===s?(console.log(a+"parseTagEnd"),i.closed=!0,n):"/"===s&&">"===o[n+1]?(console.log(a+"parseTagEnd"),n++,i.selfClosed=!0,n):null}function o(e,t,n,r,o,a){for(var i,c={type:"ATTR-NODE",name:"",nodes:[]};r>n&&(i=o[n],x.test(i));n++)c.name+=i;if(c.name){if(console.log(a+"parseAttr"),t.push(c),"="===i)if(n++,i=o[n],"'"===i||'"'===i){var f={type:"STRING-NODE",name:i};if(n++,n=s("VALUE-MODE",c.nodes,n,r,o,a,f),!f.closed)throw new SyntaxError("Missing closing tag: expected '"+f+"'.")}else{for(var p={type:"TEXT-NODE",staticMap:{textContent:""}};r>n&&(i=o[n],x.test(i));n++)p.staticMap.textContent+=i;if(!p.staticMap.textContent)throw new SyntaxError("Unexpected end of input.");c.nodes.push(p),n--}else n--;return n}return null}function a(e,t,n,r,o,a){for(var i,s=0;r>n&&(i=o[n],y.test(i));n++)s++;return s?(console.log(a+"parseWhiteSpace"),n--,n):null}function i(e,t,n,r,o,a,i){var s={type:"STRING-NODE",name:o[n]};if(s.type===i.type)return s.name===i.name?(i.closed=!0,n):null;throw new SyntaxError("Mismatched closing tag: expected '"+i.name+"' but found '"+s.name+"'.")}function s(e,t,n,r,o,a,i){console.log(a+"parse - ",e);var s,c,f,p,l,u,d,g=a,m=b[e],h=m.length;a+="  ";e:for(;r>n;n++)for(s=o[n],d=0;h>d;d++)if(c=b[e][d],u=m[++d],s===c||!c){if(f=n,p=i&&i.elsed,l=u(e,t,n,r,o,a,i),"number"==typeof l&&(n=l),i&&(i.closed||i.elsed&&!p))break e;if("number"==typeof l)break}return console.log(g+"<<<"),n}function c(e,t,n,r,o,a){console.log(a+"parseTag");var i,c={type:"TAG-NODE",name:"",nodes:[],attrs:[]};for(n++;r>n&&(i=o[n],x.test(i));n++)c.name+=i;if(n=s("ATTR-MODE",c.attrs,n,r,o,a,c),!c.closed&&!c.selfClosed)throw new SyntaxError("Unexpected end of input.");if(delete c.closed,c.selfClosed)return delete c.selfClosed,n;if("script"===c.name||"style"===c.name){for(var p={type:"TEXT-NODE",staticMap:{textContent:""}};r>n;n++){if(i=o[n],"<"===i&&(n=f(e,t,n,r,o,a,c,!0),c.closed)){delete c.closed;break}p.staticMap.textContent+=i}p.staticMap.textContent&&c.nodes.push(p)}else-1===v.indexOf(c.name)&&(n++,n=s(e,c.nodes,n,r,o,a,c));if(!c.closed)throw new SyntaxError("Missing closing tag: expected '"+c.name+"'.");return delete c.closed,t.push(c),n}function f(e,t,n,r,o,a,i,s){if("/"!==o[n+1])return null;console.log(a+"parseTagClose");var c,f={type:"TAG-NODE",name:""},p=!1,l=!1;for(n+=2;r>n;n++)if(c=o[n],!p&&x.test(c)?f.name+=c:p=!0,">"===c){l=!0;break}if(!l)throw new SyntaxError("Unexpected end of input.");if(!i)throw new SyntaxError("Unexpected closing tag: '"+f.name+"'.");if(f.type!==i.type||f.name!==i.name){if(s)return null;throw new SyntaxError("Mismatched closing tag: expected '"+i.name+"' but found '"+f.name+"'.")}return i.closed=!0,n}function p(e,t,n,r,o,a){for(var i,s={type:"TEXT-NODE",staticMap:{textContent:""}};r>n;n++){if(i=o[n],"<"===i||"{"===i){n--;break}s.staticMap.textContent+=i}return s.staticMap.textContent?(console.log(a+"parseText"),t.push(s),n):null}function l(e,t,n,r,o,a,i){for(var s,c={type:"TEXT-NODE",staticMap:{textContent:""}};r>n;n++){if(s=o[n],"{"===s||i&&s===i.name&&"\\"!==o[n-1]){n--;break}c.staticMap.textContent+=s}return c.staticMap.textContent?(console.log(a+"parseText"),t.push(c),n):null}function u(e,t,n,r,o,a){if(console.log(a+"parseBarsInsert"),"{"!==o[n+1])throw new SyntaxError("Unexpected end of input.");var i,s={type:"TEXT-NODE",contextMap:{textContent:""}},c=0;n+=2;e:for(;r>n;n++){if(i=o[n],"}"===i)for(c++,n++;r>n;n++){if(i=o[n],"}"!==i)throw new SyntaxError("Unexpected character: expected '}' but found '"+i+"'.");if(c++,2===c)break e}s.contextMap.textContent+=i}return t.push(s),n}function d(e,t,n,r,o,a){if("{"!==o[n+1])throw new SyntaxError("Unexpected end of input.");if("#"!==o[n+2])return null;console.log(a+"parseBarsBlock");var i,c={type:"BLOCK-NODE",name:"",blockString:"",nodesFrag:{type:"FRAG-NODE",nodes:[]},alternateFrag:{type:"FRAG-NODE",nodes:[]}},f=0;for(n+=3;r>n&&(i=o[n],x.test(i));n++)c.name+=i;e:for(;r>n;n++){if(i=o[n],"}"===i)for(f++,n++;r>n;n++){if(i=o[n],"}"!==i)throw new SyntaxError("Unexpected character: expected '}' but found '"+i+"'.");if(f++,2===f)break e}c.blockString+=i}if(c.blockString=c.blockString.trim(),n++,n=s(e,c.nodesFrag.nodes,n,r,o,a,c),c.elsed&&!c.closed&&(n++,n=s(e,c.alternateFrag.nodes,n,r,o,a,c)),!c.closed)throw new SyntaxError("Missing closing tag: expected '"+c.name+"'.");return delete c.closed,delete c.elsed,t.push(c),n}function g(e,t,n,r,o,a,i,s){if("{"!==o[n+1])throw new SyntaxError("Unexpected end of input.");if("/"!==o[n+2])return null;console.log(a+"parseBarsBlockClose");var c,f={type:"BLOCK-NODE",name:""},p=0;for(n+=3;r>n&&(c=o[n],x.test(c));n++)f.name+=c;e:for(;r>n;n++)if(c=o[n],"}"===c)for(p++,n++;r>n;n++){if(c=o[n],"}"!==c)throw new SyntaxError("Unexpected character: expected '}' but found '"+c+"'.");if(p++,2===p)break e}if(!i)throw new SyntaxError("Unexpected closing tag: '"+f.name+"'.");if(f.type!==i.type||f.name!==i.name){if(s)return null;throw new SyntaxError("Mismatched closing tag: expected '"+i.name+"' but found '"+f.name+"'.")}return i.closed=!0,n}function m(e,t,n,r,o,a,i){if("{"!==o[n+1])throw new SyntaxError("Unexpected end of input.");var s,c="",f=0;n+=2;e:for(;r>n;n++){if(s=o[n],"}"===s)for(f++,n++;r>n;n++){if(s=o[n],"}"!==s)throw new SyntaxError("Unexpected character: expected '}' but found '"+s+"'.");if(f++,2===f)break e}c+=s}if(i&&"BLOCK-NODE"===i.type&&"else"===c){if(i.elsed)throw new SyntaxError("Unexpected else token.");return i.elsed=!0,console.log(a+"parseBarsBlockElse"),n}if(i)return null;throw new SyntaxError("Unexpected else tag.")}function h(e){var t={type:"FRAG-NODE",nodes:[]};return console.log("compile"),s("DOM-MODE",t.nodes,0,e.length,e,"  ",null),console.log("compiled"),t}var v=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],b={"DOM-MODE":["<",f,"<",c,"{",m,"{",g,"{",d,"{",u,"",p],"ATTR-MODE":["/",r,">",r,"{",m,"{",g,"{",d,"",a,"",o,"",n],"VALUE-MODE":['"',i,"'",i,"{",m,"{",g,"{",d,"{",u,"",l]},x=/^[_A-Za-z0-9-]$/,y=/^\s$/;t.exports=h},{}],17:[function(e,t,n){!function(){function e(e,t){if(!e)throw new Error(t)}function r(e,t){if(typeof e!==t)throw new TypeError("Expected '"+t+"' but instead found '"+typeof e+"'")}function o(e){if(void 0!==e.name)return e.name;var t=e.toString().match(/function\s*([^\s]*)\s*\(/);return e.name=t&&t[1]||"",e.name}function a(e){var t,n;return e&&"object"==typeof e&&(t=Object.getOwnPropertyNames(e).sort(),n=t.length,1===n&&("get"===t[0]&&"function"==typeof e.get||"set"===t[0]&&"function"==typeof e.set)||2===n&&"get"===t[0]&&"function"==typeof e.get&&"set"===t[1]&&"function"==typeof e.set)?!0:!1}function i(e,t,n){var r,o,i,s={};for(t&&"object"==typeof t||(t={}),n&&"object"==typeof n||(n=t,t={}),o=Object.getOwnPropertyNames(n),i=o.length,r=0;i>r;r++)s[o[r]]=a(n[o[r]])?{configurable:!!t.configurable,enumerable:!!t.enumerable,get:n[o[r]].get,set:n[o[r]].set}:{configurable:!!t.configurable,enumerable:!!t.enumerable,writable:!!t.writable,value:n[o[r]]};return Object.defineProperties(e,s),e}var s={},c={},f={};i(s,{configurable:!1,enumerable:!1,writable:!1},{defineProperties:function(e,t){return i(this,e,t),this},getProto:function(){return Object.getPrototypeOf(this)},getSuper:function(){return Object.getPrototypeOf(this.generator).proto}}),i(c,{configurable:!1,enumerable:!1,writable:!1},{name:"Generation",proto:s,create:function(){var e=this,t=Object.create(e.proto);return e.__supercreate(t,arguments),t},__supercreate:function(e,t){var n=this,r=Object.getPrototypeOf(n),o=!1;e.supercreate=function(){o=!0,c.isGeneration(r)&&r.__supercreate(e,arguments)},n.__create.apply(e,t),o||e.supercreate(),delete e.supercreate},__create:function(){},generate:function(t){var n=this;e(c.isGeneration(n)||n===c,"Cannot call method 'generate' on non-Generations."),r(t,"function");var a=Object.create(n),s=Object.create(n.proto);return i(s,{configurable:!1,enumerable:!1,writable:!1},{generator:a}),i(a,{configurable:!1,enumerable:!1,writable:!1},{name:o(t),proto:s,__create:t}),a},isGeneration:function(e){var t=this;return t.isPrototypeOf(e)},isCreation:function(e){var t=this;return t.proto.isPrototypeOf(e)},definePrototype:function(e,t){return i(this.proto,e,t),this},toString:function(){return"["+(this.name||"generation")+" Generator]"}}),i(f,{configurable:!1,enumerable:!1,writable:!1},{generate:function(e){return c.generate(e)},isGenerator:function(e){return c.isGeneration(e)},toGenerator:function(e){r(e,"function");var t=Object.create(c),n=Object.create(e.prototype);return i(n,{configurable:!1,enumerable:!1,writable:!1},{generator:t}),i(n,{configurable:!1,enumerable:!1,writable:!1},s),i(t,{configurable:!1,enumerable:!1,writable:!1},{name:o(e),proto:n,__create:e}),t}}),Object.freeze(s),Object.freeze(c),Object.freeze(f),"function"==typeof define&&define.amd?define(function(){return f}):"object"==typeof t&&"object"==typeof n?t.exports=f:window.Generator=f}()},{}]},{},[1]);
