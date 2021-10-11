
                                                                                    // GALLERY

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



                                                                                    // BURGER-MENU
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




                                                                                    // CONTACTS
  mapboxgl.accessToken = 'pk.eyJ1IjoidGFudGFsaXR5IiwiYSI6ImNrdWJ1YTcyaDByemMybm12MXR3ZW55OTMifQ.AClSeJjIqoAnx5Ifygvx4w';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center:  [2.3364, 48.86091],
  zoom: 16
  });

const marker1 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([2.3364, 48.86091])
.addTo(map);
 
const marker2 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3333, 48.8602])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3397, 48.8607])
.addTo(map);
 

const marker4 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3330, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3365, 48.8625])
.addTo(map);
   
  map.addControl(new mapboxgl.NavigationControl());


                                                                                    // TICKETS
                                                                                    

let radioInputTickets = document.querySelectorAll('.tickets__input');
radioInputTickets.forEach(x=> x.addEventListener('change',changeTotal));

let numberInputTickets=document.querySelectorAll('.input_text');
numberInputTickets.forEach(x=> x.addEventListener('change',changeTotal));

let ticketsCounterButtons=document.querySelectorAll('.tickets__group1 button, .tickets__group2 button ');
ticketsCounterButtons.forEach(x=> x.addEventListener('click',changeTotal));

document.addEventListener("DOMContentLoaded", changeTotal);

function changeTotal(){
  radioInputTickets=Array.from(radioInputTickets);
  let baseCost=radioInputTickets.filter(x=>x.checked)[0].value;
  let costBasicTickets=baseCost*numberInputTickets[0].value;
  let costSeniorTickets=(baseCost/2).toFixed(1)*numberInputTickets[1].value;
  document.querySelector('.total').innerHTML= costBasicTickets+costSeniorTickets;
}


console.log('Самопроверка:\n1)Слайдер в секции Welcome 0/24\n2)Слайдер в секции Video 0/20\n3)Кастомный видеоплеер 36/36\n4)Слайдер сравнения изображений в секции Explore 0/10\n5)Анимация при прокрутке изображений в секции Galery 0/8\n6)Калькулятор продажи билетов в секции Tiskets 8/10(при обновлении страницы не сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них)\n7)Калькулятор продажи билетов в форме продажи билетов 0/14\n8)Валидация формы 0/16\n9)Интерактивная карта в секции Contacts 12/12\n\n Отметка: 56/150 ')
