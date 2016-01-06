"use strict";!function(t){function e(e,o,n){var s="rgb"+(t.support.rgba?"a":"")+"("+parseInt(e[0]+n*(o[0]-e[0]),10)+","+parseInt(e[1]+n*(o[1]-e[1]),10)+","+parseInt(e[2]+n*(o[2]-e[2]),10);return t.support.rgba&&(s+=","+(e&&o?parseFloat(e[3]+n*(o[3]-e[3])):1)),s+")"}function o(t){var e;return(e=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(t))?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),1]:(e=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(t))?[17*parseInt(e[1],16),17*parseInt(e[2],16),17*parseInt(e[3],16),1]:(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t))?[parseInt(e[1]),parseInt(e[2]),parseInt(e[3]),1]:(e=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(t))?[parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10),parseFloat(e[4])]:s[t]}t.extend(!0,t,{support:{rgba:function(){var e=t("script:first"),o=e.css("color"),n=!1;if(/^rgba/.test(o))n=!0;else try{n=o!=e.css("color","rgba(0, 0, 0, 0.5)").css("color"),e.css("color",o)}catch(s){}return n}()}});var n="color backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor outlineColor".split(" ");t.each(n,function(n,s){t.Tween.propHooks[s]={get:function(e){return t(e.elem).css(s)},set:function(n){var i=n.elem.style,r=o(t(n.elem).css(s)),a=o(n.end);n.run=function(t){i[s]=e(r,a,t)}}}}),t.Tween.propHooks.borderColor={set:function(s){var i=s.elem.style,r=[],a=n.slice(2,6);t.each(a,function(e,n){r[n]=o(t(s.elem).css(n))});var d=o(s.end);s.run=function(o){t.each(a,function(t,n){i[n]=e(r[n],d,o)})}}};var s={aqua:[0,255,255,1],azure:[240,255,255,1],beige:[245,245,220,1],black:[0,0,0,1],blue:[0,0,255,1],brown:[165,42,42,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgrey:[169,169,169,1],darkgreen:[0,100,0,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkviolet:[148,0,211,1],fuchsia:[255,0,255,1],gold:[255,215,0,1],green:[0,128,0,1],indigo:[75,0,130,1],khaki:[240,230,140,1],lightblue:[173,216,230,1],lightcyan:[224,255,255,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],magenta:[255,0,255,1],maroon:[128,0,0,1],navy:[0,0,128,1],olive:[128,128,0,1],orange:[255,165,0,1],pink:[255,192,203,1],purple:[128,0,128,1],violet:[128,0,128,1],red:[255,0,0,1],silver:[192,192,192,1],white:[255,255,255,1],yellow:[255,255,0,1],transparent:[255,255,255,0]}}(jQuery),+function(t){function e(e,n){return this.each(function(){var s=t(this),i=s.data("bs.modal"),r=t.extend({},o.DEFAULTS,s.data(),"object"==typeof e&&e);i||s.data("bs.modal",i=new o(this,r)),"string"==typeof e?i[e](n):r.show&&i.show(n)})}var o=function(e,o){this.options=o,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};o.VERSION="3.3.5",o.TRANSITION_DURATION=300,o.BACKDROP_TRANSITION_DURATION=150,o.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},o.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},o.prototype.show=function(e){var n=this,s=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){n.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(n.$element)&&(n.ignoreBackdropClick=!0)})}),this.backdrop(function(){var s=t.support.transition&&n.$element.hasClass("fade");n.$element.parent().length||n.$element.appendTo(n.$body),n.$element.show().scrollTop(0),n.adjustDialog(),s&&n.$element[0].offsetWidth,n.$element.addClass("in"),n.enforceFocus();var i=t.Event("shown.bs.modal",{relatedTarget:e});s?n.$dialog.one("bsTransitionEnd",function(){n.$element.trigger("focus").trigger(i)}).emulateTransitionEnd(o.TRANSITION_DURATION):n.$element.trigger("focus").trigger(i)}))},o.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(o.TRANSITION_DURATION):this.hideModal())},o.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},o.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},o.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},o.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},o.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},o.prototype.backdrop=function(e){var n=this,s=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=t.support.transition&&s;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+s).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;i?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){n.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},o.prototype.handleUpdate=function(){this.adjustDialog()},o.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},o.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},o.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},o.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},o.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},o.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var n=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=o,t.fn.modal.noConflict=function(){return t.fn.modal=n,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(o){var n=t(this),s=n.attr("href"),i=t(n.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,"")),r=i.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},i.data(),n.data());n.is("a")&&o.preventDefault(),i.one("show.bs.modal",function(t){t.isDefaultPrevented()||i.one("hidden.bs.modal",function(){n.is(":visible")&&n.trigger("focus")})}),e.call(i,r,this)})}(jQuery);var SCREEN_MD=1024;$(function(){function t(t){$("#btn-toggle-sidebar").toggleClass("sidebar-hidden",!t),$("#sidebar").toggle(t),$("#index").toggleClass("sidebar",t).children(".btn-watch-xs, .btn-atom-xs, .btn-mark-read-xs").toggleClass("show",!t)}function e(t){var e=$("<form>",{method:"POST",action:t});return e.append('<input type="hidden" name="_token" value="'+$('meta[name="csrf-token"]').attr("content")+'">'),e}function o(t){$("#alert").modal("show"),$("#alert").find(".modal-body").text(t)}$("#sidebar").is(":hidden")&&$("#index").children(".btn-watch-xs, .btn-atom-xs, .btn-mark-read-xs").addClass("show"),$(document).click(function(t){var e=$("#sidebar, #btn-toggle-sidebar");"absolute"!==$("#sidebar").css("position")||e.is(t.target)||0!=e.has(t.target).length||$("#sidebar").hide()}),$(window).width()<=SCREEN_MD&&$("#btn-toggle-sidebar").addClass("sidebar-hidden"),$("#btn-toggle-sidebar").click(function(){if($(window).width()<=SCREEN_MD){$("#sidebar").toggle();var e=function(){$(window).width()>SCREEN_MD&&$("#index").hasClass("sidebar")&&(t(!0),$(window).unbind("resize",e))};$(window).unbind("resize",e).bind("resize",e)}else{var o=$("#index").hasClass("sidebar");t(!o)}}),$('.toggle[data-toggle="collapse"]').click(function(){$(this).toggleClass("in")}),$(".btn-report").click(function(){var t={post_id:$(this).data("post-id")};$.get(baseUrl+"/Flag",{url:$(this).data("url"),metadata:JSON.stringify(t)},function(t){$(t).appendTo("body"),$("#flag").find(".modal").modal("show")})}),$(".btn-res").click(function(){return e($(this).attr("href")).submit(),!1}),$(".btn-watch a").click(function(){var t=$(this);return $.post(t.attr("href"),function(e){t.parent().toggleClass("on"),t.find("span").text(t.parent().hasClass("on")?"Zakończ obserwację":"Obserwuj"),t.find("small").text("("+e+" "+declination(e,["obserwujący","obserwujących","obserwujących"])+")")}).error(function(t){"undefined"!=typeof t.responseJSON.error&&o(t.responseJSON.error)}),!1}),$(".btn-watch-sm").click(function(){return $(this).toggleClass("on"),$.post($(this).attr("href")),!1}),$(".btn-sub").click(function(){return $(this).toggleClass("active"),$.post($(this).attr("href")),!1}),$(".btn-del").click(function(){var t=$(this);return $("#post-confirm-delete").modal("show").one("click",".danger",function(){$(this).attr("disabled","disabled").text("Usuwanie...");var o=$(this).parents(".modal-content"),n=e(t.attr("href"));$("select",o).length&&n.append('<input type="hidden" name="reason" value="'+$("select",o).val()+'">'),n.submit()}),!1}),$(".vote-up").click(function(){var t=$(this);return $.post(t.attr("href"),function(e){t.toggleClass("on"),t.prev().text(e.count)}).error(function(){}),!1}),$("#sel-forum-list").change(function(){window.location.href=forumUrl+"/"+$(this).val()}),$("#btn-goto").click(function(){$("#sel-forum-list").trigger("change")});var n={};if($(".comments").on("submit","form",function(){var t=$(this);return $("button",t).attr("disabled","disabled").text("Wysyłanie..."),$.post(t.attr("action"),t.serialize(),function(e){t.hasClass("collapse")?($("textarea",t).val(""),t.collapse("hide"),$(e).hide().insertBefore(t).show("slow")):t.parent().hide().replaceWith(e).show("slow")}).always(function(){$("button",t).removeAttr("disabled").text("Zapisz komentarz")}).error(function(t,e){"undefined"!=typeof t.responseJSON.text?o(t.responseJSON.text):"undefined"!=typeof t.responseJSON.error&&o(t.responseJSON.error)}),!1}).on("click",".btn-comment-del",function(){var t=$(this);return $("#comment-confirm-delete").modal("show").one("click",".danger",function(){$(this).attr("disabled","disabled").text("Usuwanie..."),$.post(t.attr("href"),function(){$("#comment-confirm-delete").modal("hide"),t.parent().fadeOut(function(){$(this).remove()})}).error(function(t){"undefined"!=typeof t.responseJSON.error&&o(t.responseJSON.error)})}),!1}).on("click",".btn-show-all",function(){$(this).nextAll("div:hidden").fadeIn(1e3),$(this).remove()}).on("keyup","textarea",function(){parseInt($(this).val().length)>580&&$(this).val($(this).val().substr(0,580)),$("strong",$(this).parents("form")).text(580-parseInt($(this).val().length))}).on("click",".btn-comment-edit",function(){var t=$(this).parent();return $.get($(this).attr("href"),function(e){n[t.data("comment-id")]=t.html(),t.html(e).find("textarea").prompt(promptUrl).fastSubmit().autogrow().focus()}),!1}).on("click",".btn-reset",function(){var t=$(this).parent().parent();t.html(n[t.data("comment-id")])}).find("textarea").one("focus",function(){$(this).prompt(promptUrl).fastSubmit().autogrow().focus()}),$(".comments form").on("shown.bs.collapse",function(){$(this).find("textarea").focus(),$('.btn-comment[href="#'+$(this).attr("id")+'"]').addClass("active")}).on("hidden.bs.collapse",function(){$('.btn-comment[href="#'+$(this).attr("id")+'"]').removeClass("active")}),"undefined"!=typeof reasonsList){var s=$("<select>",{"class":"form-control input-sm"});s.append("<option>-- wybierz powód --</option>"),$.each(reasonsList,function(t,e){s.append('<option value="'+t+'">'+e+"</option>")}),$("#post-confirm-delete").each(function(){s.appendTo($(".modal-body",this))})}if("onhashchange"in window){var i=function(){var t=window.location.hash,e=null,o=null;"id"===t.substring(1,3)?(e=$(t).parents(".post-body"),o="#fff"):(e=$(t),e.is(":hidden")&&($("div:hidden",e.parent()).show(),$(".btn-show-all",e.parent()).remove()),o="#fafafa"),e.addClass("highlight").css("background-color","#FFDCA5"),$("#container-fluid").one("mousemove",function(){e.animate({backgroundColor:o},1500,function(){$(this).removeClass("highlight")})})};window.onhashchange=i,i()}});
//# sourceMappingURL=forum.js.map