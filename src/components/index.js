//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import './index.css';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { object, validationConfig } from './Constants.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage';

const userInfo2 = new UserInfo('.profile__title','.profile__text');

//Редактирование профиля.
const openEditProfileModalWindow = new PopupWithForm(
  object.editProfileModal,
  {callback: (editProfileData) => {
    userInfo2.setUserInfo(editProfileData['modal__input-name'],editProfileData['modal__input-status'])
  }
  }
);

//Событие. Просмотр увеличенной картинки
function handleCardClick(modalWindow, url, title) {
  const openModalWindowCard = new PopupWithImage(modalWindow, url, title);
  openModalWindowCard.openModalWindow();
  openModalWindowCard.setEventListeners();
}

//Событие. Открытие картинки для редактирования профиля
object.openEditProfileModalButton.addEventListener('click', () => {
  openEditProfileModalWindow.openModalWindow();
  console.log(object.editProfileModal.querySelector('.modal__input_type_name').value)
  console.log(userInfo2.getUserInfo().name)
  object.userInfoProfileName.value = userInfo2.getUserInfo().name
  object.userInfoProfileAbout.value = userInfo2.getUserInfo().status
  console.log(object.userInfoProfileName)
  console.log(object.userInfoProfileAbout)
  const cancelValidation1 = new FormValidator(object.editProfileModal,validationConfig);
  cancelValidation1.resetValidationErrors();
});
openEditProfileModalWindow.setEventListeners();


// //-----------------------------------

//Добавление карточки
// const openAddCardModalWindow = new PopupWithForm(
//   object.addCardModal,
//   {callback: (addCardData) => {
//     const newCardForGenerate = new Card(
//       object.cardTemplate,
//       {name:addCardData['modal__input-title'],link: addCardData['modal__input-url']},
//       handleCardClick);
//     const newCardElement = newCardForGenerate.generateCard();
//     object.cardsListElement.prepend(newCardElement);
//   }
//   }
// );


const openAddCardModalWindow = new PopupWithForm(
  object.addCardModal,
  {callback: () => {
    const putNewCardList = new Section(
      [{name:object.inputTitle.value,link: object.inputUrl.value}],
      {renderer: (cardItem) => {
        const cardForGenerate = new Card(object.cardTemplate, cardItem, handleCardClick);
        const cardElement = cardForGenerate.generateCard();
        defaultCardList.setItem(cardElement);
      }},
      object.cardsListElement
      );
      putNewCardList.render();
  }
  }
);

//Событие "Добавление карточки"

object.openAddCardModalButton.addEventListener('click', () => {
  openAddCardModalWindow.openModalWindow();
  const cancelValidation2 = new FormValidator(object.addCardModal,validationConfig);
  cancelValidation2.resetValidationErrors();
});
openAddCardModalWindow.setEventListeners();


//====================================

// Добавление первых карточек
const defaultCardList = new Section(
  object.initialCards,
  {renderer: (cardItem) => {
    const cardForGenerate = new Card(object.cardTemplate, cardItem, handleCardClick);
    const cardElement = cardForGenerate.generateCard();
    defaultCardList.setItem(cardElement);
  }},
  object.cardsListElement
  );


defaultCardList.render()

//----------------------------------

//Подключаем валидацию форм
const profileForm = document.getElementById("profile_1");
const cardForm = document.getElementById("card_1");

console.log(document.getElementById("profile_1"))
console.log(profileForm)

const getValidationProfile = new FormValidator(profileForm,validationConfig);
getValidationProfile.enableValidation();

const getValidationCard = new FormValidator(cardForm,validationConfig);
getValidationCard.enableValidation();

//_________________________________________________________________
