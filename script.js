// import { secrets } from "./secrets.js"

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
// const apiKey = secrets["apiKey"];
const apiKey = "h4VA-POYmg5AVp4hnRjw9hbwOUyRd06_DF2AIjVXmJo"; // If I was hosting somewhere besides GitHub pages, I'd leave this as a secret...
const content_filter = 'high';

// function getTopicId() {
//     const topicUrl = `https://api.unsplash.com/topics/nature?client_id=${apiKey}`;
//     const topic = fetch(topicUrl).then(res => res.json());
//     console.log(topic)
//     return topic;
// }

const topicId = "6sMVjTLSkeQ" // nature topic ID
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&topics=${topicId}&content_filter=${content_filter}`;

// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}

// Display elements for images, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to photo
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description,
        });
        // Event Listener to see when loading is finished
        img.addEventListener('load', imageLoaded);
        // Put <img> in <a>, then add to container.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    photosArray = await fetch(apiUrl)
        .then(res => res.json());
    displayPhotos();
}

// Check to see if scrolling is close to bottom of page
window.addEventListener('scroll', () => {
    if (ready && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000)) {
        getPhotos();
        loader.hidden = false;
        ready = false;
    }
})

getPhotos();