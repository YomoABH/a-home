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
				arrows: false,
				dots: true
			}
		}
	]
});