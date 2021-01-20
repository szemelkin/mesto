//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { object, validationConfig } from '../components/Constants.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage';

const userInfo2 = new UserInfo('.profile__title','.profile__text');

//Редактирование профиля.
const openEditProfileModalWindow = new PopupWithForm(
  object.editProfileModal,
  {callback: (editProfileData) => {
    userInfo2.setUserInfo(editProfileData['modal__input-name'],editProfileData['modal__input-status'])
    // userInfo2.setUserInfo(editProfileData.name,editProfileData.link)
    console.log('editProfileData',editProfileData)
  }
  }
);

//Событие. Просмотр увеличенной картинки
const openModalWindowCard = new PopupWithImage(object.imageShowModal);
openModalWindowCard.setEventListeners();

function handleCardClick(url, title) {
  openModalWindowCard.openModalWindow(url, title);
}

//Событие. Открытие окна редактирования профиля
const cancelValidation1 = new FormValidator(object.editProfileModal,validationConfig);
object.openEditProfileModalButton.addEventListener('click', () => {
  openEditProfileModalWindow.openModalWindow();
  object.userInfoProfileName.value = userInfo2.getUserInfo().name
  object.userInfoProfileAbout.value = userInfo2.getUserInfo().status
  cancelValidation1.resetValidationErrors();
});
openEditProfileModalWindow.setEventListeners();



const putNewCardList = new Section({
  data: [],
  renderer: () => {
  }},
  object.cardsListElement
  );



const openAddCardModalWindow = new PopupWithForm(
  object.addCardModal,
  {callback: (cardItem) => {
        const cardForGenerate = new Card(object.cardTemplate, cardItem, handleCardClick);
        const cardElement = cardForGenerate.generateCard();
        putNewCardList.setItem(cardElement);
    }
  }
);


//Событие "Добавление карточки"
const cancelValidation2 = new FormValidator(object.addCardModal,validationConfig);
object.openAddCardModalButton.addEventListener('click', () => {
  openAddCardModalWindow.openModalWindow();

  cancelValidation2.resetValidationErrors();
});
openAddCardModalWindow.setEventListeners();


//====================================


// Добавление первых карточек
const defaultCardList = new Section({
    data: object.initialCards,
    renderer: (cardItem) => {
      // console.log('defaultCardList',cardItem)
      const cardForGenerate = new Card(object.cardTemplate, cardItem, handleCardClick);
      const cardElement = cardForGenerate.generateCard();
      defaultCardList.setItem(cardElement);
    }
  },
  object.cardsListElement
  );


defaultCardList.render()

//----------------------------------

//Подключаем валидацию форм
const profileForm = document.getElementById("profile_1");
const cardForm = document.getElementById("card_1");

const getValidationProfile = new FormValidator(profileForm,validationConfig);
getValidationProfile.enableValidation();

const getValidationCard = new FormValidator(cardForm,validationConfig);
getValidationCard.enableValidation();

//_________________________________________________________________
