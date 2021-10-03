const progress = document.querySelector('.progress');
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})
 
const progress2 = document.querySelector('.progresss');
  
progress2.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})


function generateGallery(){
  const pictureInnerContainer = document.querySelector('.art-gallery-inner-container');
  const pictureIndexes=Array.from({length:15},(a, b) => b+1).sort(() => Math.random() - 0.5);
  pictureIndexes.forEach(a=> {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `assets/img/gallery/galery${a}.jpg`;
    img.alt = `galery${a}`;
    pictureInnerContainer.append(img);
  });
}

generateGallery();



const menu = document.querySelector('.nav');
const burgerIcon = document.querySelector('.burger');
const welcomeCol=document.querySelector('.welcome__column')

function toggleMenu() {
  menu.classList.toggle('open');
  burgerIcon.classList.toggle('open');
  welcomeCol.classList.toggle('opacity-none');
}

burgerIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', function(e) {
    if ( e.target!= menu && e.target!= burgerIcon && menu.classList.contains('open') || e.target.closest('.link')) toggleMenu();
});