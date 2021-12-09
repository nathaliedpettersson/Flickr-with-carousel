// Vår sök-knapp
const btn = document.querySelector('button');
// Inner-div för bootstrap carousel
const carouselInnerParent = document.querySelector('.carousel-inner');

// Gör knapp klickbar & tar bort föregående bilder vi sökt på när vi väljer att söka på något nytt
btn.addEventListener('click', function () {
    const txtInput = document.getElementById('search');
    const numInput = document.getElementById('amount');

    const divEl = document.querySelectorAll('.carousel-item');
    for (let i = 0; i < divEl.length; i++) {
        const el = divEl[i];
        el.remove();
    }

    setMessage("I am working on it...");

    // Storlek för bilderna i bildspelet
    let sizeOptions = document.getElementById('size');
    let size = sizeOptions.value;
    const carouselWrapper = document.querySelector('.carousel');

    if (size === "m") {
        carouselWrapper.style.width = "25vw";
    } else if (size === "z") {
        carouselWrapper.style.width = "45vw";
    } else {
        carouselWrapper.style.width = "65vw";
    }

    // Sänd input-value till funktionen SearchFlickr
    searchFlickr(txtInput.value, numInput.value);

});

// I searchFlickr tar vi user-inputen och addar till url. Sen gör vi en fetch för att få tillbaka JSON-data
// Ett error-meddelande är tillagt till användaren om det skulle vara något fel på vår länk etc.
function searchFlickr(searchText, numOfPics) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c45ec57af53c8fee515b538828e76f8&text=${searchText}&per_page=${numOfPics}&format=json&nojsoncallback=1&sort=relevance&accuracy=1`;

    fetch(url).then(
        function (response) {
            return response.json();
        }
    ).then(
        function (data) {
            getImageUrl(data);

            const h3 = document.querySelector("#message");
            h3.style.display = "none";
        }
    ).catch(
        function (error) {
            const h4 = document.createElement('h4');
            h4.innerText = 'Something is fishy here, try to reload the page or search for something else. The link might also be broken :('
            h4.style.color = 'white';
            h4.style.textAlign = 'center';
            document.body.appendChild(h4);
        }
    );
}

// Skapar en array med bilder som vi vill visa beroende på hur många bilder användaren väljer
function getImageUrl(photoObject) {
    let json = photoObject;
    let sizeOptions = document.getElementById('size');
    let size = sizeOptions.value;

    for (let i = 0; i < (json.photos.photo).length; i++) {
        let imgUrl = `https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`;

        displayImg(imgUrl);

    }

    carouselInnerParent.querySelector('.carousel-item').classList.add('active');
}

function displayImg(url) {
    const img = document.createElement('img');
    img.src = url;
    img.classList.add("d-block", "w-100");

    // Div som är runt vårt bildspel, items som appliceras till div:en och bilder som läggs till i div:en
    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add("carousel-item");
    carouselItemDiv.appendChild(img);
    carouselInnerParent.appendChild(carouselItemDiv);

}

function setMessage(message) {
    const h3 = document.querySelector("#message");
    h3.style.display = "block";
    h3.innerText = message;

    animation.play();
}

const animation = anime({
    targets: document.querySelector("#message"),
    color: '#F27B50',
    rotate: '360deg',
    scale: 1.5,
    duration: 2000,
})