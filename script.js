const API_KEY = "1f8e8d4c90f841f59b25e476d89487fe";
// const url = "https://newsapi.org/v2/everything?q=";
const url = "https://newsapi.org/v2/everything?sortBy=publishedAt&q=";

window.addEventListener("load", () => fetchNews("Technology"));
var icon=document.getElementById("icon");
icon.onclick=function(){
    document.body.classList.toggle("darktheme");
    if(document.body.classList.contains("darktheme")){
        icon.src="sun.png";
    }
    else{
        icon.src="moon.png";
    }
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})

//chatbot

const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatCloseBtn = document.getElementById('chat-close-btn');

// Toggle chatbot visibility on chat button click
chatToggleBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'block'; // Show the chatbot
});

// Close the chatbot on close button click
chatCloseBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none'; // Hide the chatbot
});
