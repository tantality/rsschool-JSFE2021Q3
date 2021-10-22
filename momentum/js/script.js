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
const changeQuoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


let indexOfBg;
let indexOfQuote;
let f=true;

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
    else if(hours>=0 && hours<6) return 'night';
}


function setUserName(){
    userName.value=this.value.trim();
    setLocalStorage('userName',userName.value);
}


function setCity(){
    city.value=this.value;
    if(city.value.charAt(city.value.length - 1)!=='' || city.value.charAt(0)==city.value.charAt(city.value.length - 1) ) getWeather();
}


function setLocalStorage(key,value) {
    localStorage.setItem(key, value);
}


function getLocalStorage() {
    if(localStorage.getItem('userName')) userName.value = localStorage.getItem('userName');
    if(localStorage.getItem('city')) city.value = localStorage.getItem('city');
    else city.value='Minsk';
    if(localStorage.getItem('indexOfBg')) indexOfBg = localStorage.getItem('indexOfBg');
    if(localStorage.getItem('indexOfQuote')) indexOfQuote = localStorage.getItem('indexOfQuote');
}


function setBg(bgNum,timeOfDay=getTimeOfDay((new Date).getHours())){
    indexOfBg=bgNum;
    setLocalStorage('indexOfBg',bgNum);
    bgNum=String(bgNum).padStart(2,'0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/tantality/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
    img.onload = () =>  document.body.style.backgroundImage = `url(${img.src})`;
}


function getRandomNum(min, max,value) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum;
    do{
        randomNum=Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while(randomNum==value);
    return randomNum;
}


function getSlideNext(){
    indexOfBg==20?indexOfBg=1:++indexOfBg;
    setBg(indexOfBg);
}


function getSlidePrev(){
    indexOfBg==1?indexOfBg=20:--indexOfBg;
    setBg(indexOfBg);
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
    let data;
    try{
        if(isEmpty(city.value)){
            setLocalStorage('city','Minsk');
            throw new Error('Error! Nothing to geocode.');
        }   
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        const res = await fetch(url);
        if(res.status=='404' && !isEmpty(city.value)) throw new Error(`Error! city not found for '${city.value}'.`);
        else f=true;
        data = await res.json(); 
    }
    catch(err){
        hideContent();
        weatherError.textContent=err.message; 
        f=false;
    }
    if(f!=false){
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherError.textContent='';
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
        setLocalStorage('city',trimStr(city.value));
        setTimeout(getWeather,60000);
    }; 
  }

  async function getQuotes() {  
    const quotes =  "./js/quotes.json";
    const res = await fetch(quotes);
    const data = await res.json(); 
    return Promise.resolve(data.quotes);
  }

 function setAuthorAndQuotes() {
    let randomNum=getRandomNum(0, 100,indexOfQuote);
    indexOfQuote=randomNum;
    setLocalStorage('indexOfQuote',indexOfQuote);
    getQuotes().then(val=>{
        quote.textContent=`"${val[randomNum].quote}"`;
        author.textContent=val[randomNum].author;
    });
  }

  getQuotes();
  showTime();
  setAuthorAndQuotes();
  slidePrevBtn.addEventListener('click',getSlidePrev);
  slideNextBtn.addEventListener('click',getSlideNext);
  changeQuoteBtn.addEventListener('click',setAuthorAndQuotes);
  userName.addEventListener('input',setUserName);
  city.addEventListener('input',setCity);
  getLocalStorage();
  getWeather();
  
  setBg(getRandomNum(1,20,indexOfBg));