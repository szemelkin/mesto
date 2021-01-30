//ПОДКЛЮЧАЕМ ВНЕШНИЕ ФАЙЛЫ________________________________________
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { object, validationConfig } from '../utils/constants';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup';

const userInfo2 = new UserInfo('.profile__title','.profile__text');
let userId

function renderLoading(modal, bool){
  if (bool == true) {
  modal.textContent = 'Сохранение...'
  } else {
  modal.textContent = 'Сохранить'
  }
}

function handleCardClick(url, title) {
  openModalWindowCard.openModalWindow(url, title);
}

function handleDeleteIconClick(cardId, evt) {
  confirmationWindow.openModalWindow();
  object.actionConfirmation.addEventListener('submit', (event) => {
    event.preventDefault(event);
    api.deleteCard(cardId).catch((err) => {console.log(err)});
    evt.target.closest('.element').remove();
    confirmationWindow.closeModalWindow()
  })
}
//_________________________________________________________________
//Функция создания карточки
//_________________________________________________________________
function createCard(cardTemplate, res, handleCardClick, userId, api, handleDeleteIconClick){
  const cardForGenerate = new Card(cardTemplate, res, handleCardClick, userId, api, handleDeleteIconClick);
  return cardForGenerate.generateCard();
}

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

//_________________________________________________________________
//Загружаем карточки впервый раз
//_________________________________________________________________
api.getCards()
  .then(res => {
    defaultCardList.render(res)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })

//_________________________________________________________________

api.getUserInfo()
  .then(res => {
    userId = res._id
    return userInfo2.setUserInfoApi(res)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })



//_________________________________________________________________
// Редактирование профиля.
//_________________________________________________________________
const openEditProfileModalWindow = new PopupWithForm(
  object.editProfileModal,
  {callback: (editProfileData) => {
    renderLoading(object.subButtonForEditProfile,true);
    api.editProfile(editProfileData)
    .then(res => {

      userInfo2.setUserInfoApi(res)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() =>{
      renderLoading(object.subButtonForEditProfile,false);
    });
  }
  }
);

const cancelValidation1 = new FormValidator(object.editProfileModal,validationConfig);
object.openEditProfileModalButton.addEventListener('click', () => {
  openEditProfileModalWindow.openModalWindow();
  object.userInfoProfileName.value = userInfo2.getUserInfo().name
  object.userInfoProfileAbout.value = userInfo2.getUserInfo().about

  cancelValidation1.resetValidationErrors();
});
openEditProfileModalWindow.setEventListeners();




//_________________________________________________________________
//Событие "Добавление карточки"
//_________________________________________________________________
const openAddCardModalWindow = new PopupWithForm(
  object.addCardModal,
  {callback: (cardItem) => {
    renderLoading(object.subButtonForAddCard,true);
    api.addCard(cardItem).then(res => {
      defaultCardList.setItem(createCard(object.cardTemplate, res, handleCardClick, userId, api, handleDeleteIconClick));
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




//_________________________________________________________________
// Добавление первых карточек
//_________________________________________________________________

const defaultCardList = new Section({
    renderer: (cardItem) => {
      defaultCardList.setItem(createCard(object.cardTemplate, cardItem, handleCardClick, userId, api, handleDeleteIconClick));
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
    console.log('Карточка Аватара',cardItem)
    api.addAvatar(cardItem).then(res => userInfo2.setUserInfoApi(res)).catch((err) => {console.log(err)})
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
