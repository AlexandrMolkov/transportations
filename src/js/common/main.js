import '../libs/swiper-bundle.min.js'

    
window.addEventListener("load", (e) => {
/*     document.querySelector('.hero')?.classList.add('animate')
    document.querySelector('.hero__item-image')?.classList.add('animate') */
})

const swiper = new Swiper('.main-slider__swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 300,

    navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
    },
})
