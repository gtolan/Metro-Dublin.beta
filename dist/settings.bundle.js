!function(t){var i={};function e(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(n,r,function(i){return t[i]}.bind(null,r));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i),e.d(i,"Game",function(){return n});class n{constructor(t=[],i=[],e={},n=[],r=0){this.exit=i,this.size=t,this.mines=e,this.minesX=this.mines.x,this.minesY=this.mines.y,this.start=n,this.facing=r,this.directions=["North","East","South","West"],this.turtleDirection=this.facing,this.faceDirection=this.directions[this.turtleDirection],this.currentPosition=this.start,this.turtle=document.getElementById("turtle"),this.tiles=document.querySelectorAll(".tile"),this.runActionList=this.runActionList.bind(this),this.action=this.action.bind(this),this.rotate=this.rotate.bind(this),this.turnTheTurleNinetyDeg=this.turnTheTurleNinetyDeg.bind(this),this.move=this.move.bind(this),this.checkForExit=this.checkForExit.bind(this),this.checkIfOutsideBounds=this.checkIfOutsideBounds.bind(this),this.checkForMineOnXAxis=this.checkForMineOnXAxis.bind(this),this.checkForMineOnYAxis=this.checkForMineOnYAxis.bind(this),this.checkForMine=this.checkForMine.bind(this),this.checkLocation=this.checkLocation.bind(this),this.moveTurtleToTile=this.moveTurtleToTile.bind(this)}runActionList(t){t.forEach(t=>{this.action(t)})}action(t){if("m"==t||"r"==t)return"m"===t?this.move():this.rotate();console.log("bad command")}rotate(){return this.turtleDirection=3==this.turtleDirection?0:++this.turtleDirection,this.faceDirection=this.directions[this.turtleDirection],this.turnTheTurleNinetyDeg()}turnTheTurleNinetyDeg(){this.turtle.style.transform="rotate("+[0,90,180,270][this.turtleDirection]+"deg)"}move(){return"North"===this.faceDirection?this.currentPosition[1]--:"East"===this.faceDirection?this.currentPosition[0]++:"South"===this.faceDirection?this.currentPosition[1]++:"West"===this.faceDirection&&this.currentPosition[0]--,this.moveTurtleToTile(this.currentPosition[0],this.currentPosition[1]),this.checkLocation()}moveTurtleToTile(t,i){let e=this.size[0];let n=0!==i?e*++i+t:t;this.tiles[n].appendChild(this.turtle)}checkForExit(){return this.currentPosition[0]===this.exit[0]&&this.currentPosition[1]===this.exit[1]}checkIfOutsideBounds(){return this.currentPosition[0]<0||this.currentPosition[0]>this.size[0]||(this.currentPosition[1]<0||this.currentPosition[1]>this.size[1])}checkForMineOnXAxis(){return this.minesX.every(t=>this.currentPosition[0]!==t)}checkForMineOnYAxis(){return this.minesY.every(t=>this.currentPosition[1]!==t)}checkForMine(){return!!this.checkForMineOnXAxis()||this.checkForMineOnYAxis()}checkLocation(){let t=[this.checkForExit,this.checkIfOutsideBounds,this.checkForMine],i=t[0]()?"Turtle has left the building":t[1]()?"Out of Bounds":t[2]()?"Still in danger":"Has hit a Mine";return console.log(i),"Still in danger"!==i&&console.log("end"),i}}}]);