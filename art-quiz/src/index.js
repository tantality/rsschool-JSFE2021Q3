import './assets/scss/styles.scss'

const settingsBtn=document.querySelector('.settings-btn');
const closeBtn=document.querySelector('.close-btn');
const settingsPage=document.querySelector('.settings-page');
const defaultSettingsBtn=document.querySelector('.default-btn');
const saveBtn=document.querySelector('.save-btn');
const addSecondsBtn=document.querySelector('.plus-time-btn');
const reduceSecondsBtn=document.querySelector('.minus-time-btn');
const isGameTimeChecked=document.querySelector('#checkbox1');
const volumeProgress=document.querySelector('.volume');
const numOfSecondsText=document.querySelector('.num-of-seconds');
const onOffText=document.querySelector('.on-off-text');

const victoryAudio=new Audio('/assets/victory.mp3');
const failureAudio=new Audio('/assets/failure.mp3');

const defaultSettings={
    volume:0.5,
    isGameTimeChecked:true,
    seconds:'10'
}

let numOfSeconds;
let settings={};


function setLocalStorage(key,value) {
    localStorage.setItem(key, value);
}

function getLocalStorage() {
    settings=JSON.parse (localStorage.getItem ('settings'));
    if(settings==undefined){
        setLocalStorage('settings', JSON.stringify(defaultSettings));
        setSettings(defaultSettings);
    }
    setSettingsInHtml();
}


function setVolume(){
    victoryAudio.volume=volumeProgress.value;
    failureAudio.volume=volumeProgress.value;
    fillProgressBar(volumeProgress);
}

function setSettingsInHtml(){
    volumeProgress.value=settings.volume;
    setVolume();
    isGameTimeChecked.checked=settings.isGameTimeChecked;
    numOfSeconds=settings.seconds;
    numOfSecondsText.innerHTML=settings.seconds;
    editGameTime();
}

function editGameTime(e){
    if(isGameTimeChecked.checked) {
        onOffText.innerHTML='On';
        if(e!==undefined && numOfSecondsText.innerHTML==0) {
            numOfSecondsText.innerHTML=5;
            numOfSeconds=5;
        }
    }
    else onOffText.innerHTML='Off';
}

function editGameTimeBlock(seconds){
    if(seconds){ 
        isGameTimeChecked.checked=true;
        editGameTime();
    }
    else {
        isGameTimeChecked.checked=false;
        editGameTime();
    }
}

function editNumSecondsText(val){
    numOfSecondsText.innerHTML=val;
    editGameTimeBlock(val);
}

function settingsToggle(){
    settingsPage.classList.toggle('open');
}

function addAndReduceSecondsToggle(e){
    let res;
    if(e.target.classList.contains('plus-time-btn')){
        res=Number(numOfSeconds)+5;
        if(res<=30){ 
            editNumSecondsText(String(res));
            numOfSeconds=res;
        }
    }
    else{
        res=Number(numOfSeconds)-5;
        if(res>=0) {
            editNumSecondsText(res);
            numOfSeconds=res;
        }
    }
}

function saveToggle(){
    setSettings();
    setLocalStorage('settings', JSON.stringify(settings));
}

function setSettings(data){
    if(data!=undefined) settings=JSON.parse(JSON.stringify(defaultSettings));
    else{
        settings.volume=volumeProgress.value;
        settings.isGameTimeChecked=isGameTimeChecked.checked;
        settings.seconds=numOfSeconds;
    }
}


function fillProgressBar(progressBar){
    const value= progressBar.value*100;
    progressBar.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #A4A4A4 ${value}%, #A4A4A4 100%)`;
}

volumeProgress.addEventListener('input',setVolume);
settingsBtn.addEventListener('click',settingsToggle);
closeBtn.addEventListener('click',settingsToggle);
isGameTimeChecked.addEventListener('click',editGameTime);
addSecondsBtn.addEventListener('click',addAndReduceSecondsToggle);
reduceSecondsBtn.addEventListener('click',addAndReduceSecondsToggle);
saveBtn.addEventListener('click',saveToggle);
defaultSettingsBtn.addEventListener('click', ()=>{
    setSettings(defaultSettings);
    setSettingsInHtml();
});
getLocalStorage();
