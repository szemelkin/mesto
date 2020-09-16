//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { object } from './Constants.js';
//________________________________________________________________


//ОБЪЯВЛЯЕМ ФУНКЦИИ________________________________________________

//Делаем активной кнопку Submit
const makeSubmitActive = (modalWindow) => {
  const activePopup = modalWindow.querySelector('.modal__btn-save');
  // открываем модалку
  activePopup.disabled = false;
  activePopup.classList.remove('modal__btn-disabled');
}


//Сохранение при добавлении карточки
function profileAddCardHandler(e) {
  e.preventDefault();

  const new_card_for_generate = new Card(object.cardTemplate,{name:object.inputTitle.value, link:object.inputUrl.value});

  const new_cardElement = new_card_for_generate.generateCard();
  object.cardsListElement.prepend(new_cardElement);
  closeModalWindow(object.addCardModal);
};
//-----------------------------------------------------------


//Профиль. Сохранения модалки при редактировании профиля
function profileEditHandler(e) {
  e.preventDefault();


  object.profileName.textContent = object.inputName.value;
  object.profileText.textContent = object.inputStatus.value;
  closeModalWindow(object.editProfileModal);
};
//________________________________________________________________


// Открытие и закрытие модалки
const closeModalWindow = (modalWindow) => {
  // удаляем событие keydown
  document.removeEventListener('keyup', handleEscUp);
  document.removeEventListener('click', handleClickAroundModalWindow);
  // скрываем попап
  modalWindow.classList.remove('modal_is-open');
  // сбрасываем формы
  modalWindow.querySelector('.modal__form').reset();
  // сбасываем валидацию
  const cancelValidationCard = new FormValidator(modalWindow,object);
  cancelValidationCard.cardCheckValidStyle();
};
//----------------------------------------


// Слушатели Esc, клика и Enter
const handleEscUp = (evt) => {
  const activePopup = document.querySelector('.modal_is-open');
  if (evt.key === 'Escape') {
    closeModalWindow(activePopup);
  };
};

const handleClickAroundModalWindow = (evt) => {
  const activePopup = document.querySelector('.modal_is-open');
  if (evt.target.classList.contains('modal_is-open')) {
    closeModalWindow(activePopup);
  };
};


//ВЕШАЕМ СОБЫТИЯ___________________________________________________

// Добавлене карточки. Слушатель кнопок открытия  закрытия
object.openAddCardModalButton.addEventListener('click', () => {
  if (!object.addCardModal.classList.contains('modal_is-open')) {
    object.subButtonForAddCard.classList.add(object.inactiveButtonClass);
  }
  openModalWindow(object.addCardModal);
});

// Открываем модалку и вешаем события на закрытие
const openModalWindow = (modalWindow) => {
  // добавляем событие keydown
  document.addEventListener('keyup', handleEscUp);
  document.addEventListener('click', handleClickAroundModalWindow);

  object.inputName.value = 'Жак-Ив Кусто';
  object.inputStatus.value = 'Исследователь океана';

  // открываем модалку
  modalWindow.classList.add('modal_is-open');
}


// Закрываем модалку при добавлении карточки при нажатии на крестик
object.addCardCloseModalButton.addEventListener('click', () => {
  closeModalWindow(object.addCardModal);
});
//-----------------------------------------------------------

//Редактирование профиля. Слушатель кнопки редактирования профиля
object.openEditProfileModalButton.addEventListener('click', () => {
  openModalWindow(object.editProfileModal);
  makeSubmitActive(object.editProfileModal);
});

object.closeEditProfileModalButton.addEventListener('click', () => {
  closeModalWindow(object.editProfileModal);
});
//-----------------------------------------------------------

//Обработчики сохранения модалок нажатием на кнопку Submit
object.formEditProfileModel.addEventListener('submit', profileEditHandler)
object.formAddCard.addEventListener('submit', profileAddCardHandler)
//-----------------------------------------------------------





//ГЕНЕРИРУЕМ КАРТОЧКИ

object.initialCards.forEach((item) => {

  const card_for_generate = new Card(object.cardTemplate, item);
  const cardElement = card_for_generate.generateCard(item);
  object.cardsListElement.prepend(cardElement);
});

const profile_form = Array.from(document.querySelectorAll(object.formSelector))[0];
const card_form = Array.from(document.querySelectorAll(object.formSelector))[1];

const getValidationProfile = new FormValidator(profile_form,object);
getValidationProfile.enableValidation();

const getValidationCard = new FormValidator(card_form,object);
getValidationCard.enableValidation();

//_________________________________________________________________
