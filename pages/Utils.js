import { FormValidator } from './FormValidator.js';
import { object } from './Constants.js';


// Открытие и закрытие модалки
export const closeModalWindow = (modalWindow) => {
  // удаляем событие keydown
  console.log('И закрытие сработало')
  document.removeEventListener('keyup', (evt) => {
    const activePopup = document.querySelector('.modal_is-open');
    if (evt.key === 'Escape') {
      activePopup.remove('modal_is-open');

    };
  });

  modalWindow.classList.remove('modal_is-open');

};
// ----------------------------------------


// Открываем модалку и вешаем события на закрытие
export const openModalWindow = (modalWindow) => {
  // добавляем событие keydown
  console.log('open',modalWindow)

  document.addEventListener('keyup', (evt) => {
    console.log('classlist',modalWindow.classlist)
    if (evt.key === 'Escape') {
      console.log('classlist',modalWindow)
      modalWindow.classList.remove('modal_is-open');;
    };
  });

  // открываем модалку
  modalWindow.classList.add('modal_is-open');

}
