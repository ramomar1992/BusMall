'use strict';

// Create a constructor
// function that creates an object associated with each product, and has the following properties:
//     Name of the product
// File path of image
// Times the image has been shown
let clickNum = 0;
let maxClicks = 25;

function ImageObj(name, source) {
    this.name = name;
    this.source = source;
    this.showTimes = 0;
    this.timesChosen = 0;
    ImageObj.list.push(this);

}
ImageObj.list = [];

new ImageObj('bag', 'imgs/bag.jpg');
new ImageObj('banana', 'imgs/banana.jpg');
new ImageObj('bathroom', 'imgs/bathroom.jpg');
new ImageObj('boots', 'imgs/boots.jpg');
new ImageObj('pet-sweep', 'imgs/pet-sweep.jpg');
new ImageObj('breakfast', 'imgs/breakfast.jpg');
new ImageObj('bubblegum', 'imgs/bubblegum.jpg');    
new ImageObj('chair', 'imgs/chair.jpg');
new ImageObj('cthulhu', 'imgs/cthulhu.jpg');
new ImageObj('dog-duck', 'imgs/dog-duck.jpg');
new ImageObj('dragon', 'imgs/dragon.jpg');
new ImageObj('pen','imgs/pen.jpg');
new ImageObj('scissors', 'imgs/scissors.jpg');
new ImageObj('shark', 'imgs/shark.jpg');
new ImageObj('tauntaun', 'imgs/tauntaun.jpg');
new ImageObj('sweep', 'imgs/sweep.png');
new ImageObj('unicorn', 'imgs/unicorn.jpg');
new ImageObj('usb', 'imgs/usb.gif');
new ImageObj('wine-glass', 'imgs/wine-glass.jpg');
new ImageObj('water-can', 'imgs/water-can.jpg');

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side - by - side - by - side in the browser window.
// For each of the three images, increment its property of times it has been shown by one.
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let img1Index;
let img2Index;
let img3Index;

function randomIndex() {
    return Math.floor(Math.random() * ImageObj.list.length);
}
function randomSet(){
    img1Index = randomIndex();
    do {
        img2Index = randomIndex();
        img3Index = randomIndex();
    } while (img1Index === img2Index || img1Index === img3Index || img2Index === img3Index);
    img1.src = ImageObj.list[img1Index].source;
    img1.alt = ImageObj.list[img1Index].name;
    img2.src = ImageObj.list[img2Index].source;
    img2.alt = ImageObj.list[img2Index].name;
    img3.src = ImageObj.list[img3Index].source;
    img3.alt = ImageObj.list[img3Index].name;
    ImageObj.list[img1Index].showTimes++;
    ImageObj.list[img2Index].showTimes++;
    ImageObj.list[img3Index].showTimes++;
}

randomSet();

// Attach an event listener to the section of the HTML page where the images are going to be displayed.
// Once the users‘ clicks’ a product, generate three new products
// for the user to pick from.
let ulObj = document.getElementById('results-list');
let actionContainer = document.getElementById('img-pool');
actionContainer.addEventListener('click', clickHandler);
function clickHandler(e) {
    if (clickNum < maxClicks) {
        randomSet();
        clickNum++;
        if (e.target.id === 'img1') {
            ImageObj.list[img1Index].timesChosen++;
        } else if (e.target.id === 'img2') {
            ImageObj.list[img2Index].timesChosen++;
        } else if (e.target.id === 'img3') {
            ImageObj.list[img3Index].timesChosen++;
        }
        
    } else {
        let imgArr = document.querySelectorAll('figure img');
        for (let i = 0; i < imgArr.length; i++) {
            document.querySelector('figure').removeChild(imgArr[i]);
        }
        let finishEl = document.createElement('p');
        finishEl.textContent = "Thank you!! That was it!";
        let figure = document.querySelector('figure');
        figure.style.width = '80%';
        figure.style.height = '50vh';
        figure.style.float = 'left';
        figure.style.backgroundColor = 'pink';
        figure.style.opacity = '0.5';
        figure.style.color = 'black'
        figure.style.fontSize = '3rem'
        figure.appendChild(finishEl);
        figure.style.display = 'flex';
        figure.style.flexDirection = 'column';
        figure.style.justifyContent = 'center';
        figure.style.alignItems = 'center';
        actionContainer.removeEventListener('click', clickHandler);
        let button = document.createElement('button');
        figure.appendChild(button);
        button.textContent = 'Show Results';
        button.addEventListener('click', viewButtonClick);
    }
    
    // console.log(ulObj);
    // let liObj;
}

function viewButtonClick(event) {
    ulObj.textContent = '';
    for (let i = 0; i < ImageObj.list.length; i++) {
        console.log(ImageObj.list[i].timesChosen);
        if (ImageObj.list[i].timesChosen > 0) {
            let liObj = document.createElement('li');
            ulObj.appendChild(liObj);
            if (ImageObj.list[i].timesChosen > 1) {
                liObj.textContent = `${ImageObj.list[i].name} had ${ImageObj.list[i].timesChosen} votes and was seen ${ImageObj.list[i].showTimes} times.`;
            } else {
                liObj.textContent = `${ImageObj.list[i].name} had ${ImageObj.list[i].timesChosen} vote and was seen ${ImageObj.list[i].showTimes} time.`;

            }
        }
    }
    e.target.removeEventListener('click', viewButtonClick);
}
