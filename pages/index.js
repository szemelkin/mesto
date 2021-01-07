//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { object, validationConfig } from './Constants.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


//Редактирование профиля.
const openEditProfileModalWindow = new PopupWithForm(
  object.editProfileModal,
  {callback: (editProfileData) => {
    const userInfo = new UserInfo();
    userInfo.setUserInfo(editProfileData['modal__input-name'],editProfileData['modal__input-status'])
  }
  }
);

//Слушатель кнопки "Редактирования профиля"
object.openEditProfileModalButton.addEventListener('click', () => {
  openEditProfileModalWindow.openModalWindow();
  const userInfo = new UserInfo();
  object.editProfileModal.querySelector('.modal__input_type_name').value = userInfo.getUserInfo().name
  object.editProfileModal.querySelector('.modal__input_type_status').value = userInfo.getUserInfo().status
});
openEditProfileModalWindow.submitHandler();

// //-----------------------------------

// //Добавление карточки
const openAddCardModalWindow = new PopupWithForm(
  object.addCardModal,
  {callback: (addCardData) => {
    const newCardForGenerate = new Card(object.cardTemplate,{name:addCardData['modal__input-title'],link: addCardData['modal__input-url']});
    const newCardElement = newCardForGenerate.generateCard();
    object.cardsListElement.prepend(newCardElement);
  }
  }
);

//Слушатель кнопки "Добавление карточки"

object.openAddCardModalButton.addEventListener('click', () => {
  openAddCardModalWindow.openModalWindow();
});
openAddCardModalWindow.submitHandler();

//====================================

// Добавление первых карточек
const defaultCardList = new Section(
  object.initialCards,
  {renderer: (cardItem) => {
    const cardForGenerate = new Card(object.cardTemplate, cardItem);
    const cardElement = cardForGenerate.generateCard();
    defaultCardList.setItem(cardElement);
  }},
  object.cardsListElement
  );


defaultCardList.render()

//----------------------------------

//Подключаем валидацию форм
const profileForm = Array.from(document.querySelectorAll(validationConfig.formSelector))[0];
const cardForm = Array.from(document.querySelectorAll(validationConfig.formSelector))[1];

const getValidationProfile = new FormValidator(profileForm,validationConfig);
getValidationProfile.enableValidation();

const getValidationCard = new FormValidator(cardForm,validationConfig);
getValidationCard.enableValidation();

//_________________________________________________________________
