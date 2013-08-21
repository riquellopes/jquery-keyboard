/***
 * O VirturalKeyboard é um script gerador teclados para autenticação segura.
 * senha gerada, mesmo que trasmitida em texto plano, não é decifrada::
 *
 */
!function($){
	"use strict";
	
	var VirtualKeyBoard = function(sinze){
		this.initialize(sinze);
	};
	
	VirtualKeyBoard.prototype = {
		options:{
			sinzePass:5,
			separator:'-'
		},
		keys:[],
		captureKey:[],
		constructor:VirtualKeyBoard,
		/**
		 * Inicializa sistema::
		 */
		initialize:function(){
			console.log(this);
		},
		/**
		 * Gera um array com número aleatórios::
		 */
		randomKeys:function(){
			this.keys=[0,1,2,3,4,5,6,7,8,9]; 
			this.keys.sort(function(){
				return 0.5 - Math.random();
			});	
		},
		/**
		 * Gera teclado com números aleatorios::
		 */
		getKeyBoard:function(){
			this.randomKeys();
			var keysbord=[],
				isInterable=this.keys.length > 0;
				
				/**
				 * Gera teclas::
				 */
				while(isInterable){
					keysbord.push( this.keys[0].toString().concat("-").concat(this.keys[1]) );
					this.keys.shift();
					this.keys.shift();

					isInterable=this.keys.length > 0;
				}//while
			return keysbord;
		},
		/**
		 * Define valor do key::
		 */
		setKey:function(value){
			this.captureKey.push( value.split('-') );
			return this;
		},
		/**
		 * Recupera valor do key::
		 */
		getKey:function(index){
			try{
				this.captureKey[index];
			}catch(error){/**/}
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
		/**
		 * Cria tag password::
		 */
		var inputPassword=(function(){
				var id = $(this).prop('id'),
					name = "virtual-keyboard-name-".concat(id.toLowerCase()),
					/**
					 * Define campo de senha::
					 */
						password = $('<input />', {
							type:'password',
							name:name,
							id:id
						}).appendTo('body'),
					
					/**
					 * Cria modal para receber html::
					 */
						tpl = new Array();
						tpl.push('<div id="virtual-key-board" style="display:none;">');
							tpl.push('<div class="btn-group" id="keys"></div>');
							//tpl.push('<div>');
								//tpl.push('<button type="button" class="btn btn-success">Send</button>');
								//tpl.push('<button type="button" class="btn btn-warning">Cancel</button>');
							//tpl.push('</div>');
						tpl.push('</div>');
						$(tpl.join('').trim()).appendTo('body');
					$(this).remove();
				return password;
			}).call(this),
			
			/**
			 * Instancia class::
			 */
				v = new VirtualKeyBoard(5);
				
			$(inputPassword).on('click', function(){
				$(this).off('click');
				
				v.Tpl.generate(v, function(){
					$('#keys').html(this.tpl);
					$('#virtual-key-board').show();
					
					$('[id^=key-]').on('click', function(){
						v.setKey( $(this).text() );
					})
				});
			});
	};
}(window.jQuery);
