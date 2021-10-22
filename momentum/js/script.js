const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const slidePrevBtn = document.querySelector('.slide-prev');
const slideNextBtn = document.querySelector('.slide-next');

let indexOfBg;


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    const timeOfDay=`Good ${getTimeOfDay(date.getHours())},`;
    greeting.textContent=timeOfDay;
    setTimeout(showTime, 1000);
}

function showDate() {
    const objDate = new Date();
    const options = {weekday:'long',month: 'long', day: 'numeric'};
    const currentDate = objDate.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
}

function getTimeOfDay(hours){
    let timeOfDay=['morning','day', 'evening', 'night'];
    if(hours>=6 && hours<12) return timeOfDay[0];
    else if(hours>=12 && hours<18)return timeOfDay[1];
    else if(hours>=18) return timeOfDay[2];
    else if(hours>=0 && hours>6) return timeOfDay[3];
}

function setUserName(){
    userName.value=this.value.trim();
    setLocalStorage('userName',userName.value);
}

function setLocalStorage(key,value) {
    localStorage.setItem('name', userName.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) userName.value = localStorage.getItem('name');
}

function setBg(bgNum,timeOfDay=getTimeOfDay((new Date).getHours())){

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/tantality/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
    console.log(img.src);
    img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
    // document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/tantality/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`;
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum=Math.floor(Math.random() * (max - min + 1)) + min;
    indexOfBg=randomNum;
    return String(randomNum).padStart(2,'0');

}

function getSlideNext(){
    indexOfBg==20?indexOfBg=1:++indexOfBg;
    setBg(String(indexOfBg).padStart(2,'0'));
}


function getSlidePrev(){
    indexOfBg==1?indexOfBg=20:--indexOfBg;
    setBg(String(indexOfBg).padStart(2,'0'));
}


  showTime();
  slidePrevBtn.addEventListener('click',getSlidePrev);
  slideNextBtn.addEventListener('click',getSlideNext);
  userName.addEventListener('input',setUserName);
  window.addEventListener('load', getLocalStorage);

  setBg(getRandomNum(1,20));