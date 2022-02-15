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