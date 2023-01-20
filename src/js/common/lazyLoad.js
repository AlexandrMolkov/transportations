"use strict"

const images = document.querySelectorAll('.lazyload')

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function handleImg(myImg, observer) {
    myImg.forEach(img=>{
        if(img.intersectionRatio > 0) {
            loadImg(img.target)
        }
    })
}
function loadImg(image){
    if(image.tagName === 'IMG'){
        image.src = image.getAttribute('data-src') 
    } else if (image.tagName === 'SOURCE'){
        image.srcset = image.getAttribute('data-src') 
    }
    
}
const observer = new IntersectionObserver(handleImg, options)

images.forEach( img => {
    observer.observe(img)
})

