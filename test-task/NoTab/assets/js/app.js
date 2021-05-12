const form = document.getElementById("feedback__form");
const fields = form.querySelectorAll('.feedback__input')
const form__btn = document.getElementById("feedback__btn");


form__btn.addEventListener('click', function () {
    fields.forEach( element => {
        if(element.value !== '') {
            element.classList.remove('feedback__input-empty');
        } else {
            element.classList.add('feedback__input-empty');
        }
    })
     form.reset();
})
