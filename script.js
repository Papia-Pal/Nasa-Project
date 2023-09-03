// api key required
let api_key = "vPHOqlV7gxIHAa4Y2IfjxBYgmSOy5VT5np6eDmtn";

// current date of the day
const currentDate = new Date().toISOString().split("T")[0];
// validation for input field of date
document.getElementById("search-input").setAttribute('max', `${currentDate}`);

// elements for the img Container
let currentImgContainer = document.getElementById("current-image-container");
let title = document.createElement('h1');
let imgContainer = document.createElement('div');
imgContainer.setAttribute('id', 'img-container');
let img = document.createElement('img');
let img_desc = document.createElement('h3');
let description = document.createElement('p');
let iframe = document.createElement('iframe');

// function to get the image of today
function getCurrentImageOfTheDay(){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${currentDate}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        title.innerHTML = "NASA picture of the Day";
        if(!(data.url.includes("video"))){
            img.src = data.url;
            imgContainer.appendChild(img);
        } else {
            video.src = data.url;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            imgContainer.appendChild(video);
        }
        
        img_desc.innerHTML = data.title;
        description.innerHTML = data.explanation;      
        currentImgContainer.append(title, imgContainer, img_desc, description);
    })
    .catch((err) => {
        console.log(err);
    })
}

// function to get the image of the day according to date.
function getImageOfTheDay(event) {
    console.log(currentImgContainer);
    let date;
    if(event.target.value == "Search"){
        date = document.getElementById('search-input').value;
    } else {
        date = event.target.innerHTML;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        title.innerHTML = `Picture on ${date}`;
        if(!(data.url.includes("video"))){
            img.src = data.url;
            imgContainer.appendChild(img);
        } else {
            iframe.src = data.url;
            iframe.frameBorder = "0";
            imgContainer.removeChild(img);
            imgContainer.appendChild(iframe);
        }
        img_desc.innerHTML = data.title;
        description.innerHTML = data.explanation;      
        currentImgContainer.append(title, imgContainer, img_desc, description);
    })
    .catch((err) => {
        console.log(err);
    })
    if(event.target.value == "Search"){
        saveSearch(date);
    }
    event.preventDefault();
}

// function to save the data in local storage
let history = JSON.parse(localStorage.getItem('History')) || [];
function saveSearch(date){
    history.push({date: `${date}`});
    localStorage.setItem("History", JSON.stringify(history));
    addSearchToHistory();
}

// function to save the data in History
function addSearchToHistory(){
    let searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = "";
    history.forEach((item) => {
        let li = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', "#");
        anchor.innerHTML = item.date;
        li.appendChild(anchor);
        searchHistory.appendChild(li);
    });
    let searchList = document.querySelectorAll('#search-history>li>a');
    searchList.forEach((item) => {
        item.addEventListener('click', getImageOfTheDay);
    });
}

// program start from here
document.getElementById('search').addEventListener('click', getImageOfTheDay);

// function calls when page loads.
window.addEventListener('load', getCurrentImageOfTheDay);
window.addEventListener('load', addSearchToHistory);