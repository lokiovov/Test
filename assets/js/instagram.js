/*!
 * Spectragram by Adrian Quevedo (http://adrianquevedo.com/)
 * http://spectragram.js.org/  
 */
if(typeof Object.create!=="function"){Object.create=function(obj){function F(){}F.prototype=obj;return new F}}(function($,window,document,undefined){var Instagram={API_URL:"https://api.instagram.com/v1",initialize:function(options,elem){this.elem=elem;this.$elem=$(elem);this.accessData=$.fn.spectragram.accessData,this.accessToken=this.accessData.accessToken,this.clientID=this.accessData.clientID,this.userCredentials=this.clientID+"&access_token="+this.accessToken+"",this.options=$.extend({},$.fn.spectragram.options,options);this.messages={defaultImageAltText:"Instagram Photo related with "+this.options.query,notFound:"This user account is private or doesn't have any photos."}},getRecentMedia:function(userID){var self=this,getData="/users/"+userID+"/media/recent/?"+self.userCredentials;self.fetch(getData).done(function(results){self.display(results)})},getUserFeed:function(){var self=this,getData="/users/search?q="+self.options.query+"&count="+self.options.max+"&access_token="+self.accessToken+"",isUsernameValid=false;self.fetch(getData).done(function(results){if(results.data.length){for(var length=results.data.length,i=0;i<length;i++){if(results.data[i].username===self.options.query){self.getRecentMedia(results.data[i].id);isUsernameValid=true}}}if(isUsernameValid===false){$.error("Spectragram.js - Error: the username "+self.options.query+" does not exist.")}})},getPopular:function(){var self=this,getData="/media/popular?client_id="+self.userCredentials;self.fetch(getData).done(function(results){self.display(results)})},getRecentTagged:function(){var self=this,getData="/tags/"+self.options.query+"/media/recent?client_id="+self.userCredentials;self.fetch(getData).done(function(results){if(results.data.length){self.display(results)}else{$.error("Spectragram.js - Error: the tag "+self.options.query+" does not have results.")}})},fetch:function(getData){var getUrl=this.API_URL+getData;return $.ajax({type:"GET",dataType:"jsonp",cache:false,url:getUrl})},display:function(results){var $element,$image,imageGroup=[],imageCaption,max,setSize,size;if(results.data===undefined||results.meta.code!==200||results.data.length===0){this.$elem.append($(this.options.wrapEachWith).append(this.messages.notFound))}else{max=this.options.max>=results.data.length?results.data.length:this.options.max;setSize=this.options.size;for(var i=0;i<max;i++){if(setSize==="small"){size=results.data[i].images.thumbnail.url}else if(setSize==="medium"){size=results.data[i].images.low_resolution.url}else{size=results.data[i].images.standard_resolution.url}imageCaption=results.data[i].caption!==null?$("<span>").text(results.data[i].caption.text).html():this.messages.defaultImageAltText;$image=$("<img>",{src:size});$element=$("<a>",{href:results.data[i].link,target:"_blank",title:imageCaption}).append($image);imageGroup.push($(this.options.wrapEachWith).append($element))}this.$elem.append(imageGroup)}if(typeof this.options.complete==="function"){this.options.complete.call(this)}}};jQuery.fn.spectragram=function(method,options){if(jQuery.fn.spectragram.accessData.clientID){this.each(function(){var instagram=Object.create(Instagram);instagram.initialize(options,this);if(instagram[method]){return instagram[method](this)}else{$.error("Method "+method+" does not exist on jQuery.spectragram")}})}else{$.error("You must define an accessToken and a clientID on jQuery.spectragram")}};jQuery.fn.spectragram.options={complete:null,max:10,query:"instagram",size:"medium",wrapEachWith:"<li></li>"};jQuery.fn.spectragram.accessData={accessToken:null,clientID:null}})(jQuery,window,document);
