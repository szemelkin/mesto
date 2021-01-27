//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { object, validationConfig } from '../components/Constants.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup';

const userInfo2 = new UserInfo('.profile__title','.profile__text');
const userId = 'dc293ceb9cbf27a0f2be8d47'


//_________________________________________________________________
//API
//_________________________________________________________________
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'
});

//_________________________________________________________________
//Определяем окно подтверждения
//_________________________________________________________________
const confirmationWindow =  new Popup(
  object.actionConfirmation,

);
confirmationWindow.setEventListeners()

// console.log('userdf',api.getUserInfo().then(res => {return JSON.stringify(res)}))
console.log(api.getCards())

//_________________________________________________________________
//Загружаем карточки впервый раз
//_________________________________________________________________
api.getCards()
  .then(res => {
    defaultCardList.render(res)
  })
//_________________________________________________________________

api.getUserInfo()
  .then(res => {
    return userInfo2.setUserInfoApi(res)
  })


//_________________________________________________________________
// Редактирование профиля.
//_________________________________________________________________
const openEditProfileModalWindow = new PopupWithForm(
  object.editProfileModal,
  {callback: (editProfileData) => {
    api.editProfile(editProfileData).then(res => userInfo2.setUserInfoApi(res))
  }
  }
);

const cancelValidation1 = new FormValidator(object.editProfileModal,validationConfig);
object.openEditProfileModalButton.addEventListener('click', () => {
  openEditProfileModalWindow.openModalWindow();
  api.getUserInfo().then(data => {
    renderLoading(object.subButtonForEditProfile,true);
    object.userInfoProfileName.value = data.name
    object.userInfoProfileAbout.value = data.about
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() =>{
    renderLoading(object.subButtonForEditProfile, false);
  });
  cancelValidation1.resetValidationErrors();
});
openEditProfileModalWindow.setEventListeners();

function renderLoading(modal, boolian){
  if (boolian == true) {
  modal.textContent = 'Сохранение...'
  } else {
  modal.textContent = 'Сохранить'
  }
}

//_________________________________________________________________
//Событие "Добавление карточки"
//_________________________________________________________________
const openAddCardModalWindow = new PopupWithForm(
  object.addCardModal,
  {callback: (cardItem) => {
    api.addCard(cardItem).then(res => {
      renderLoading(object.subButtonForAddCard,true);
      const cardForGenerate = new Card(object.cardTemplate, res, handleCardClick, userId);
      const cardElement = cardForGenerate.generateCard();
      setTimeout(defaultCardList.setItem(cardElement),1000)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() =>{
      renderLoading(object.subButtonForAddCard,false);
    });

    }
  }
);

const cancelValidation2 = new FormValidator(object.addCardModal,validationConfig);
object.openAddCardModalButton.addEventListener('click', () => {
  openAddCardModalWindow.openModalWindow();

  cancelValidation2.resetValidationErrors();
});
openAddCardModalWindow.setEventListeners();

//_________________________________________________________________
//Событие. Просмотр увеличенной картинки
//_________________________________________________________________
const openModalWindowCard = new PopupWithImage(object.imageShowModal);
openModalWindowCard.setEventListeners();

function handleCardClick(url, title) {
  openModalWindowCard.openModalWindow(url, title);
}


//_________________________________________________________________
// Добавление первых карточек
//_________________________________________________________________
// const apiExp = new Api()
const defaultCardList = new Section({
    renderer: (cardItem) => {
      const cardForGenerate = new Card(object.cardTemplate, cardItem, handleCardClick, userId);
      const cardElement = cardForGenerate.generateCard();
      defaultCardList.setItem(cardElement);
    }
  },
  object.cardsListElement
  );





//_________________________________________________________________
// Вешаем событие смены картинки аватара
//_________________________________________________________________
const cancelValidation3 = new FormValidator(object.editProfilePicture,validationConfig);
const openModalChangeAvatar = new PopupWithForm(
  object.editProfilePicture,
  {callback: (cardItem) => {
    api.addAvatar(cardItem).then(res => userInfo2.setUserInfoApi(res))
    }
  }
);
document.querySelector('.profile__avatar').addEventListener('click', () => {
  openModalChangeAvatar.openModalWindow();
  cancelValidation3.resetValidationErrors();

})
openModalChangeAvatar.setEventListeners();


//_________________________________________________________________
//Подключаем валидацию форм
//_________________________________________________________________
const profileForm = document.getElementById("profile_1");
const cardForm = document.getElementById("card_1");
const changeAvatarForm = document.getElementById("changePicture_1");

const getValidationProfile = new FormValidator(profileForm,validationConfig);
getValidationProfile.enableValidation();

const getValidationCard = new FormValidator(cardForm,validationConfig);
getValidationCard.enableValidation();

const getValidationChangeAvatar = new FormValidator(changeAvatarForm,validationConfig);
getValidationChangeAvatar.enableValidation();

//_________________________________________________________________
