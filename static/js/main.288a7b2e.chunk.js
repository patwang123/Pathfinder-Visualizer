(this.webpackJsonpreacting=this.webpackJsonpreacting||[]).push([[0],{16:function(t,e,n){},17:function(t,e,n){},18:function(t,e,n){},19:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var s=n(0),o=(n(12),n(2)),r=n.n(o),i=n(8),a=n.n(i),c=(n(16),n(17),n(1)),u=n(9),h=n(3),l=n(4),d=n(6),f=n(5),v=(n(18),n(19),function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(){return Object(h.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props,e=t.row,n=t.col,o=t.is_start,r=t.is_finish,i=t.is_wall,a=t.onMouseDown,c=t.onMouseOver,u=t.onMouseUp,h=o?"node-start":r?"node-finish":i?"node-wall":"node-basic";return Object(s.jsx)("div",{id:"node ".concat(e," ").concat(n),className:"node ".concat(h),onMouseDown:function(){return a(e,n)},onMouseOver:function(){return c(e,n)},onMouseUp:function(){return u(e,n)}})}}]),n}(r.a.Component));function j(t,e,n){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:b,o=[];e.distance=0;for(var r=t.flat();r.length>0;){r.sort((function(t,e){return s(t,n)-s(e,n)}));var i=r.shift();if(!i.is_wall){if(i.distance===1/0)return o;if(i.searched=!0,o.push(i),i===n)return o;p(i,t)}}}function p(t,e){var n=[],s=t.row,o=t.col;s>0&&n.push(e[s-1][o]),o>0&&n.push(e[s][o-1]),s<e.length-1&&n.push(e[s+1][o]),o<e[0].length-1&&n.push(e[s][o+1]);for(var r=0,i=0;i<n.length;i++){var a=n[i];a.searched||(n[r]=a,r++)}n.length=r;for(var c=0;c<n.length;c++){var u=n[c];u.distance=t.distance+1,u.previous=t}}function b(t,e){return t.distance+function(t,e){return Math.abs(t.row-e.row)+Math.abs(t.col-e.col)}(t,e)}function O(t,e,n){return j(t,e,n,m)}function m(t){return t.distance}var _=Math.floor(10.5),g={row:-1,col:-1,is_start:!1,is_finish:!1,is_wall:!1,searched:!1,distance:1/0,previous:null},w={0:j,1:O},y=function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(t){var s;return Object(h.a)(this,n),(s=e.call(this,t)).get_shortest_path=function(){for(var t=[],e=s.state.nodes[10][40].previous;null!==e.previous;)t.unshift(e),e=e.previous;return t},s.state={nodes:M(),mouse_press:!1,reset_id:0,pathfinding:!1},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=M();this.setState({nodes:t,mouse_press:!1,count:0})}},{key:"handleMouseDown",value:function(t,e){this.setState({nodes:x(this.state.nodes,t,e),mouse_press:!0})}},{key:"handleMouseUp",value:function(t,e){this.setState({mouse_press:!1})}},{key:"handleMouseOver",value:function(t,e){this.state.mouse_press&&this.setState({nodes:x(this.state.nodes,t,e)})}},{key:"reset",value:function(){var t=this.state,e=t.reset_id;t.pathfinding||this.setState({nodes:M(),reset_id:e+1})}},{key:"render",value:function(){var t=this,e=this.state,n=e.nodes,o=e.reset_id;return Object(s.jsxs)("div",{children:[Object(s.jsx)("button",{onClick:function(){return t.pathfind()},children:"Start it up!"}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:function(){return t.reset()},children:"Reset the board"}),Object(s.jsx)("br",{}),"Algorithm:\xa0\xa0",Object(s.jsx)("select",{name:"algorithm",id:"algorithm",children:Object.entries(w).map((function(t){var e=Object(u.a)(t,2),n=e[0],o=e[1];return console.log(o),Object(s.jsx)("option",{value:n,children:o.name})}))}),Object(s.jsx)("div",{className:"grid",children:n.map((function(e,n){return Object(s.jsx)("div",{children:e.map((function(e,n){var r=e.row,i=e.col,a=e.is_start,c=e.is_finish,u=e.is_wall,h=e.searched,l=e.distance;return Object(s.jsx)(v,{row:r,col:i,is_start:a,is_finish:c,is_wall:u,searched:h,distance:l,onMouseDown:function(e,n){return t.handleMouseDown(e,n)},onMouseOver:function(e,n){return t.handleMouseOver(e,n)},onMouseUp:function(e,n){return t.handleMouseUp(e,n)}},n+"hello"+o)}))},n)}))})]})}},{key:"pathfind",value:function(){var t={0:j,1:O};this.setState({pathfinding:!0});var e=this.state.nodes,n=e[_][10],s=e[10][40],o=t[document.getElementById("algorithm").value];console.log(o);var r=o(e,n,s),i=this.get_shortest_path();this.animate_algorithm(r,i)}},{key:"animate_algorithm",value:function(t,e){var n=this;t.shift();for(var s=function(s){if(s===t.length-1)return setTimeout((function(){n.animate_shortest_path(e)}),8*s),{v:void 0};var o=t[s];setTimeout((function(){document.getElementById("node ".concat(o.row," ").concat(o.col)).className="node node-searched"}),8*s)},o=0;o<t.length;o++){var r=s(o);if("object"===typeof r)return r.v}}},{key:"animate_shortest_path",value:function(t){for(var e=this,n=function(n){if(n===t.length)return setTimeout((function(){return e.setState({pathfinding:!1})}),20*n),{v:void 0};var s=t[n];setTimeout((function(){return document.getElementById("node ".concat(s.row," ").concat(s.col)).className="node node-shortest-path"}),20*n)},s=0;s<=t.length;s++){var o=n(s);if("object"===typeof o)return o.v}}}]),n}(r.a.Component),M=function(){for(var t=[],e=0;e<21;e++){for(var n=[],s=0;s<50;s++){var o=Object(c.a)(Object(c.a)({},g),{},{row:e,col:s});n.push(o)}t.push(n)}return t[_].splice(10,1,Object(c.a)(Object(c.a)({},g),{},{row:_,col:10,is_start:!0})),t[10].splice(40,1,Object(c.a)(Object(c.a)({},g),{},{row:10,col:40,is_finish:!0})),t},x=function(t,e,n){var s=t.slice(),o=s[e][n];return s[e][n]=Object(c.a)(Object(c.a)({},o),{},{searched:!1,is_wall:!o.is_wall}),s};var k=function(){return Object(s.jsx)("div",{children:Object(s.jsx)(y,{})})};a.a.render(Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Pathfinding Visualizer!"})," ",Object(s.jsx)("h2",{children:"by Patrick Wang, UC Berkeley"}),Object(s.jsx)(k,{})]}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.288a7b2e.chunk.js.map