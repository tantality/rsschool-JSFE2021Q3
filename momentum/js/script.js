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
    if(hours>=6 && hours<12) return 'morning';
    else if(hours>=12 && hours<18)return 'afternoon';
    else if(hours>=18) return 'evening';
    else if(hours>=0 && hours>6) return 'night';
}

function setUserName(){
    userName.value=this.value.trim();
    setLocalStorage('userName',userName.value);
}

function setLocalStorage(key,value) {
    localStorage.setItem(key, value);
}

function getLocalStorage() {
    if(localStorage.getItem('userName')) userName.value = localStorage.getItem('userName');
}

function setBg(bgNum,timeOfDay=getTimeOfDay((new Date).getHours())){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/tantality/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
    console.log(img.src);
    img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
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