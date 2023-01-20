document.querySelectorAll(`.burg`)
    .forEach( b => {
        const inner = document.createElement('div')
        inner.classList.add('burg__icon')
        //b.append(document.createElement('span'))
        b.append(inner)
        document.querySelector(b.dataset.target).classList.add(`nav-burg`)

        b.addEventListener('click', (e) => {
            if(e.target.closest('.burg')) {
                const burg = e.target.closest('.burg')
                burg.classList.toggle(`open`)
                document.querySelector(burg.dataset.target).classList.toggle(`show`)
                if (document.querySelector(burg.dataset.target).classList.contains(`show`))
                {
                    document.body.classList.add(`lock`)
                } else{
                    document.body.classList.remove(`lock`)
                }

                
            }
        })
    })