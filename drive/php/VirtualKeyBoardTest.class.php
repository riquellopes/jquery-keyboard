<?php
require_once('VirtualKeyBoard.class.php');

class VirtualKeyBoardTest extends PHPUnit_Framework_TestCase{
	
	/**
	 * @expectedException InvalidArgumentException 
	 */
	public function test_construct_should_be_accept_2_hash(){
		new VirtualKeyBoard(4);
	}
	
	public function test_process(){
		$v = new VirtualKeyBoard(VirtualKeyBoard::MD5);
		$v->setPassWordBD('e10adc3949ba59abbe56e057f20f883e')
		  ->setObfuscatedPass('1,3@@2,6@@3,2@@6,4@@7,5@@6,5');
		
		$this->assertTrue($v->Ok());
	}
}