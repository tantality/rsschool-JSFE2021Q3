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
const welcomeCol=document.querySelector('.welcome__column');
const headerCont=document.querySelector('.header__container');

function toggleMenu() {
  menu.classList.toggle('open');
  burgerIcon.classList.toggle('open');
  welcomeCol.classList.toggle('opacity-none');
  headerCont.classList.toggle('header__container-padding');
}

burgerIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', function(e) {
    if ( e.target.closest('.nav')!= menu && e.target!= burgerIcon && menu.classList.contains('open') || e.target.closest('.link') || e.target.closest('.additional-info__social-networks')){ 
      console.log(e.target);
      toggleMenu();
    }
});



    // mapboxgl.accessToken = 'pk.eyJ1IjoidGFudGFsaXR5IiwiYSI6ImNrdWJ1YTcyaDByemMybm12MXR3ZW55OTMifQ.AClSeJjIqoAnx5Ifygvx4w';
    // var map = new mapboxgl.Map({
    // container: 'map',
    // style: 'mapbox://styles/mapbox/light-v10'
    // });


    console.log('Самооценка:\n1)Вёрстка соответствует макету на экранах 1024px, 768px, 420px. На всех трех разрешениях отсутствует форма покупки билетов +108/120\n2) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6/6\n3)Совмещается адаптивная и респонсивная (резиновая) вёрстка +4/14 При изменении ширины экрана плавно изменяются размеры:\n\tкарты +2\n\tгалереи изображений и изображений в ней +2\n4)На ширине экрана 1024рх и меньше реализовано адаптивное меню +12/12\n\n Отметка: 130/160');