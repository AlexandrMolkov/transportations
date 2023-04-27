import '../libs/swiper-bundle.min.js'

const swiper = new Swiper('.main-slider__swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 600,
    parallax: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        stopOnLastSlide: false,
    },
    navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
    },
    
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },
    },
})


const anchors = document.querySelectorAll('a[href*="#main-slider"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substring(1)
    console.log(blockID)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}



window.addEventListener('resize', () =>  {
  if(window.innerWidth > 767) {
    document.body.classList.remove(`lock`)
    document.querySelector(document.querySelector(`.burg`).dataset.target).classList.remove(`show`)
    document.querySelector(`.burg`).classList.remove(`open`)
  }
});