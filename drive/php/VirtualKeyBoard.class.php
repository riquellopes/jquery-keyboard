<?php
/**
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
	
	
	public function __construct($hash=null){
		if( array_key_exists($hash, array(self::MD5, self::SHA1))){
			$this->hash = $hash
		}
	}
	
	/**
	 * Method define value of attribute $passWordBd::
	 * 
	 * @param hash $value
	 * @access public
	 * @return VirtualKeyBoard
	 */
	public function setPassWordBD($value){
		$this->passWordBd = $value;
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
		$this->obfuscatedPass = $value;
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
		
	}
}