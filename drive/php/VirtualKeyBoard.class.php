<?php
/**
 * Generate md5:
 * http://www.md5.cz/
 * 
 * @example
 * 	$keyB = new VirtualKeyBoard(VirtualKeyBoard::MD5)
 * 	$keyB->setPassBD('0e65844d46d0e9452620c58170d92daf')->setObfuscatedPass('4,9@@8,9@@7,9@@9,8@@8,9@@9,5')->Ok();
 * 
 */
final class VirtualKeyBoard{
	const MD5 = 1;
	const SHA1 = 2;
	private $hash;
	private $passWordBd;
	private $obfuscatedPass;
	private $futurePass = array();
	private $validPassword = false;
	
	public function __construct($hash=null){
		if( !array_key_exists($hash, array(self::MD5, self::SHA1))){
			throw new InvalidArgumentException('Hash informed does not exists.');
		}
		
		$this->hash = $hash;
	}
	
	/**
	 * Method define value of attribute $passWordBd::
	 * 
	 * @param hash $value
	 * @access public
	 * @return VirtualKeyBoard
	 */
	public function setPassWordBD($value){
		$this->passWordBd = trim($value);
		return $this;
	}
	
	/**
	 * Method define value of attribute $obfuscatedPass::
	 * 
	 * @param hash $value
	 * @access public
	 * @return VirtualKeyBoard
	 */
	public function setObfuscatedPass($value){
		$this->obfuscatedPass = trim($value);
		return $this;
	}
	
	/**
	 * Method verify if password is correct::
	 * 
	 * @param void void
	 * @access public
	 * @return bool
	 */
	public function Ok(){		
		$obPass = explode('@@', $this->obfuscatedPass);	
		$this->compare(explode(',', array_shift($obPass)), $obPass);
		return $this->validPassword;
	}
	
	/**
	 * Gera padrões de senha
	 *
	 * @access private
	 * @param array $pair
	 * @param array $list
	 * @return void 
	 */
	private function compare($pair, $list){
		#$pairs = explode(',', array_shift($list));
		
		/**
		 * Percorre lista de pares::
		 */
		foreach( $pair as $key => $value){
			$this->futurePass[] = $value;
			
			$this->compare( array(1, 2), array(0=>'1,2') );
			
			#print_r( "SS" );
			exit;
			
		}
		
		return true;
	}
}
