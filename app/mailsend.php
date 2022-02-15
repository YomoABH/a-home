<?php
if ($_POST) { // если передан массив POST
	$name = htmlspecialchars($_POST["name"]); // пишем данные в переменные и экранируем спецсимволы
	$phone = htmlspecialchars($_POST["phone"]);
	$address = htmlspecialchars($_POST["address"]);
	$json = array(); // подготовим массив ответа
	if (!$name or !$phone or !$address) { // если хоть одно поле оказалось пустым
		$json['error'] = 'Вы заполнили не все поля! Обмануть решили? =)'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа 
		die(); // умираем
	}
	if(!preg_match("~\+7\(940\)\d{7}~", $phone)) { // проверим номер на валидность
		$json['error'] = 'Неверный формат номера телефона!'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа
		die(); // умираем
	}
	
	if( strlen($name) < 3 || strlen($name) > 40 ) { // проверим номер на валидность
		$json['error'] = 'Неверный формат ФИО!'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа
		die(); // умираем
	}

	if( strlen($address) < 3 || strlen($address) > 40 ) { // проверим номер на валидность
		$json['error'] = 'Неверный формат адреса!'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа
		die(); // умираем
	}	

	function mime_header_encode($str, $data_charset, $send_charset) { // функция преобразования заголовков в верную кодировку 
		if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
	}
	/* супер класс для отправки письма в нужной кодировке */
	class TEmail {
	public $from_email;
	public $from_name;
	public $to_email;
	public $to_name;
	public $subject;
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/plain';

	function send(){
		$dc=$this->data_charset;
		$sc=$this->send_charset;
		$enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
		$enc_subject=mime_header_encode($this->subject,$dc,$sc);
		$enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
		$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
		$headers='';
		$headers.="Mime-Version: 1.0\r\n";
		$headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
		$headers.="From: ".$enc_from."\r\n";
		return mail($enc_to,$enc_subject,$enc_body,$headers);
	}

	}

	$emailgo= new TEmail; // инициализируем супер класс отправки
	$emailgo->from_email= 'info@a-home.biz'; // от кого
	$emailgo->from_name= 'Заявка с сайта';
	$emailgo->to_email= 'akop.avdzhyan@a-mobile.biz'; // кому
	$emailgo->to_name= 'Заявка с сайта';
	$emailgo->subject= "Заявка на подключение"; // тема
	$emailgo->body= "ФИО: $name\r\nНомер телефона: $phone\r\nАдрес: $address\r\n"; // сообщение
	$emailgo->send(); // отправляем

	$json['error'] = 0; // ошибок не было

	echo json_encode($json); // выводим массив ответа
} else { // если массив POST не был передан
	echo 'GET LOST!'; // высылаем
}
?>