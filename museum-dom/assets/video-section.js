let videoContainer=document.querySelector('.current-video');
let video=document.querySelector('.current-video__viewer');
let playButton=document.querySelector('.video__sm-play');
let bigPlayButton=document.querySelector('.video__play');
let volumeButton=document.querySelector('.video__volume-status');
let fullscreenButton=document.querySelector('.video__full-screen');
let videoDurationProgress=document.querySelector('.video__duration');
let videoVolumeProgress=document.querySelector('.video__volume');
let volumeValue=video.volume;


video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',videoTime);

playButton.addEventListener('click',togglePlay);
bigPlayButton.addEventListener('click',togglePlay);

fullscreenButton.addEventListener('click',toggleFullscreen);
window.addEventListener('keydown',function(e) { 
    keyHandler(e); 
});
videoDurationProgress.addEventListener('input', videoTime);
videoVolumeProgress.addEventListener('input',editProgressBar);
volumeButton.addEventListener('click',toggleMute);
video.addEventListener('loadedmetadata',function(){
    video.volume=0.5;
    // videoDurationProgress.value=0;
    // editProgressBar(videoDurationProgress,0);
});

function skipFragment(e,value){
    video.currentTime+=value;
    videoTime();
}

function togglePlay(e){
    let status=video.paused? 'play' : 'pause';
    video[status]();
    playButton.classList.toggle('pause');
    playButton.classList.toggle('play');
    bigPlayButton.style.display=status=='pause'?'inline-block':'none';
    e.preventDefault();
}

function toggleFullscreen(){
    videoContainer.webkitRequestFullScreen();
    if(videoContainer.fullscreenEnabled) openFullscreen();
    else closeFullscreen();
    video.classList.toggle('full-screen');
    bigPlayButton.classList.toggle('full-screen');
    fullscreenButton.classList.toggle('open');
}

function openFullscreen(){
    if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    else if (videoContainer.webkitRequestFullscreen) videoContainer.webkitRequestFullscreen();
    else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
}

function closeFullscreen(){
    if (document.exitFullscreen) document.exitFullscreen(); 
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
}

function editPlaybackRate(value){
    let char=String(value)[0];
    if(char=='-' && video.playbackRate>=0.5 || char=='0' && video.playbackRate<=1.75 ) video.playbackRate+=eval(value);
}

function keyHandler(e){
    console.log(video.playbackRate);
    if(e.keyCode==70) toggleFullscreen(e);
    else if(e.keyCode==32 || e.keyCode==75) togglePlay(e);
    else if(e.keyCode==188) editPlaybackRate(-0.25);
    else if(e.keyCode==190) editPlaybackRate(0.25);
    else if (e.keyCode==77) toggleMute();
    else if (e.keyCode==74) skipFragment(e,-10);
    else if (e.keyCode==76) skipFragment(e,10);
    switch(e.key){
        case '0': case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':
        case '9': 
                video.currentTime=0;
                let value=Number(e.key)*0.1*video.duration;
                skipFragment(e,value);
    }
}

function videoTime(e){
    if(e!==undefined){
     let value=e.currentTarget.value;
     if(value!=null)  video.currentTime=parseFloat(value*video.duration);
     if(e.type=='input' && video.paused) togglePlay();
    }
    let videoProgress=video.currentTime/ video.duration;
    if(!isNaN(videoProgress))editProgressBar(videoDurationProgress,videoProgress);
    else editProgressBar(videoDurationProgress,0);
    if(video.ended ) {
    playButton.classList.remove('play');
    playButton.classList.add('pause');
    }
}

function editProgressBar(progressBar,value){
    progressBar.value=value;
    if(progressBar.target) {
        video.volume=progressBar.currentTarget.value;
        editVolumeProgressBar();
    }
    fillProgressBar(progressBar);
}

function toggleMute(){
    volumeButton.classList.toggle('mute');
    volumeButton.classList.toggle('sound');
    if(volumeButton.classList.contains('mute')){
        volumeValue=video.volume;
        video.volume=0;
    }
    else video.volume=volumeValue;
    editProgressBar(videoVolumeProgress,video.volume);
}

function editVolumeProgressBar(){
    if(video.volume==0) {
        volumeButton.classList.remove('sound')
        volumeButton.classList.add('mute');
    }
    else {
        volumeButton.classList.remove('mute')
        volumeButton.classList.add('sound');
    }
}

function setTime(time){
    let mins=Math.floor(time/60);
    let secs=Math.floor(time-mins*60);
    if(secs<10)secs='0'+secs;
    return mins+':'+secs;
}

function fillProgressBar(progressBar){
    if(progressBar.type=='input') progressBar=progressBar.currentTarget;
    const value= progressBar.value*100;
    progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}




$(document).ready(function(){
    $('.video__video-slider').slick({
      arrows:true,
      slidesToShow:3,
      slidesToScroll: 1,
      swipeToSlide:true,
      dots: true,
      infinite: true,
       speed: 500,
    });
  });

  
  $(".video__video-slider").on("init", function(event, slick, currentSlide, nextSlide){
    changingMainVideo(slick.currentSlide);
    var CurrentSlideDom=$(slick.$slides.get(currentSlide));
    var NextSlideDom=$(slick.$slides.get(nextSlide));
    console.log(CurrentSlideDom);
    console.log(NextSlideDom);
  });
  
  $(".video__video-slider").on("afterChange", function(event, slick, currentSlide){
    changingMainVideo(slick.currentSlide);
  });



  $('.video__video-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var CurrentSlideDom=$(slick.$slides.get(currentSlide));
    var NextSlideDom=$(slick.$slides.get(nextSlide));
});
  
  function changingMainVideo(currentSlide){
    console.log(currentSlide);
    video.src=`assets/video/video${currentSlide}.mp4`;
    video.poster=`assets/video/poster${currentSlide}.jpg`;
  }
