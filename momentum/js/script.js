const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const slidePrevBtn = document.querySelector('.slide-prev');
const slideNextBtn = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


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


function setCity(){
    city.value=this.value;
    if(city.value.charAt(city.value.length - 1)!==' ' && city.value.length!=1)getWeather();
}


function setLocalStorage(key,value) {
    localStorage.setItem(key, value);
}


function getLocalStorage() {
    if(localStorage.getItem('userName')) userName.value = localStorage.getItem('userName');
    if(localStorage.getItem('city')) city.value = localStorage.getItem('city');
}


function setBg(bgNum,timeOfDay=getTimeOfDay((new Date).getHours())){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/tantality/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
    console.log(img.src);
    img.onload = () =>  document.body.style.backgroundImage = `url(${img.src})`;
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


function isEmpty(str) {
    return str.trim()=='';
}


function trimStr(str) {
    return str.trim();
}


function  hideContent() {
    weatherIcon.classList.remove(weatherIcon.classList.item(2));
    temperature.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
    weatherDescription.textContent=''; 
}

async function getWeather(c) {  
    if(c=='load') getLocalStorage(c);
    let data;
    try{
        if(isEmpty(city.value)){
            setLocalStorage('city','Minsk');
            throw new Error('Error! Nothing to geocode.');
        }   
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        const res = await fetch(url);
        if(res.status=='404') throw new Error(`Error! city not found for '${city.value}.`);
        data = await res.json(); 
    }
    catch(err){
        hideContent();
        weatherError.textContent=err.message; 
    }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent='';
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
    setLocalStorage('city',trimStr(city.value));
    setTimeout(getWeather,60000);
  }

  getWeather('load');
  showTime();
  slidePrevBtn.addEventListener('click',getSlidePrev);
  slideNextBtn.addEventListener('click',getSlideNext);
  userName.addEventListener('input',setUserName);
  city.addEventListener('input',setCity);
  
  setBg(getRandomNum(1,20));