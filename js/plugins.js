// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



// apliable scope functions...
// functions to crossbrowser animation and transition end
var set_transitionEnd_event = function () {
    var animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'MozAnimation'    : 'animationend',
        'OAnimation'      : 'oAnimationEnd',
        'msAnimation'     : 'MSAnimationEnd',
        'animation'       : 'animationend'
    };

    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd otransitionend',
        'msTransition'     : 'MSTransitionEnd',
        'transition'       : 'transitionend'
    };

    var anim = animEndEventNames[ Modernizr.prefixed('animation') ];
    var trans = transEndEventNames[ Modernizr.prefixed('transition') ];

    var obj = {
        animate    : anim,
        transition : trans
    };

    return obj;
};

var transEndEvent = set_transitionEnd_event().transition;
var animEndEvent = set_transitionEnd_event().animate;
var animating = false;


// xhr gist
var ajax = function (url, cb, method, post, contenttype) {
    var requestTimeout,xhr;
    try { 
        xhr = new XMLHttpRequest(); 
    } catch (e) {
        try { 
            xhr = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) {
            if (console) {
                console.log("tinyxhr: XMLHttpRequest not supported");
                return null;
            }
        }
    }

    requestTimeout = setTimeout ( function() { 
        xhr.abort(); 
        cb ( new Error( "tinyxhr: aborted by a timeout" ), "", xhr) ; 
    }, 10000);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        clearTimeout(requestTimeout);
        cb (xhr.status != 200 ? new Error( "tinyxhr: server respnse status is " + xhr.status) : false, xhr.responseText, xhr);
    }

    xhr.open( method ? method.toUpperCase() : "GET", url, true);

    if (!post) {
        xhr.send();
    } else {
        xhr.setRequestHeader('Content-type', contenttype?contenttype:'application/x-www-form-urlencoded');
        xhr.send(post)
    }
};

// window scroll gist

var window_scroll = function () {
    //funcion sacada de http://www.dyn-web.com/javascript/scroll-distance/
    var doc = document, w = window;
    var x, y, docEl;
    if ( typeof w.pageYOffset === 'number' ) {
        x = w.pageXOffset;
        y = w.pageYOffset;
    } else {
        docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
        x = docEl.scrollLeft;
        y = docEl.scrollTop;
    }
    return {x:x, y:y};
};

/**
 * Scroll to	
 */
 
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));


// Berlinerds' Sticky Element Object

/* ==== sticky elements object ==== */
/*
var StickyElement = function (_element_name, _offset, _drupal, _max_height_parent, _top_vertical_move) {

	var self            = this;
	this.drupal         = (_drupal !== undefined) ? _drupal : false;
	this.doc            = document.body;
	this.element        = this.doc.querySelector(_element_name);
	this.el_parent      = (_drupal === true) ? this.doc.querySelector(_max_height_parent) : undefined;
	this.element_x      = this.element.getBoundingClientRect().top;
	this.element_y      = this.element.getBoundingClientRect().left;
	this.element_width  = this.element.getBoundingClientRect().width;
	this.element_height = this.element.getBoundingClientRect().height;
	this.offset         = (_offset !== undefined) ? _offset : 0;
	this.max_heigth     = function () {
		if (self.drupal === true) {
			return self.el_parent.clientHeight;
		} else {
			return self.element.parentNode.parentNode.clientHeight;
		}
	}();
	this.sticky 		= false;
	this.theres_gallery = function () { //gallery extension
		var gallery = document.body.querySelector('.single__gallery');
		if (gallery !== null) {
			return true;
		} else {
			return false;
		}
	}();
	
	this.isSafari = function () {
		if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
		   return true;         
		} else {
			return false;
		}
	}();

	this.window_width   = window.innerWidth;

	this.margin_top 	= function () {
		if (window.getComputedStyle) {
			var margin = window.getComputedStyle(self.element)['marginTop'];
			margin = parseInt(margin);
			return margin;
		}
	}();
	
	this.kill_your_relatives = function () {
		var that = this;
		var el = that.element;
		while (el !== that.el_parent) {
			el.style.position = 'static';
			el = el.parentNode;
			console.log(el);
		}
	}();

	this.compare = function (el_x, window_y , off, evt, el_height) {
		
		var that = this;
		//gallery extension
		var gallery_height = 0;
		if (that.theres_gallery) {
			gallery_height = document.body.querySelector('.single__gallery').clientHeight;
		}
		

		if (evt !== 'resize') { //scroll
			
			if ( el_x <= window_y + off) {
				that.element.classList.add('sticky');
				that.sticky = true;

				if (self.drupal === true) {
					self.el_parent.style.position = 'relative';
				} else {
					self.element.parentNode.style.position = 'relative';
				}
				
				that.element.style.position   = 'absolute';
				that.element.style.top		  =  window_y + off - el_x + 'px';
				that.element.style.width 	  = that.element_width + 'px';

				if(_top_vertical_move !== false) {
					var top = parseInt(that.element.style.top);
					if (top >= (that.max_heigth - el_height - that.margin_top - gallery_height) && that.sticky == true) {
						that.element.style.top = that.max_heigth - el_height - that.margin_top  - gallery_height + 'px';
					}
				}

			} else {

				that.element.classList.remove('sticky');
				that.element.style.position  = '';
				that.element.style.top 		= '';
				that.element.style.width 	= '';

				if (that.margin_top !== null) {

					that.element.style.marginTop = this.margin_top + 'px';
				}
			}

		} else if (evt === 'resize') {
			that.element_width  = that.element.clientWidth;
			el_height = that.element.clientHeight;
		}
		
		/**if ( el_x <= window_y + off) {
			
			if ((window_y + off + el_x + el_height) < 2300 && that.sticky === false ) {
				that.element.style.position   = 'fixed';
				that.element.style.top		  = off - that.margin_top + 'px';
				that.element.style.width	  = that.element_width + 'px';
			}
			
			//pinta principio
			console.log(window_y + off + el_x);
			//pinta final
			
			console.log(window_y + off + el_x + el_height);
			
			if ((window_y + off + el_x + el_height) > 2300 && that.sticky === false ) {
				console.log('chale...quillo');
				that.element.style.position   = 'absolute';
				that.element.style.top		  = 2300 + off + 'px';
				that.sticky = true;
			}
			
			if ((window_y + off + el_x + el_height) < 2300 && that.sticky === true ) {
				console.log('chale...quillo');
				that.element.style.position   = 'fixed';
				that.element.style.top		  = off - that.margin_top + 'px';
				that.sticky = false;
			}


					
		 } else {

			that.element.classList.remove('sticky');
			that.element.style.position  = '';
			that.element.style.top 		= '';
			that.element.style.width 	= '';
			if (that.margin_top !== null) {

				that.element.style.marginTop = this.margin_top + 'px';
			}
		}**//*
	}; 

	//if (!this.isSafari) {
		if (this.window_width > 700) {
			var element_height = this.element.clientHeight; //comprobar altura antes de scrollear. posibles cambios
			var win_off = window.scrollY;
			this.compare (this.element_x, window_scroll().y , this.offset, null, element_height);	
		}
		window.addEventListener('scroll', function (e) {
			var element_height = self.element.clientHeight; //comprobar altura antes de scrollear. posibles cambios
			if (self.window_width > 700) {
				self.compare (self.element_x, window_scroll().y , self.offset, e.type, element_height);
			}
		}, false);
		window.addEventListener('resize', function (e) {
			if (self.window_width > 700) {
				self.compare (self.element_x, window_scroll().y , self.offset, e.type);
			}
		}, false);
	//}
	//console.log(this);
}; //end of object

*/


/*! Hammer.JS - v1.1.3 - 2014-05-20
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b){"use strict";function c(){d.READY||(s.determineEventTypes(),r.each(d.gestures,function(a){u.register(a)}),s.onTouch(d.DOCUMENT,n,u.detect),s.onTouch(d.DOCUMENT,o,u.detect),d.READY=!0)}var d=function v(a,b){return new v.Instance(a,b||{})};d.VERSION="1.1.3",d.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},d.DOCUMENT=document,d.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&d.IS_MOBILE||d.HAS_POINTEREVENTS,d.CALCULATE_INTERVAL=25;var e={},f=d.DIRECTION_DOWN="down",g=d.DIRECTION_LEFT="left",h=d.DIRECTION_UP="up",i=d.DIRECTION_RIGHT="right",j=d.POINTER_MOUSE="mouse",k=d.POINTER_TOUCH="touch",l=d.POINTER_PEN="pen",m=d.EVENT_START="start",n=d.EVENT_MOVE="move",o=d.EVENT_END="end",p=d.EVENT_RELEASE="release",q=d.EVENT_TOUCH="touch";d.READY=!1,d.plugins=d.plugins||{},d.gestures=d.gestures||{};var r=d.utils={extend:function(a,c,d){for(var e in c)!c.hasOwnProperty(e)||a[e]!==b&&d||(a[e]=c[e]);return a},on:function(a,b,c){a.addEventListener(b,c,!1)},off:function(a,b,c){a.removeEventListener(b,c,!1)},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},inStr:function(a,b){return a.indexOf(b)>-1},inArray:function(a,b){if(a.indexOf){var c=a.indexOf(b);return-1===c?!1:c}for(var d=0,e=a.length;e>d;d++)if(a[d]===b)return d;return!1},toArray:function(a){return Array.prototype.slice.call(a,0)},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[],d=[],e=[],f=Math.min,g=Math.max;return 1===a.length?{pageX:a[0].pageX,pageY:a[0].pageY,clientX:a[0].clientX,clientY:a[0].clientY}:(r.each(a,function(a){b.push(a.pageX),c.push(a.pageY),d.push(a.clientX),e.push(a.clientY)}),{pageX:(f.apply(Math,b)+g.apply(Math,b))/2,pageY:(f.apply(Math,c)+g.apply(Math,c))/2,clientX:(f.apply(Math,d)+g.apply(Math,d))/2,clientY:(f.apply(Math,e)+g.apply(Math,e))/2})},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return 180*Math.atan2(d,c)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.clientX-b.clientX),d=Math.abs(a.clientY-b.clientY);return c>=d?a.clientX-b.clientX>0?g:i:a.clientY-b.clientY>0?h:f},getDistance:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==h||a==f},setPrefixedCss:function(a,b,c,d){var e=["","Webkit","Moz","O","ms"];b=r.toCamelCase(b);for(var f=0;f<e.length;f++){var g=b;if(e[f]&&(g=e[f]+g.slice(0,1).toUpperCase()+g.slice(1)),g in a.style){a.style[g]=(null==d||d)&&c||"";break}}},toggleBehavior:function(a,b,c){if(b&&a&&a.style){r.each(b,function(b,d){r.setPrefixedCss(a,d,b,c)});var d=c&&function(){return!1};"none"==b.userSelect&&(a.onselectstart=d),"none"==b.userDrag&&(a.ondragstart=d)}},toCamelCase:function(a){return a.replace(/[_-]([a-z])/g,function(a){return a[1].toUpperCase()})}},s=d.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(a,b,c,d){var e=b.split(" ");r.each(e,function(b){r.on(a,b,c),d&&d(b)})},off:function(a,b,c,d){var e=b.split(" ");r.each(e,function(b){r.off(a,b,c),d&&d(b)})},onTouch:function(a,b,c){var f=this,g=function(e){var g,h=e.type.toLowerCase(),i=d.HAS_POINTEREVENTS,j=r.inStr(h,"mouse");j&&f.preventMouseEvents||(j&&b==m&&0===e.button?(f.preventMouseEvents=!1,f.shouldDetect=!0):i&&b==m?f.shouldDetect=1===e.buttons||t.matchType(k,e):j||b!=m||(f.preventMouseEvents=!0,f.shouldDetect=!0),i&&b!=o&&t.updatePointer(b,e),f.shouldDetect&&(g=f.doDetect.call(f,e,b,a,c)),g==o&&(f.preventMouseEvents=!1,f.shouldDetect=!1,t.reset()),i&&b==o&&t.updatePointer(b,e))};return this.on(a,e[b],g),g},doDetect:function(a,b,c,d){var e=this.getTouchList(a,b),f=e.length,g=b,h=e.trigger,i=f;b==m?h=q:b==o&&(h=p,i=e.length-(a.changedTouches?a.changedTouches.length:1)),i>0&&this.started&&(g=n),this.started=!0;var j=this.collectEventData(c,g,e,a);return b!=o&&d.call(u,j),h&&(j.changedLength=i,j.eventType=h,d.call(u,j),j.eventType=g,delete j.changedLength),g==o&&(d.call(u,j),this.started=!1),g},determineEventTypes:function(){var b;return b=d.HAS_POINTEREVENTS?a.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],e[m]=b[0],e[n]=b[1],e[o]=b[2],e},getTouchList:function(a,b){if(d.HAS_POINTEREVENTS)return t.getTouchList();if(a.touches){if(b==n)return a.touches;var c=[],e=[].concat(r.toArray(a.touches),r.toArray(a.changedTouches)),f=[];return r.each(e,function(a){r.inArray(c,a.identifier)===!1&&f.push(a),c.push(a.identifier)}),f}return a.identifier=1,[a]},collectEventData:function(a,b,c,d){var e=k;return r.inStr(d.type,"mouse")||t.matchType(j,d)?e=j:t.matchType(l,d)&&(e=l),{center:r.getCenter(c),timeStamp:Date.now(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){var a=this.srcEvent;a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return u.stopDetect()}}}},t=d.PointerEvent={pointers:{},getTouchList:function(){var a=[];return r.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){a==o||a!=o&&1!==b.buttons?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b)},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[j]=c===(b.MSPOINTER_TYPE_MOUSE||j),d[k]=c===(b.MSPOINTER_TYPE_TOUCH||k),d[l]=c===(b.MSPOINTER_TYPE_PEN||l),d[a]},reset:function(){this.pointers={}}},u=d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:r.extend({},b),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst,c=b.options;return r.each(this.gestures,function(d){!this.stopped&&b.enabled&&c[d.name]&&d.handler.call(d,a,b)},this),this.current&&(this.current.lastEvent=a),a.eventType==o&&this.stopDetect(),a}},stopDetect:function(){this.previous=r.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(a,b,c,e,f){var g=this.current,h=!1,i=g.lastCalcEvent,j=g.lastCalcData;i&&a.timeStamp-i.timeStamp>d.CALCULATE_INTERVAL&&(b=i.center,c=a.timeStamp-i.timeStamp,e=a.center.clientX-i.center.clientX,f=a.center.clientY-i.center.clientY,h=!0),(a.eventType==q||a.eventType==p)&&(g.futureCalcEvent=a),(!g.lastCalcEvent||h)&&(j.velocity=r.getVelocity(c,e,f),j.angle=r.getAngle(b,a.center),j.direction=r.getDirection(b,a.center),g.lastCalcEvent=g.futureCalcEvent||a,g.futureCalcEvent=a),a.velocityX=j.velocity.x,a.velocityY=j.velocity.y,a.interimAngle=j.angle,a.interimDirection=j.direction},extendEventData:function(a){var b=this.current,c=b.startEvent,d=b.lastEvent||c;(a.eventType==q||a.eventType==p)&&(c.touches=[],r.each(a.touches,function(a){c.touches.push({clientX:a.clientX,clientY:a.clientY})}));var e=a.timeStamp-c.timeStamp,f=a.center.clientX-c.center.clientX,g=a.center.clientY-c.center.clientY;return this.getCalculatedData(a,d.center,e,f,g),r.extend(a,{startEvent:c,deltaTime:e,deltaX:f,deltaY:g,distance:r.getDistance(c.center,a.center),angle:r.getAngle(c.center,a.center),direction:r.getDirection(c.center,a.center),scale:r.getScale(c.touches,a.touches),rotation:r.getRotation(c.touches,a.touches)}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),r.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};d.Instance=function(a,b){var e=this;c(),this.element=a,this.enabled=!0,r.each(b,function(a,c){delete b[c],b[r.toCamelCase(c)]=a}),this.options=r.extend(r.extend({},d.defaults),b||{}),this.options.behavior&&r.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=s.onTouch(a,m,function(a){e.enabled&&a.eventType==m?u.startDetect(e,a):a.eventType==q&&u.detect(a)}),this.eventHandlers=[]},d.Instance.prototype={on:function(a,b){var c=this;return s.on(c.element,a,b,function(a){c.eventHandlers.push({gesture:a,handler:b})}),c},off:function(a,b){var c=this;return s.off(c.element,a,b,function(a){var d=r.inArray({gesture:a,handler:b});d!==!1&&c.eventHandlers.splice(d,1)}),c},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return r.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(r.toggleBehavior(this.element,this.options.behavior,!1),a=-1;b=this.eventHandlers[++a];)r.off(this.element,b.gesture,b.handler);return this.eventHandlers=[],s.off(this.element,e[m],this.eventStartHandler),null}},function(a){function b(b,d){var e=u.current;if(!(d.options.dragMaxTouches>0&&b.touches.length>d.options.dragMaxTouches))switch(b.eventType){case m:c=!1;break;case n:if(b.distance<d.options.dragMinDistance&&e.name!=a)return;var j=e.startEvent.center;if(e.name!=a&&(e.name=a,d.options.dragDistanceCorrection&&b.distance>0)){var k=Math.abs(d.options.dragMinDistance/b.distance);j.pageX+=b.deltaX*k,j.pageY+=b.deltaY*k,j.clientX+=b.deltaX*k,j.clientY+=b.deltaY*k,b=u.extendEventData(b)}(e.lastEvent.dragLockToAxis||d.options.dragLockToAxis&&d.options.dragLockMinDistance<=b.distance)&&(b.dragLockToAxis=!0);var l=e.lastEvent.direction;b.dragLockToAxis&&l!==b.direction&&(b.direction=r.isVertical(l)?b.deltaY<0?h:f:b.deltaX<0?g:i),c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),d.trigger(a+b.direction,b);var q=r.isVertical(b.direction);(d.options.dragBlockVertical&&q||d.options.dragBlockHorizontal&&!q)&&b.preventDefault();break;case p:c&&b.changedLength<=d.options.dragMaxTouches&&(d.trigger(a+"end",b),c=!1);break;case o:c=!1}}var c=!1;d.gestures.Drag={name:a,index:50,handler:b,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),d.gestures.Gesture={name:"gesture",index:1337,handler:function(a,b){b.trigger(this.name,a)}},function(a){function b(b,d){var e=d.options,f=u.current;switch(b.eventType){case m:clearTimeout(c),f.name=a,c=setTimeout(function(){f&&f.name==a&&d.trigger(a,b)},e.holdTimeout);break;case n:b.distance>e.holdThreshold&&clearTimeout(c);break;case p:clearTimeout(c)}}var c;d.gestures.Hold={name:a,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:b}}("hold"),d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==p&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(a,b){if(a.eventType==p){var c=a.touches.length,d=b.options;if(c<d.swipeMinTouches||c>d.swipeMaxTouches)return;(a.velocityX>d.swipeVelocityX||a.velocityY>d.swipeVelocityY)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},function(a){function b(b,d){var e,f,g=d.options,h=u.current,i=u.previous;switch(b.eventType){case m:c=!1;break;case n:c=c||b.distance>g.tapMaxDistance;break;case o:!r.inStr(b.srcEvent.type,"cancel")&&b.deltaTime<g.tapMaxTime&&!c&&(e=i&&i.lastEvent&&b.timeStamp-i.lastEvent.timeStamp,f=!1,i&&i.name==a&&e&&e<g.doubleTapInterval&&b.distance<g.doubleTapDistance&&(d.trigger("doubletap",b),f=!0),(!f||g.tapAlways)&&(h.name=a,d.trigger(h.name,b)))}}var c=!1;d.gestures.Tap={name:a,index:100,handler:b,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),d.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(a,b){return b.options.preventMouse&&a.pointerType==j?void a.stopDetect():(b.options.preventDefault&&a.preventDefault(),void(a.eventType==q&&b.trigger("touch",a)))}},function(a){function b(b,d){switch(b.eventType){case m:c=!1;break;case n:if(b.touches.length<2)return;var e=Math.abs(1-b.scale),f=Math.abs(b.rotation);if(e<d.options.transformMinScale&&f<d.options.transformMinRotation)return;u.current.name=a,c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),f>d.options.transformMinRotation&&d.trigger("rotate",b),e>d.options.transformMinScale&&(d.trigger("pinch",b),d.trigger("pinch"+(b.scale<1?"in":"out"),b));break;case p:c&&b.changedLength<2&&(d.trigger(a+"end",b),c=!1)}}var c=!1;d.gestures.Transform={name:a,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:b}}("transform"),"function"==typeof define&&define.amd?define(function(){return d}):"undefined"!=typeof module&&module.exports?module.exports=d:a.Hammer=d}(window);



/*
*   Berlinerds' Modal box for gallery
*   Developed by Carlos Aparicio (FE Dev.) & Diego Ruiz del Árbol (BE Dev.) 
*   Version: 1.0
*   Release date: Juli-2014
*	Plugins to work with: Modernizr for css-animations control and Hammer.js for mobile events
*/

/*var options = {
    max_width : max_width,
    max_height : max_height,
    animation : true,
    breakpoints: []
};*/

var Berlinerds_Gallery_Modal = function (options) { //constructor
    
    var self = this;

    /*
    *   responsive variables declaration
    */
    
    this.window_width = window.innerWidth;
    this.is_desktop   = true;
    this.is_pad       = false;
    this.is_mobile    = false;
    
    this.responsive_dim = [1200, 830, 500, 300];

    this.check_the_device = function (win_width) {
        if (win_width > self.responsive_dim[0]) {
            return 0;
        } else  if (win_width <= self.responsive_dim[0] && win_width > self.responsive_dim[1]) {
            return 1;
        } else  if (win_width <= self.responsive_dim[1] && win_width > self.responsive_dim[2]) {
            return 2;
        } else  if (win_width <= self.responsive_dim[2] && win_width > self.responsive_dim[3]) {
            return 3;
        } else {
            return 4;
        }
    };

    /*
    *   global variable
    */  

    this.gallery_init   = false;
    this.gallery_open   = false;
    this.image_open     = false;
    animating           = false;
    index               = 0;

    /*
    *   DOM variables
    */  

    this.doc             = document.body;
    this.gallery_content = this.doc.querySelectorAll ('.js-modal-gallery');
    this.gallery_length  = this.gallery_content.length;

    this.gallery_content_links = function () {
        var arr = [], i;
        for (i = 0; i < self.gallery_length; i++) {
            arr[i] = self.gallery_content[i].getAttribute('data-modal');
        }
        return arr;
    }();

    /*
    *   Info of images
    */

    this.img_width  = /*(options.max_width == undefined) ? 720 : options.max_width;*/ 720;
    this.img_height = /*(options.max_height == undefined) ? 640 : options.max_height;*/ 640;
    this.img_folder_root = 'images/';

    /*
    *   Private methods
    */  

    //to check which image is next and update the index
    this.check_the_index = function (elem) {

        var link  = elem.getAttribute('data-modal');
        var index = 0;

        while (index < this.gallery_length) {
            if (link === this.gallery_content_links[index]) {
                return index;
            } else {
                index++
            }
        }
    };

    //get coordinates and center of the actual window size. Updatable by window.onresize()
    this.get_center_of_window = function () {
        var that = this,
            width  = window.innerWidth,
            height = window.innerHeight;
        
        width  = width / 2 - (that.img_width / 2);
        height = height / 2 - (that.img_heigth / 2);

        var obj = {
            width : width, 
            height: height
        };
        return obj; 
    };

    //recalculate center after change image, for images with different sizes
    this.update_center_of_window = function (axis, value) {
        var width  = window.innerWidth;
        var height = window.innerHeight;

        if (axis === 'horizontal') {
            width  = width / 2 - (value / 2);
            return width;
        } else if (axis === 'vertical') {
            height  = height / 2 - (value / 2);
            return height;
        }
    };

    /*
    *   "Physical" construction of the gallery...
    */
    
    this.build_gallery = function () {
        
        var that = this;
        // create modal div
        var modal = document.createElement('div');
            modal.classList.add('modal');
            modal.classList.add('in');
                
        that.doc.appendChild(modal);

        modal.addEventListener(animEndEvent, function (e) {

            if (!that.gallery_init) {
                
                // create frame
                var frame            = document.createElement('div');
                    frame.classList.add('modal__holder');
                    frame.classList.add('in');
                    frame.id         = 'frame';
                    frame.style.left = that.get_center_of_window().width + 'px';
                    frame.style.top  = that.get_center_of_window().height + 'px';

                    frame.style.width  = that.img_width + 'px';
                    frame.style.height = that.img_heigth + 'px';

                // create ui
                var ui_prev  = document.createElement('div');
                    ui_prev.classList.add('modal__btns');
                    ui_prev.classList.add('modal__btns--prev');
                    //comprobation while initing the gallery
                    if (that.index == 0) {
	                    ui_prev.classList.add('modal__btns--hide');
                    } 

                var ui_close = document.createElement('div');
                    ui_close.classList.add('modal__btns');
                    ui_close.classList.add('modal__btns--close');

                var ui_next  = document.createElement('div');
                    ui_next.classList.add('modal__btns');
                    ui_next.classList.add('modal__btns--next');
                    //comprobation while initing the gallery
                    if (that.index == (that.gallery_length - 1)) {
	                    ui_next.classList.add('modal__btns--hide');
                    }
                    

                //attach events to buttons
                if (that.gallery_open === true) {
                    ui_close.addEventListener('click', function () {
                        that.destroy_gallery ();
                    }, false);      
                }
        
                if (that.gallery_open === true) {
                    ui_prev.addEventListener('click', function () {
                        that.update_gallery ('prev');
                    }, false);
                }

                if (that.gallery_open === true) {
                    ui_next.addEventListener('click', function () {
                        that.update_gallery ('next');
                    }, false);
                }

                modal.appendChild(frame);

                modal.classList.remove('in');

                frame.addEventListener(animEndEvent, function (e) {
                    this.classList.remove('in');
                    if (!that.image_open) {
                        that.build_image('prev');
                    }

                    frame.appendChild(ui_prev);
                    frame.appendChild(ui_close);
                    frame.appendChild(ui_next);

                    that.image_open = true;

                }, false);

                that.gallery_init = true;
            }

        }, false);

        that.gallery_open = true;
    };

    this.build_image = function (direction) {
        var that = this; 
        
        //hook frame
        var frame = document.getElementById('frame');

        //create image
        var frame_image = new Image();
        frame_image.id  = 'modal-image';
        frame_image.src = that.gallery_content_links[that.index];

        //determinate the orientation of the imagen: < 1 -> hor; > 1 -> ver.
        var frame_image_or = frame_image.width / frame_image.height;

        //console.log(frame_image_or);

        //responsive stuff. based on the width of the screen
        var image = document.getElementById('modal-image');
        var window_width = window.innerWidth;
        var device = self.check_the_device(window_width);
        
        switch (device) {
            case 0: 
                var frame_width    = (self.img_width > frame.width) ? frame.width  : self.img_width,
                    frame_height   = (self.img_height > frame.height) ? frame.height  : self.img_height;    
                frame.style.width  = frame_width + 'px';
                frame.style.height = frame_height + 'px';
                break;

            case 1: 
                var frame_width    = 600,
                    frame_height   = 480;      
                frame.style.width  = frame_width + 'px';
                frame.style.height = frame_height + 'px';
                break;

            case 2: 
                var frame_width    = 600,
                    frame_height   = 720;     
                frame.style.width  = frame_width + 'px';
                frame.style.height = frame_height + 'px';                    
                break;

            case 3: 
                var frame_width    = 280,
                    frame_height   = 350;  
                frame.style.width  = frame_width + 'px';
                frame.style.height = frame_height + 'px';                    
                break;

            default:  
                var frame_width    = (self.img_width > frame.width) ? frame.width  : self.img_width,
                    frame_height   = (self.img_height > frame.height) ? frame.height  : self.img_height;    
                    frame.style.width  = frame_width + 'px';
                    frame.style.height = frame_height + 'px';
        }

        frame.style.left   = self.update_center_of_window ('horizontal', frame_width) + 'px';
        frame.style.top    = self.update_center_of_window ('vertical', frame_height) + 'px';

        //fix bug
        if (document.getElementById('image_holder')) {
            document.getElementById('image_holder').parentElement.removeChild(document.getElementById('image_holder'));
        }

        //create image holder
        var image_holder = document.createElement('div');
            image_holder.id = 'image_holder';
            image_holder.classList.add('image__holder');
            image_holder.classList.add('in');
        
        //classes for the animation
        if (direction === 'prev') {
            image_holder.classList.add('in-right');
        } else if (direction === 'next') {
            image_holder.classList.add('in-left');
        }

        //attach image to the html
        image_holder.insertBefore(frame_image, image_holder.childNodes[0]);
        frame.insertBefore(image_holder, frame.childNodes[0]);
                
        //center image in the frame
        if (frame_image_or > 1) {
            frame_image.style.position  = 'absolute';
            frame_image.style.width     =  frame_width + 'px';
            frame_image.style.marginTop = ((frame_height - frame_image.clientHeight) / 2) + 'px';
        } else if (frame_image_or = 1) {
	        frame_image.style.position  = 'absolute';
            frame_image.style.width     = 'auto';
            frame_image.style.height 	= 100 + '%';
            frame_image.style.marginLeft = ((frame_width - frame_image.clientWidth) / 2) + 'px';
        } else {
            frame_image.style.position  = 'absolute';
            frame_image.style.height 	= frame_height + 'px';
            frame_image.style.marginLeft = ((frame_width - frame_image.clientWidth) / 2) + 'px';
        }
        
        //get the close-x beneth to the image frame - not done yet
        console.log(frame_image.height, image_holder.clientHeight);
        
        //remove animation class
        image_holder.addEventListener(animEndEvent, function () {
            this.classList.remove('in');
        }, false);

        //update global variables
        self.image_open = true;
        self.animating = false;
    };

    this.calculate_dimensions = function (elem) {
        var that = this;
        var _height = elem.height;
        var _width  = elem.width;
        var _img_orientation = function () {
            if (_height >  _width) {
                return 'vertical'; 
            } else {
                return 'horizontal'; 
            }
        }();

        var obj = {
            height      : _height, 
            width       : _width, 
            orientation : _img_orientation
        };
        return obj;
    };

    this.update_gallery = function (direction) {
        var that = this;
        if (that.index == 0 && direction == 'prev') {
            var btn = that.doc.querySelector('modal__btns--prev');
        } else if (that.index == (that.gallery_length - 1) && direction == 'next') {
            //desactivar botones de next
        } else {
            if (direction == 'prev') {
                that.get_prev_img (that.index);
            } else if (direction == 'next') {
                that.get_next_img (that.index);
            }
        }
        
        //actualize arrows
        var ui_prev = document.body.querySelector('.modal__btns--prev');
        var ui_next = document.body.querySelector('.modal__btns--next');
        
        if (that.index == 0) {
            ui_prev.classList.add('modal__btns--hide');
        } else if (that.index == (that.gallery_length - 1)) {
		    ui_next.classList.add('modal__btns--hide');
		} else {
			ui_prev.classList.remove('modal__btns--hide');
			ui_next.classList.remove('modal__btns--hide');
		}

    };

    this.get_prev_img = function () {
        var that = this;
        var frame_holder = that.doc.querySelector('#image_holder');
        
        that.index = that.index - 1;
        that.destroy_actual_image ('prev');
        that.animating = true;

        
        frame_holder.addEventListener(animEndEvent, function (e) {
           self.build_image ('prev');
        }, false);
    };

    this.get_next_img = function () {
        var that = this;
        var frame_holder = that.doc.querySelector('#image_holder');
        
        that.index = that.index + 1;
        that.destroy_actual_image ('next');
        that.animating = true;
        
        frame_holder.addEventListener(animEndEvent, function (e) {
           self.build_image ('next');
        }, false);
    };
    

    this.destroy_actual_image = function (direction) {
        var that = this;
        that.animating = true;
        
        var frame_holder = that.doc.querySelector('#image_holder');
            frame_holder.classList.add('out');
        
        //console.log(frame_holder);
        
        // animation
        if (direction === 'prev') {
            frame_holder.classList.add('out-right');
        } else if (direction === 'next') {
            frame_holder.classList.add('out-left');
        }

        // when animation is done
        frame_holder.addEventListener(animEndEvent, function () {
            //self.parentElement.removeChild(self);
            self.animating = false;
        }, false);
        
        that.image_open = false;
    };

    this.destroy_gallery = function () {
        var that = this;
        var modal = that.doc.querySelector('.modal');
        modal.classList.add('out');

        modal.addEventListener(animEndEvent, function () {
            if (modal.typeof !== 'undefined') {
                modal.parentElement.removeChild(modal);
                that.put_settings_to_0 ();
            }
        }, false);
    };


    this.put_settings_to_0 = function (i) {
        var that = this;
        that.gallery_init = false;
        that.gallery_open = false;
        that.image_open   = false;
        that.index        = (i === null) ? 0 : i;
    };

    //add eventlisteners
    for (var i = 0; i < this.gallery_content.length; i++) {     
        this.gallery_content[i].addEventListener('click', function () {
            self.index = self.check_the_index(this);
            if (self.gallery_open === false) {
                self.build_gallery(index);
            }
        }, false);
    }

    document.addEventListener('keyup', function (e) {
        if (self.gallery_open) {
            if (e.keyCode == 27) {
                self.destroy_gallery();
                self.gallery_open = false;
            }
        }
    }, false);

    document.addEventListener('keyup', function (e) {
        if (self.gallery_open) {
            if (e.keyCode == 37 && self.animating === false) {
                self.update_gallery ('prev');
            }
        }
    }, false);

    document.addEventListener('keyup', function (e) {
        if (self.gallery_open && self.animating === false) {
            if (e.keyCode == 39) {
                self.update_gallery ('next');
            }
        }
    }, false);

    document.addEventListener('click', function (e) {
        if (self.gallery_open) {
            var modal = self.doc.querySelector('.modal');
            if (e.target === modal) {
                self.destroy_gallery();
            }
        }
    }, false);
    
    //Hammer.js events - doesn't work for android chrome... :(
    var swipe = Hammer(document).on('drag swipe', function(e) {
		if(Hammer.utils.isVertical(e.gesture.direction)) {
	      return;
	    }
		
		e.gesture.preventDefault();
		
		if (e.type == 'swipe') {
			if(self.gallery_open) {
				console.log(e);
				
				if (e.gesture.direction == 'left') {
					self.update_gallery ('next');
				} else if (e.gesture.direction == 'right') {
					self.update_gallery ('prev');
				}
			}
		}
	});

    //responsive methods
    window.addEventListener('resize', function () {
        
        var window_width = window.innerWidth;
        var device = self.check_the_device(window_width);

        if (self.gallery_open) {
            
            var frame = document.getElementById('frame');
            var image = document.getElementById('modal-image');
           
            switch (device) {
	            case 0: 
	                var frame_width    = (self.img_width > frame.width) ? frame.width  : self.img_width,
	                    frame_height   = (self.img_height > frame.height) ? frame.height  : self.img_height;    
	                frame.style.width  = frame_width + 'px';
	                frame.style.height = frame_height + 'px';
	                break;
	
	            case 1: 
	                var frame_width    = 600,
	                    frame_height   = 480;      
	                frame.style.width  = frame_width + 'px';
	                frame.style.height = frame_height + 'px';
	                break;
	
	            case 2: 
	                var frame_width    = 600,
	                    frame_height   = 720;     
	                frame.style.width  = frame_width + 'px';
	                frame.style.height = frame_height + 'px';                    
	                break;
	
	            case 3: 
	                var frame_width    = 280,
	                    frame_height   = 350;  
	                frame.style.width  = frame_width + 'px';
	                frame.style.height = frame_height + 'px';                    
	                break;
	
	            default:  
	                var frame_width    = (self.img_width > frame.width) ? frame.width  : self.img_width,
	                    frame_height   = (self.img_height > frame.height) ? frame.height  : self.img_height;    
	                    frame.style.width  = frame_width + 'px';
	                    frame.style.height = frame_height + 'px';            
            }

            frame.style.left   = self.update_center_of_window ('horizontal', frame_width) + 'px';
            frame.style.top    = self.update_center_of_window ('vertical', frame_height) + 'px';

            if (image.width > image.height) {
                image.style.position = 'absolute';
                image.style.width =  frame_width + 'px';

                if (image.height > frame_height) {
                    var diff = frame_height - image.height;
                    image.style.top =  (0 - diff) + 'px';
                }

            } else {
                image.style.position = 'absolute';
                image.style.left = ((frame_width / 2) - (image.width / 3)) + 'px';
                image.style.height = frame_height + 'px';
            }
        }


    
    }, false);
};


var Sticky_sidebar = function (sticky_options) {
	'use strict';
	self = this;
	
	//manage errors - no Jquery
	try { 
		if (!window.$) throw 'You must install jQuery first, if you want the plugin to work.'
	} 
	catch (err) {
		console.log(err);
	}
	
	
	//options parsing - private variables
	var element_selector   = sticky_options.element,
		parent_selector    = sticky_options.parent,
		offset 			   = (sticky_options.offset == null)     ? 0 : sticky_options.offset,
		is_drupal		   = (sticky_options.is_drupal == null)  ? false : sticky_options.is_drupal,
		theres_admin_menu  = (sticky_options.theres_admin_menu == null) ? false : sticky_options.theres_admin_menu,
		growable		   = (sticky_options.growable == null)   ? false : sticky_options.growable,   //not developed yet
		responsive		   = (sticky_options.responsive == null) ? false : sticky_options.responsive, //not developed yet
		debugging		   = (sticky_options.debugging == null)  ? false : sticky_options.debugging,
		from_numof_px	   = (sticky_options.from_numof_px == null) ? 0 : sticky_options.from_numof_px;

	//object features - public variables
	this.element 		 = $(element_selector);
	this.parent 		 = $(parent_selector);	
	this.element_height	 = this.element[0].offsetHeight;
	this.position 		 = $(this.element[0]).position();
	this.height_min		 = this.position.top;
	this.height_max		 = function () {
		var total = self.parent.position().top + self.parent.height() - self.element.height();
		return total;
	}();
	
	this.window_position = window.scrollY;
	this.window_width	 = $(window).width();
	this.window_height	 = $(window).height();
	this.offset 		 = offset;
	
	this.element_width   = this.element[0].offsetWidth;
	this.element_left    = this.element[0].offsetLeft;
	
	$(window).on('resize', function (ev) {
		self.element_left = function () {
			var total   = window.innerWidth;
			var content =  self.parent[0].offsetWidth;
			var a = total - content;
			var parcial = a/2 + (((75 * content) / 100) + 16);
			return parcial;
		}();
		
		self.element_width = function () {
			var total = self.parent[0].offsetWidth;
			var parcial = ((25 * total) / 100) - 16 ;
			return parcial;
		}();
		
		self.window_width	 = $(window).width();
	});
	
	
	this.do_sticky = function () {
		var that = this; 
		if (that.window_position > that.position.top - that.offset) {
			$(that.element).css({
				'position': 'fixed',
				'top'	  : that.offset + 'px',
				'left'	  : self.element_left + 'px',
				'width'	  : self.element_width + 'px'
			});
			if (that.window_position > that.height_max) {
				$(that.element).css({
					'position': 'absolute',
					'top'	  : that.height_max  + 'px',
					'left'	  : self.element_left + 'px',
					'width'	  : self.element_width + 'px'	
				});	
			}
		} else {
			$(that.element).css({
				'position': '',
				'top'	  : '',
				'left'	  : '',
				'width'	  : ''
			});			
		}
	};
	
	// initialize functionality to object
	var _init = (function () {
		if (is_drupal === true && theres_admin_menu === false ) {
			
			//load
			if (this.window_width > from_numof_px) {
				this.do_sticky();
			}
			
			//scroll
			$(window).on('scroll', function (e) {
				this.self.window_position = window.scrollY;
				if (this.self.window_width > from_numof_px) {
					self.do_sticky();
				}
				if (debugging) { console.log(self);}
			});
			
			//resize
			$(window).on('resize', function (e) {
				if (this.self.window_width > from_numof_px) {
					self.do_sticky();
					if (debugging) { console.log(self); }
				}
			});
		}
	}.call(this));

	if (debugging) {
		console.log(this);
	}
};


