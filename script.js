// Met voorbeeld van AI 
// prompt: I want the user to be able to freely turn this bookshelf around by mousegrabbing. - (met code)
const bookshelf = document.querySelector('.bookshelf');

let isDragging = false;

let rotateX = 5;
let rotateY = 15;

let prevMouseX = 0;
let prevMouseY = 0;

let scale = window.innerWidth < 600 ? 0.5 : 1;

// scale shelf when screen is smaller
// window.addEventListener('resize', () => {
//     scale = window.innerWidth < 600 ? 0.5 : 1;
//     updateRotation();
// })

function isMobile() {
    return window.innerWidth < 600;
}

// set default rotation of mobile version
function setRotation() {
    if (isMobile()) {
    rotateX = 0;
    rotateY = 0;
    } else {
        rotateX = 5;
        rotateY = 15;
    }

    updateRotation();
}

setRotation();

window.addEventListener("resize", setRotation);

function updateRotation() {
    bookshelf.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

bookshelf.addEventListener('mousedown', (event) => {
    if (isMobile()) return;
    
    isDragging = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
});

document.addEventListener('mouseup', (event) => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    if (isMobile()) return;
    
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // rotate freely
    rotateY += deltaX * 0.15;
    rotateX -= deltaY * 0.15;

    updateRotation();

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
});
updateRotation();

const openBook = document.querySelector('.detail-book');
// opens corrosponding book
document.addEventListener('click', (event) => {
    const clickedBook = event.target.closest('.book');
    if(!clickedBook) return;

    const bookId = clickedBook.dataset.book;

    document.querySelectorAll('.detail-book').forEach(book => book.classList.remove('active'));

    const selectedBook = document.querySelector(`.detail-book[data-book=${bookId}]`);
    selectedBook.classList.add('active');
});

document.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        openBook.classList.remove('active');
    }
})

// flipped pages
// https://codepen.io/captain_anonym0us/pen/ybVbpv?editors=0010
function initPages() {
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
    });
}