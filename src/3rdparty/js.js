/**
 * Disable console output unless DEBUG mode is enabled.
 * Add
 *	 define('DEBUG', true);
 * To the end of config/config.php to enable debug mode.
 * The undefined checks fix the broken ie8 console
 */
var oc_webroot = "/rj";
/*if (typeof oc_webroot === "undefined") {
	oc_webroot = location.pathname;
	var pos = oc_webroot.indexOf('/index.php/');
	if (pos !== -1) {
		oc_webroot = oc_webroot.substr(0, pos);
	}
	else {
		//这里从第一个字符开始查找/表示跳过第一个斜杠
		oc_webroot = oc_webroot.substr(0, oc_webroot.indexOf('/',1));
	}
}*/
var OC ={
	PERMISSION_CREATE:4,
	PERMISSION_READ:1,
	PERMISSION_UPDATE:2,
	PERMISSION_DELETE:8,
	PERMISSION_SHARE:16,
	PERMISSION_ALL:31,
	webroot:oc_webroot || "/rj",
    oc_requesttoken:"",
	appswebroots:(typeof oc_appswebroots !== 'undefined') ? oc_appswebroots:false,
	currentUser:(typeof oc_current_user!=='undefined')?oc_current_user:false,
	coreApps:['', 'admin','log','search','settings','core','3rdparty'],
	/**
	 * get an absolute url to a file in an appen
	 * @param app the id of the app the file belongs to
	 * @param file the file path relative to the app folder
	 * @return string
	 */
	linkTo:function(app,file){
		return OC.filePath(app,'',file);
	},
	/**
	 * Creates an url for remote use
	 * @param string $service id
	 * @return string the url
	 *
	 * Returns a url to the given service.
	 */
	linkToRemoteBase:function(service) {
		return OC.webroot + '/remote.php/' + service;
	},
	/**
	 * @brief Creates an absolute url for remote use
	 * @param string $service id
	 * @param bool $add_slash
	 * @return string the url
	 *
	 * Returns a absolute url to the given service.
	 */
	linkToRemote:function(service) {
		return window.location.protocol + '//' + window.location.host + OC.linkToRemoteBase(service);
	},
	/**
	 * get the absolute url for a file in an app
	 * @param app the id of the app
	 * @param type the type of the file to link to (e.g. css,img,ajax.template)
	 * @param file the filename
	 * @return string
	 */
	filePath:function(app,type,file){
		var isCore=OC.coreApps.indexOf(app)!==-1,
			link=OC.webroot;
		if((file.substring(file.length-3) === 'php' || file.substring(file.length-3) === 'css') && !isCore){
			link+='/index.php/apps/' + app;
			if (file != 'index.php') {
				link+='/';
				if(type){
					link+=encodeURI(type + '/');
				}
				link+= file;
			}
		}else if(file.substring(file.length-3) !== 'php' && !isCore){
			link=OC.appswebroots[app];
			if(type){
				link+= '/'+type+'/';
			}
			if(link.substring(link.length-1) !== '/'){
				link+='/';
			}
			link+=file;
		}else{
			if ((app == 'settings' || app == 'core' || app == 'search') && type == 'ajax') {
				link+='/index.php/';
			}
			else {
				link+='/';
			}
			if(!isCore){
				link+='apps/';
			}
			if (app !== '') {
				app+='/';
				link+=app;
			}
			if(type){
				link+=type+'/';
			}
			link+=file;
		}
		return link;
	},
	/**
	 * get the absolute path to an image file
	 * @param app the app id to which the image belongs
	 * @param file the name of the image file
	 * @return string
	 *
	 * if no extension is given for the image, it will automatically decide between .png and .svg based on what the browser supports
	 */
	imagePath:function(app,file){
		if(file.indexOf('.')==-1){//if no extension is given, use png or svg depending on browser support
			file+=(SVGSupport())?'.svg':'.png';
		}
		return OC.filePath(app,'img',file);
	},
	/**
	 * load a script for the server and load it
	 * @param app the app id to which the script belongs
	 * @param script the filename of the script
	 * @param ready event handeler to be called when the script is loaded
	 *
	 * if the script is already loaded, the event handeler will be called directly
	 */
	addScript:function(app,script,ready,obj){
		var deferred, path=OC.filePath(app,'js',script+'.js');
		if(!OC.addScript.loaded[path]){
			if(ready){
				deferred=$.getScript(path,ready,obj);
			}else{
				deferred=$.getScript(path);
			}
			OC.addScript.loaded[path]=deferred;
		}else{
			if(ready){
				ready(obj);
			}
		}
		return OC.addScript.loaded[path];
	},
	/**
	 * load a css file and load it
	 * @param app the app id to which the css style belongs
	 * @param style the filename of the css file
	 */
	addStyle:function(app,style){
		var path=OC.filePath(app,'css',style+'.css');
		if(OC.addStyle.loaded.indexOf(path)===-1){
			OC.addStyle.loaded.push(path);
			if (document.createStyleSheet) {
				document.createStyleSheet(path);
			} else {
				style=$('<link rel="stylesheet" type="text/css" href="'+path+'"/>');
				$('head').append(style);
			}
		}
	},
	basename: function(path) {
		return path.replace(/\\/g,'/').replace( /.*\//, '' );
	},
	dirname: function(path) {
		return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
	},
	/**
	 * do a search query and display the results
	 * @param query the search query
	 */
	search:function(query){
		if(query){
			OC.addStyle('search','results');
			$.getJSON(OC.filePath('search','ajax','search.php')+'?query='+encodeURIComponent(query), function(results){
				OC.search.lastResults=results;
				OC.search.showResults(results);
			});
		}
	},
	dialogs:null,
	mtime2date:function(mtime) {
		mtime = parseInt(mtime,10);
		var date = new Date(1000*mtime);
		return date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()+', '+date.getHours()+':'+date.getMinutes();
	},
	/**
	 * Parses a URL query string into a JS map
	 * @param queryString query string in the format param1=1234&param2=abcde&param3=xyz
	 * @return map containing key/values matching the URL parameters
	 */
	parseQueryString:function(queryString){
		var parts,
			components,
			result = {},
			key,
			value;
		if (!queryString){
			return null;
		}
		if (queryString[0] === '?'){
			queryString = queryString.substr(1);
		}
		parts = queryString.split('&');
		for (var i = 0; i < parts.length; i++){
			components = parts[i].split('=');
			if (!components.length){
				continue;
			}
			key = decodeURIComponent(components[0]);
			if (!key){
				continue;
			}
			value = components[1];
			result[key] = value && decodeURIComponent(value);
		}
		return result;
	},
	/**
	 * Opens a popup with the setting for an app.
	 * @param appid String. The ID of the app e.g. 'calendar', 'contacts' or 'files'.
	 * @param loadJS boolean or String. If true 'js/settings.js' is loaded. If it's a string
	 * it will attempt to load a script by that name in the 'js' directory.
	 * @param cache boolean. If true the javascript file won't be forced refreshed. Defaults to true.
	 * @param scriptName String. The name of the PHP file to load. Defaults to 'settings.php' in
	 * the root of the app directory hierarchy.
	 */
	appSettings:function(args) {
		if(typeof args === 'undefined' || typeof args.appid === 'undefined') {
			throw { name: 'MissingParameter', message: 'The parameter appid is missing' };
		}
		var props = {scriptName:'settings.php', cache:true};
		$.extend(props, args);
		var settings = $('#appsettings');
		if(settings.length == 0) {
			throw { name: 'MissingDOMElement', message: 'There has be be an element with id "appsettings" for the popup to show.' };
		}
		var popup = $('#appsettings_popup');
		if(popup.length == 0) {
			$('body').prepend('<div class="popup hidden" id="appsettings_popup"></div>');
			popup = $('#appsettings_popup');
			popup.addClass(settings.hasClass('topright') ? 'topright' : 'bottomleft');
		}
		if(popup.is(':visible')) {
			popup.hide().remove();
		} else {
			var arrowclass = settings.hasClass('topright') ? 'up' : 'left';
			var jqxhr = $.get(OC.filePath(props.appid, '', props.scriptName), function(data) {
				popup.html(data).ready(function() {
					popup.prepend('<span class="arrow '+arrowclass+'"></span><h2>'+t('core', 'Settings')+'</h2><a class="close svg"></a>').show();
					popup.find('.close').bind('click', function() {
						popup.remove();
					});
					if(typeof props.loadJS !== 'undefined') {
						var scriptname;
						if(props.loadJS === true) {
							scriptname = 'settings.js';
						} else if(typeof props.loadJS === 'string') {
							scriptname = props.loadJS;
						} else {
							throw { name: 'InvalidParameter', message: 'The "loadJS" parameter must be either boolean or a string.' };
						}
						if(props.cache) {
							$.ajaxSetup({cache: true});
						}
						$.getScript(OC.filePath(props.appid, 'js', scriptname))
						.fail(function(jqxhr, settings, e) {
							throw e;
						});
					}
				}).show();
			}, 'html');
		}
	}
};
OC.getFileExtension =function (file) {
    var parts = file.split('.');
    return parts[parts.length - 1].toLowerCase();
}
OC.router_base_url = OC.webroot + '/index.php';

module.exports = OC;

//$(document).ready(initCore);
/*
/!**
 * check if an element exists.
 * allows you to write if ($('#myid').exists()) to increase readability
 * @link http://stackoverflow.com/questions/31044/is-there-an-exists-function-for-jquery
 *!/
jQuery.fn.exists = function(){
	return this.length > 0;
};*/

