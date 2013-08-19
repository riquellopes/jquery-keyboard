(function($){
	var VirtualKeyBoard=(function(){
		var keysClicked=[],
			keys=[],
			randomKeys=function(){
				keys=[0,1,2,3,4,5,6,7,8,9]; 
				return keys.sort(function(){
					return 0.5 - Math.random();
				});	
			};
		
		this.getKeyBoard=function(){
			randomKeys();
			var size=keys.length > 0;
				keysbord=[];

				while(size){
					keysbord.push( keys[0].toString().concat("-").concat(keys[1]) );
					keys.shift();
					keys.shift();

					size=keys.length > 0;
				}
			return keysbord;	
		};

		this.setKeyClicked=function(value){
			keysClicked.push( value.split('-') );
			return this;
		};
		return this;
	})();

	$.fn.virtualKeyBoard=function(options){
		var setting=$.extend({
			click:null,
			submit:null,
			cancel:null
		}, options);
	};
})(Jquery);
