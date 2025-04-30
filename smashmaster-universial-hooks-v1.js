(function(){
window.onerror=alert;
document.onerror=alert;
const presets = {
"brr":{
timeoutMult: 0.5,
intervalMult: 0.5,
randomVal: 0
},
"gtgfast":{
timeoutMult: 1/4,
intervalMult: 1/4,
perfMult: 4,
dateMult:4
},
"gtgfaster":{
timeoutMult: 1/10,
intervalMult: 1/10,
perfMult: 10,
dateMult:10
},
"slowmo":{
timeoutMult: 3,
intervalMult: 3
},
"5fps":{
framerate:5
},
"10fps":{
framerate:10
},
derandom:{
randomVal: 0
}
};

let presetName = prompt("Pick a preset");
var chosenPreset = presets[presetName];

if(window.appliedMods){
   alert("Mods are already active");
   return;
}else if(!chosenPreset){
alert("No preset found, presets available " + Object.keys(presets).join(",")); return;
}


var origRandom = window.Math.random;
var origRequestAnimationFrame = window.requestAnimationFrame;
alert("Application Successful");
var appliedMods = true;
window.appliedMods = true;

window.Math.random = function(){
if("randomVal" in chosenPreset){
return chosenPreset.randomVal;
}
return origRandom();
};


const origSetTimeout = window.setTimeout;
const origSetInterval = window.setInterval;

window.requestAnimationFrame = function(callback){
if(chosenPreset.framerate){
origSetTimeout(callback,chosenPreset.framerate);
}else{
origRequestAnimationFrame(callback);
}
};


window.setTimeout = function(func, ms){
if(chosenPreset.timeoutMult){
ms = Math.max(1,Math.floor(ms*chosenPreset.timeoutMult));
}
return origSetTimeout(func,ms);
};

window.setInterval = function(func, ms){
if(chosenPreset.intervalMult){
ms = Math.max(1,Math.floor(ms*chosenPreset.intervalMult));
}
return originalSetInterval(func,ms);
};
/*Patch Date Constructor*/
var origDate = window.Date;
var startTime = origDate.now();
window.Date = function(...args){
let realDate = new origDate(...args);
let offset = realDate.getTime() - startTime;
if(chosenPreset.dateMult){
offset = Math.floor(offset * chosenPreset.dateMult);
return (new origDate(startTime + offset));
}
return realDate;
};
window.Date.now = function(){return (new Date()).getTime();};
/*Patch Performance now*/
var origPerformanceNow = window.performance.now.bind(window.performance);
var startPerfTime = origPerformanceNow();
console.log("Start Perf Time",startPerfTime);
window.performance.now = function(){
if(chosenPreset.perfMult){
let timeSinceStart = origPerformanceNow() - startPerfTime;
return (startPerfTime + timeSinceStart*chosenPreset.perfMult);
}
return origPerformanceNow();
};

})();
