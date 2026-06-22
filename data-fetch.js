async function jsonContent() {
    const response = await fetch("/data/data.json");
    const data = await response.json();

    const bookElements = document.querySelectorAll(".book");

    bookElements.forEach(el => {
        el.addEventListener("click", () => {
            const bookType = el.dataset.book;
            const bookData = data[bookType];
            if (!bookData) return console.log("Coming soon");

            const pagesContainer = document.querySelector(`.detail-book[data-book="${bookType}"] .pages`);

            if (!pagesContainer) {
                console.log("No container found for", bookType);
                return;
            }
            
            console.log("html", pagesContainer)
            console.log("clicked book data", bookData)

            let pagesHTML = `<div class="page"><h3>${bookData.title}</h3></div>`;

            bookData.pages.forEach(page => {
                pagesHTML += `<div class="page">`;

                if (page.heading) {
                    pagesHTML += `<h4>${page.heading}</h4>`;
                }
                if (page.type === "text") {
                    pagesHTML += `<p>${page.content}</p>`;
                }
                if (page.type === "image" || page.image || page.src) {
                    pagesHTML += `<img src="${page.src || page.image}">`;
                }
                if (page.type === "link") {
                    pagesHTML += `<a href="${page.href}" target="_blank"><p>${page.label}</p></a>`;
                }
                pagesHTML += `</div>`;
            });
            console.log(pagesHTML);
            pagesContainer.innerHTML = pagesHTML;
            console.log("hi", document.querySelector('.detail-book.active'))
            initPages();

        });
    });
}

jsonContent();