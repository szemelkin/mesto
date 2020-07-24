//Открытие модалок
const openAddCardModalButton = document.querySelector(".profile__add-button");
const openEditProfileModalButton = document.querySelector('.profile__edit-button');

//Идентификация типа модалки
const addCardModal = document.querySelector('.modal_type_add-card')
const editProfileModal = document.querySelector('.modal_type_edit-profile');

//Поиск формы в модалке
const formAddCard = addCardModal.querySelector('.modal__form');
const formEditProfileModel = editProfileModal.querySelector('.modal__form');

//Поля для ввода
const inputName = document.querySelector('.modal__input_type_name');
const inputStatus = document.querySelector('.modal__input_type_status');

//Поля для вывода
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

//Поиск кнопки закрытия в модалке
const addCardCloseModalButton = addCardModal.querySelector('.modal__close-button');
const editProfileCloseModalButton = editProfileModal.querySelector('.modal__close-button');



//Функция открытия-закрытия модалки
function toggleModal(modal) {

  if (!modal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputStatus.value = profileText.textContent;
  }

  modal.classList.toggle('modal_is-open');
}

//Функция сохранения модалки при редактировании профиля
function profileEditHandler(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileText.textContent = inputStatus.value;

  toggleModal(editProfileModal);
};

//Функция сохранения модалки при добавлении карточки
function profileAddCardHandler(e) {
  e.preventDefault();



  toggleModal(addCardModal);
};



//Открытие и закрытие модалки с добавлением карточки
openAddCardModalButton.addEventListener('click', () => {
  toggleModal(addCardModal)
});
addCardCloseModalButton.addEventListener('click', () => {
  toggleModal(addCardModal)
});

//Открытие и закрытие модалки с редактированием профиля
openEditProfileModalButton.addEventListener('click', () => {
  toggleModal(editProfileModal)
});
editProfileCloseModalButton.addEventListener('click', () => {
  toggleModal(editProfileModal)
});

//Обработчики сохранения модалок
formEditProfileModel.addEventListener('submit', profileEditHandler)
formAddCard.addEventListener('submit', profileAddCardHandler)





//Карточки по умолчанию//
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Переменные для вставки карточек
const cardsListElement = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template');
const card = elementTemplate.content.cloneNode(true);
const cardLikeButton = card.querySelector('.element__heart');
const cardDeleteButton = card.querySelector('.element__delete');

//Функция для добавления карточек
function addCard(data) {
  const card = elementTemplate.content.cloneNode(true);

  card.querySelector('img').src = data.link;
  card.querySelector('.element__title').textContent = data.name;
  cardsListElement.prepend(card)
}

//Функция для пробега по масиву первоначальных карточек
initialCards.forEach(data => {
  addCard(data);
})

//Кнопки на карточках
cardLikeButton.addEventListener('click', () => {
  //handleLikeClick()
})

cardDeleteButton.addEventListener('click', () => {
  //handleDeleteClick()
})

//cardImage.addEventListener('click', () => {
  //handleImageClick()
//})

