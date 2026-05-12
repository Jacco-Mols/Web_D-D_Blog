// Met voorbeeld van AI 
// prompt: I want the user to be able to freely turn this bookshelf around by mousegrabbing. - (met code)
const bookshelf = document.querySelector('.bookshelf');

let isDragging = false;

let rotateX = 5;
let rotateY = 5;

let prevMouseX = 0;
let prevMouseY = 0;

bookshelf.addEventListener('mousedown', (event) => {
    isDragging = true;

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
});

document.addEventListener('mouseup', (event) => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // rotate freely
    rotateY += deltaX * 0.15;
    rotateX -= deltaY * 0.15;

    updateRotation();

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
});

function updateRotation() {
    bookshelf.style.transform =
    `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    `;
}


// flipped pages
// https://codepen.io/captain_anonym0us/pen/ybVbpv?editors=0010
const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
    if (index % 2 === 0) {
        page.style.zIndex = pages.length - index;
    };

    page.pageNum = index + 1;

    page.addEventListener('click', function () {
        if (this.pageNum % 2 === 0) {
            this.classList.remove('flipped');
            this.previousElementSibling?.classList.remove('flipped');
        } else {
            this.classList.add('flipped');
            this.nextElementSibling?.classList.add('flipped');
        }
    })
})