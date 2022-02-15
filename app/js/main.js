$('.main-slider__items').slick({
	autoplay: true,
	autoplaySpeed: 6000,
	infinite: true,
	speed: 1000,
	fade: true,
	cssEase: 'linear',
	responsive: [
		{
			breakpoint: 575,
			settings: {
				autoplay: true,
				autoplaySpeed: 6000,
				infinite: true,
				dots: true
			}
		}
	]
});

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		menuBody.classList.toggle('_active');
		iconMenu.classList.toggle('_active');
	});
}


$(document).ready(function () {
	$('.btn-modal').on('click', function () {
		$('.overline,  #consultation').fadeIn(400);
	});

	$('.modal__close').on('click', function () {
		$('.overline, #consultation').fadeOut(300);
	});

});

jQuery(function ($) {
	$("#userNumberPhone").mask("+7 (999) 999-99-99");
});



$(document).ready(function () { // вся магия после загрузки страницы
	$("#form").submit(function () { // перехватываем все при событии отправки
		var form = $(this); // запишем форму, чтобы потом не было проблем с this
		var error = false; // предварительно ошибок нет
		form.find('input').each(function () { // пробежим по каждому полю в форме
			if ($(this).val() == '') { // если находим пустое
				alert('Заполните поле "' + $(this).attr('placeholder') + '"!'); // говорим заполняй!
				error = true; // ошибка
			}
		});
		if (!error) { // если ошибки нет
			var data = form.serialize(); // подготавливаем данные
			$.ajax({ // инициализируем ajax запрос
				type: 'POST', // отправляем в POST формате, можно GET
				url: 'mailsend.php', // путь до обработчика, у нас он лежит в той же папке
				dataType: 'json', // ответ ждем в json формате
				data: data, // данные для отправки
				beforeSend: function (data) { // событие до отправки
					form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
				},
				success: function (data) { // событие после удачного обращения к серверу и получения ответа
					if (data['error']) { // если обработчик вернул ошибку
						alert(data['error']); // покажем её текст
					} else { // если все прошло ок
						alert('Письмо отвравлено! Чекайте почту! =)'); // пишем что все ок
					}
				},
				error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
					alert(xhr.status); // покажем ответ сервера
					alert(thrownError); // и текст ошибки
				},
				complete: function (data) { // событие после любого исхода
					form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
				}

			});
		}
		return false; // вырубаем стандартную отправку формы
	});
});