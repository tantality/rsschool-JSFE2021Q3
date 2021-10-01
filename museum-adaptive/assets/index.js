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



console.log(" Привет! Хотела бы попросить проверить работу позже, если есть такая возможность. Спасибо!\n-Вёрстка валидная +10.\n-Вёрстка семантическая +24. \n-Вёрстка соответствует макету +45.\n-Форма покупки билетов +0/22.\n-Требования к css + 18.\n-Интерактивность, реализуемая через css +20/25.\n\tОтсутствует:\n1)при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe -5\n-Интерактивность, реализуемая через js +14/16.\n\tОтсутствует:\n1)кнопке 'Book' в форме покупки билетов добавлен ripple-эффект Демо -2 \nИтого 131/160");

