import playList from './playList.js';

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
const playListContainer = document.querySelector('.play-list');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const volumeBtn = document.querySelector('.volume');
let songTitle= document.querySelector('.player-song-title');
let durationInfo = document.querySelector('.time__duration');
let audioCurrentTime = document.querySelector('.time__current-time');
let audioDurationProgress=document.querySelector('.controls__duration');
let audioVolumeProgress=document.querySelector('.controls__volume');

const audio=new Audio();


let indexOfBg;
let indexOfQuote;
let f=true;
let numOfCurrentAudio=0;
let numOfPrevAudio=0;
let currentAudioTime=0;
let isPlay=false;
let volumeValue=0.3;
// let volumeValue=audio.value;

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


  function generatePlaylist(params) {
    playList.forEach(sound=>{
        const li=document.createElement('li');
        li.classList.add('play-item');
        li.textContent=sound.title;
        playListContainer.append(li);
    });
  }

  
  function togglePlayPrev(){
      numOfPrevAudio=numOfCurrentAudio;
      if(numOfCurrentAudio==0) numOfCurrentAudio= playList.length-1;
      else --numOfCurrentAudio;
      editProgressBar(audioDurationProgress,0);
      editProgressBar(audioVolumeProgress,audio.volume);
      volumeValue=audio.volume;
      togglePlay();      
  }


  function togglePlayNext(){
    numOfPrevAudio=numOfCurrentAudio;
    if(numOfCurrentAudio==playList.length-1) numOfCurrentAudio=0;
    else ++numOfCurrentAudio;
    editProgressBar(audioDurationProgress,0);
    editProgressBar(audioVolumeProgress,audio.volume);
    volumeValue=audio.volume;
    togglePlay();
}


  function togglePlay(e){
     setCurrentAudio(); 
      if(e!==undefined){
        if(!isPlay){
            isPlay=true;
            audio.play();       
        }     
          else{
              isPlay=false;
              audio.currentTime=audio.currentTime;
              audio.pause();
        }
        playBtn.classList.toggle('pause');
        if(numOfPrevAudio==numOfCurrentAudio)  audio.currentTime=currentAudioTime;
        numOfPrevAudio=numOfCurrentAudio;
      }
      else if(isPlay) audio.play();
  }


  function setCurrentAudio(){
    playListContainer.children[numOfPrevAudio].classList.remove('item-active');
    playListContainer.children[numOfCurrentAudio].classList.add('item-active');
    audio.src=playList[numOfCurrentAudio].src;
    audio.volume=volumeValue;
    songTitle.innerHTML=playList[numOfCurrentAudio].title;
    durationInfo.textContent=playList[numOfCurrentAudio].duration;
  }


  function audioTime(e){
    if(e!==undefined && e.currentTarget.tagName!=='AUDIO'){
     let value=e.currentTarget.value;
     if(value!=null && !isNaN(value))  audio.currentTime=parseFloat(value*audio.duration);
    }
    audioCurrentTime.innerHTML=setTime(audio.currentTime);
    let audioProgress=audio.currentTime/ audio.duration;
    if(!isNaN(audioProgress))editProgressBar(audioDurationProgress,audioProgress);
    currentAudioTime=audio.currentTime;
    if(audio.ended) togglePlayNext();
}

function setTime(time){
    let mins=Math.floor(time/60);
    let secs=Math.floor(time-mins*60);
    if(secs<10)secs='0'+secs;
    return mins+':'+secs;
}


function editProgressBar(progressBar,value){
    progressBar.value=value;
    if(progressBar.target) {
        volumeValue=audio.volume;
        audio.volume=progressBar.currentTarget.value;
        editVolumeProgressBar();
    }
    fillProgressBar(progressBar);
}



function toggleVolume(){
    volumeBtn.classList.toggle('volume-mute');
    volumeBtn.classList.toggle('volume');
    if(volumeBtn.classList.contains('volume-mute')){
        volumeValue=audio.volume;
        audio.volume=0;
    }
    else audio.volume=volumeValue;
    editProgressBar(audioVolumeProgress,audio.volume);
}

function editVolumeProgressBar(){
    if(audio.volume==0) {
        volumeBtn.classList.remove('volume')
        volumeBtn.classList.add('volume-mute');
    }
    else {
        volumeBtn.classList.remove('volume-mute')
        volumeBtn.classList.add('volume');
    }
}

function fillProgressBar(progressBar){
    if(progressBar.type=='input') progressBar=progressBar.currentTarget;
    const value= progressBar.value*100;
    progressBar.style.background = `linear-gradient(to right, rgba(197,179,88,.8) 0%, rgba(197,179,88,.8) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}


  generatePlaylist();
  setCurrentAudio();
  getQuotes();
  showTime();
  setAuthorAndQuotes();
  slidePrevBtn.addEventListener('click',getSlidePrev);
  slideNextBtn.addEventListener('click',getSlideNext);
  playBtn.addEventListener('click',togglePlay);
  playPrevBtn.addEventListener('click',togglePlayPrev);
  playNextBtn.addEventListener('click',togglePlayNext);
  changeQuoteBtn.addEventListener('click',setAuthorAndQuotes);
  userName.addEventListener('input',setUserName);
  city.addEventListener('input',setCity);
  getLocalStorage();
  getWeather();
  
  setBg(getRandomNum(1,20,indexOfBg));
  audio.addEventListener('timeupdate',audioTime);
  audioDurationProgress.addEventListener('input', audioTime);
  audioVolumeProgress.addEventListener('input',editProgressBar);
  volumeBtn.addEventListener('click', toggleVolume);
  audio.addEventListener('loadedmetadata', function() {
    editProgressBar(audioVolumeProgress,audio.volume);
});
	

console.log(`Самооценка:\n1) Часы и календарь +15\n2)Приветствие +10\n3)Смена фонового изображения +20\n4)Виджет погоды +15\n5)Виджет цитата дня +10\n6)Аудиоплеер +15\n7)Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n\n Итого: 105/150`);