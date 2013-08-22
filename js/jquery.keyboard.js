/***
 * O VirturalKeyboard é um script gerador teclados para autenticação segura.
 * senha gerada, mesmo que trasmitida em texto plano, não é decifrada::
 *
 */
!function($){
	"use strict";
	
	var VirtualKeyBoard = function(size, separador){
		this.initialize(size, separador);
	};
	
	VirtualKeyBoard.prototype = {
		size:null,
		separador:null,
		ready:true,
		keys:[],
		captureKey:[],
		constructor:VirtualKeyBoard,
		initialize:function(size, separador){
			this.size=size;
			this.separador=separador;
		},
		start:function(){
			this.ready=true;
			this.captureKey=[];
		},
		randomKeys:function(){
			if( !this.ready )
				throw "Password full size.";
			this.keys=[0,1,2,3,4,5,6,7,8,9]; 
			this.keys.sort(function(){
				return 0.5 - Math.random();
			});	
		},
		getKeyBoard:function(){
			this.randomKeys();
			var keysbord=[],
				isInterable=this.keys.length > 0;
				
				while(isInterable){
					keysbord.push( this.keys[0].toString().concat(this.separador).concat(this.keys[1]) );
					this.keys.shift();
					this.keys.shift();
					
					isInterable=this.keys.length > 0;
				}//while
			return keysbord;
		},
		setKey:function(value){
			if( this.captureKey.length == this.size ){
				this.ready=false;
				throw "Password full size.";
			}
			this.captureKey.push( value.split(this.separador) );
			return this;
		},
		getKey:function(){
			this.captureKey.join('').trim();
		},
		getFakeKey:function(fkey){
			return (new Array(this.captureKey.length+1)).join(fkey);
		},
		getPass:function(){
			return this.captureKey.join('@@');
		}
	};
	
	VirtualKeyBoard.prototype.Tpl = {
		generate:function(obj, callBack){
			var keyBoard = obj.getKeyBoard(),
				tpl = new Array();
				for(var key in keyBoard){
					tpl.push('<button type="button" class="btn btn-primary" id="key-'+key+'">'+keyBoard[key]+'</button>');
				}	
					
				if(typeof callBack == 'function'){
					callBack.call({tpl:tpl.join('').trim(), v:obj});
					return ;
				}
		}
	}
		
	$.fn['virtualKeyBoard']=function(options){
		var options=$.extend({
				size:8,
				separador:'-',
				fakePass:"*"
			}, options),
			inputPassword=(function(){
				var id = $(this).prop('id'),
					name = "virtual-keyboard-name-".concat(id.toLowerCase()),
					/**
					 * Define input password::
					 */
						password = $('<input />', {
							type:'password',
							name:name,
							id:id
						}).appendTo('body'),
					
					/**
					 * Create modal to receive html::
					 */
						tpl = new Array();
						tpl.push('<div id="virtual-key-board" style="display:none;">');
							tpl.push('<div class="btn-group" id="keys"></div>');
						tpl.push('</div>');
						$(tpl.join('').trim()).appendTo('body');
					$(this).remove();
				return password;
			}).call(this),
			
			/**
			 * Object instance::
			 */
				v = new VirtualKeyBoard(options.size, options.separador);
				
			$(inputPassword).on('click', function(){
				$(this).val('');
				v.start();
				v.Tpl.generate(v, function(){
					$('#keys').html(this.tpl);
					$('#virtual-key-board').show();
				});
			});
			
			$('body').on('click', '#keys [id^=key-]', function(){
				try{
					v.setKey( $(this).text() );
					v.Tpl.generate(v, function(){
						$('#keys').html(this.tpl);
					});
					$(inputPassword).val(v.getFakeKey(options.fakePass));
				}catch(error){ 
					$('#virtual-key-board').hide(); 
					$('#keys').empty();
					if( typeof options.end == 'function'){
						options.end.call({pass:v.getPass()});
					}
				}
			});
	};
}(window.jQuery);
