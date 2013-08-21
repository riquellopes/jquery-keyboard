/***
 * O VirturalKeyboard é um script gerador teclados para autenticação segura.
 * senha gerada, mesmo que trasmitida em texto plano, não é decifrada::
 *
 */
!function($){
	"use strict";
	
	var VirtualKeyBoard = function(){
		this.initialize();
	};
	
	VirtualKeyBoard.prototype = {
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
						}).appendTo('body');
					$(this).remove();
				return password;
			}).call(this),
			
			/*options=$.extend({
				click:null,
				submit:null,
				cancel:null
			}, options);*/
			
			v = new VirtualKeyBoard();
				
			$(self).on('click', function(){
				var keyBoard = v.getKeyBoard();
				
					
			});
	};
}(window.jQuery);
