"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.lazyload')
    

    const loadImg = (image) => {
        if(image.tagName === 'IMG'){
            image.src = image.getAttribute('data-src') 
        } else if (image.tagName === 'SOURCE'){
            image.srcset = image.getAttribute('data-src') 
        } 
    }

    const checkCenter = () => {
        const screenBottom =  window.innerHeight + window.scrollY
        images.forEach((e) => {

            if(e.getBoundingClientRect().y < screenBottom) {
                loadImg(e)
            }

        })
    }

    checkCenter()
    
    document.addEventListener('scroll', () => {
        checkCenter()
    })
})



