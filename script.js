let searchInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");

async function searchWiki() {

    let query = searchInput.value.trim();

    if (query === "") {
        alert("Please enter a topic");
        return;
    }

    let encodedQuery = encodeURIComponent(query);

    let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`;

    try {

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("No data found");
        }

        let data = await response.json();

        let image = "";

        if (data.thumbnail) {
            image = `
                <img src="${data.thumbnail.source}" alt="${data.title}">
            `;
        }

        result.innerHTML = `
            <h2>${data.title}</h2>
            ${image}
            <p>${data.extract}</p>
            <br>
            <a href="${data.content_urls.desktop.page}" target="_blank">
                Read Full Article
            </a>
        `;

    } catch (error) {

        result.innerHTML = `
            <h2>No Results Found</h2>
            <p>Please try another search term.</p>
        `;
    }
}

searchBtn.addEventListener("click", searchWiki);

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchWiki();
    }
});
