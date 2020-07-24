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
const inputName = formEditProfileModel.querySelector('.modal__input_type_name');
const inputStatus = formEditProfileModel.querySelector('.modal__input_type_status');

const inputTitle = formAddCard.querySelector('.modal__input_type_place');
const inputUrl = formAddCard.querySelector('.modal__input_type_url');


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
  renderCard({name:inputTitle.value, link:inputUrl.value})

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

function handleDeleteClick(e){
  e.target.closest('.element').remove();
};

//Функция для добавления карточек
function createCard(data) {
  const elementTemplate = document.querySelector('.element-template');
  const card = elementTemplate.content.cloneNode(true);
  const cardLikeButton = card.querySelector('.element__heart');
  const cardDeleteButton = card.querySelector('.element__delete');

  card.querySelector('img').src = data.link;
  card.querySelector('.element__title').textContent = data.name;

    //Кнопки на карточках
  cardLikeButton.addEventListener('click', () => {
    //handleLikeClick()
  });

  cardDeleteButton.addEventListener('click', (e) => {
    handleDeleteClick(e);
  });

  // cardImage.addEventListener('click', () => {
  //   //handleImageClick()
  // })

  return card;
}


//Добавление карточки
function renderCard(data) {
  cardsListElement.prepend(createCard(data))
}

//Функция для пробега по масиву первоначальных карточек
initialCards.forEach(data => {
  renderCard(data);
})



