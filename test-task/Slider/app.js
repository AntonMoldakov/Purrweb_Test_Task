function setPosition(position) {
    track.style.transform = `translateX(${position}px)`
    activeDots();
}

function slideMoving() {
    if (position !== positionDesired) {
        position += difference;
        setPosition(position);
    } else {
        clearInterval(movingInterval);
        enabledButton();
    }
}

let movingBeyondTheExtremeSlide = () => {
    return new Promise(function(resolve, reject) {
        disabledButton();
        difference = (positionDesired - position) / 50;
        movingInterval = setInterval(()=>{
            if (position !== positionDesired) {
                position += difference;
                setPosition(position);
            } else {
                clearInterval(movingInterval);
                enabledButton();
                resolve("done!");
            }
        }, speedMoving);

    })
}


function calculateMoving() {
    disabledButton();
    difference = (positionDesired - position) / 50;
    movingInterval = setInterval(slideMoving, speedMoving);
}

function disabledButton() {
    btnPrev.setAttribute("disabled", "disabled");
    btnNext.setAttribute("disabled", "disabled");
    for (let dotBtn of dotsBtn) {
        dotBtn.setAttribute("disabled", "disabled");
    }
}

function enabledButton() {
    btnPrev.removeAttribute("disabled");
    btnNext.removeAttribute("disabled");
    for (let dotBtn of dotsBtn) {
        dotBtn.removeAttribute("disabled");
    }
}

function activeDots () {
    dots[activeDot].classList.remove("active");
    activeDot = (activeSlide - 1);
    dots[activeDot].classList.add("active");
}

const container = document.getElementById('slider');
const track = document.getElementById('slider__track');
const item = document.getElementById('slider__item');
const items = document.querySelectorAll("#slider__item");
const btnPrev = document.getElementById('prev-btn');
const btnNext = document.getElementById('next-btn');
let dotsContainer = document.querySelector("#dotsContainer");

const itemsCount = track.querySelectorAll("#slider__item").length;
const itemWidth = item.offsetWidth;

let position = -itemWidth ;
let activeSlide = 1;
let activeDot = (activeSlide - 1);
let positionDesired = position;
const slidesToShow = 1;
const slidesToScroll = 1;
const speedMoving = 10;
let difference = 0;
let animationInterval;

track.style.transform = `translateX(${position}px)`


let x = itemsCount -1;
let firstClone = items[0].cloneNode(true);
let lastClone = items[x].cloneNode(true);
track.append(firstClone);
track.prepend(lastClone);

for (let i = 1; i <= x; i++) {
    const copyDots = document.querySelector("#dot").cloneNode(true);
    copyDots.id ='dot ' + 'dot_' + i;
    dotsContainer.append(copyDots);
}

const dots = dotsContainer.querySelectorAll(".dot");
const dotsBtn = document.querySelectorAll('#dotBtn');
activeDots();

btnPrev.addEventListener('click', function () {
    if (activeSlide === 1) {
        positionDesired += itemWidth;

        movingBeyondTheExtremeSlide().then((resolve)=>{
            positionDesired = -(itemsCount * itemWidth);
            position = positionDesired;
            activeSlide = itemsCount;
            setPosition(position);
        })
    } else {
        positionDesired += itemWidth;
        activeSlide--;
        calculateMoving();
    }
});

btnNext.addEventListener('click', function () {
    if (activeSlide === itemsCount) {
        positionDesired -= itemWidth;

        movingBeyondTheExtremeSlide().then((resolve)=>{
            positionDesired = -itemWidth;
            position = positionDesired;
            activeSlide = 1;
            setPosition(position);
        })
    } else {
        positionDesired -= itemWidth;
        activeSlide++;
        calculateMoving();
    }
});

dotsBtn.forEach((dotBtn, index) => {
    dotBtn.addEventListener('click', () => {
        let n = index + 1;
        positionDesired = -itemWidth * n;
        activeSlide = n;
        calculateMoving();
    });
})
