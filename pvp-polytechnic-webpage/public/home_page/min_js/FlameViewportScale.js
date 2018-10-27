function FlameViewportScale(){this.delay=600;this.orientation;this.screenWidth;this.timeout;this.viewportScale;this.getScale=function(){this.viewportScale=undefined;var viewportWidth=document.documentElement.clientWidth;if(screen.width>viewportWidth){console.log('Aborted viewport scale measurement. Screen width > viewport width');return}
this.updateOrientation();this.screenWidth=screen.width;if(this.orientation==='portrait'){if(screen.width>screen.height)this.screenWidth=screen.height}
else{if(screen.width<screen.height)this.screenWidth=screen.height}
this.viewportScale=this.screenWidth/window.innerWidth;return this.viewportScale};this.updateOrientation=function(){this.orientation=window.orientation;if(this.orientation===undefined){if(document.documentElement.clientWidth>document.documentElement.clientHeight)this.orientation='landscape';else this.orientation='portrait'}
else if(this.orientation===0||this.orientation===180)this.orientation='portrait';else this.orientation='landscape'};this.update=function(callback){if(this.timeout!==undefined){clearTimeout(this.timeout);this.timeout=undefined}
if(this.delay>0){var viewScale=this;this.timeout=setTimeout(function(){viewScale.getScale();if(callback!==undefined)callback()},this.delay)}
else{this.getScale();if(callback!==undefined)callback()}};return!0}
