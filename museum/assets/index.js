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

console.log(" Привет! Хотела бы попросить проверить работу позже, если есть такая возможность. Спасибо!\n-Вёрстка валидная +10.\n-Вёрстка семантическая +20/24 (Отсутствуют один заголовок h2 и один тег section).\n-Вёрстка соответствует макету +40/45.\n-Форма покупки билетов +0/22.\n-Требования к css + 18.\n-Интерактивность, реализуемая через css +20.\n\tОтсутствует:\n1)при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe -5\n-Интерактивность, реализуемая через js +4/16.\n\tОтсутствует:\n1)кнопке 'Book' в форме покупки билетов добавлен ripple-эффект Демо -2 \n2)при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке -10 \nИтого 112/160");