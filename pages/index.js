//Открытие модалок
const openAddCardModalButton = document.querySelector(".profile__add-button");
const openEditProfileModalButton = document.querySelector('.profile__edit-button');

//Идентификация типа модалки
const addCardModal = document.querySelector('.modal_type_add-card');
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const imageShowModal = document.querySelector('.modal_type_image');

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
const imageShowCloseModalButton = imageShowModal.querySelector('.modal__close-button');

//Картиник
const imageInModal = imageShowModal.querySelector('img');

const subButtonForAddCard = formAddCard.querySelector('.modal__btn-save')




//Функция закрытия по Esc
function escapeCloseModal(evt, anyModal) {
  const escKey = 'Escape';

  if (evt.key === escKey && anyModal.classList.contains('modal_is-open')) {

    toggleModal(anyModal);


    document.removeEventListener('keydown', doForEsc);
    document.removeEventListener('keydown', doForEnter);
    cardCheckValidStyle();


  }
}



//Функция проверки и обработки при нажатии Enter
function enterPressChecker(evt, anyModal) {
  const enterKey = 'Enter';

  if (evt.key === enterKey && anyModal.classList.contains('modal_is-open')) {
    profileAddCardHandler
    toggleModal(anyModal);
    document.removeEventListener('keydown', doForEnter);
    document.removeEventListener('keydown', doForEsc);

  }
}

//Обработчик слушателя Enter
function doForEnter(evt)   {
  enterPressChecker(evt, addCardModal)
  enterPressChecker(evt, editProfileModal)
  enterPressChecker(evt, imageShowModal)
}


//Обработчик слушателя для Esc

function doForEsc(evt)   {
  escapeCloseModal(evt, addCardModal)
  escapeCloseModal(evt, editProfileModal)
  escapeCloseModal(evt, imageShowModal)
}


//Функция закрытия по нажатию Esc при открытой модалке
function closeModalByEsc(anyModal){
  if (anyModal.classList.contains('modal_is-open')){
    document.addEventListener('keydown', doForEsc);
    formAddCard.reset()
    addCardModal.querySelector('.modal__input__error').classList.textContent = '';
    cardCheckValidStyle();


  }
  if(anyModal.classList.contains('modal_type_add-card') & anyModal.classList.contains('modal_is-open')){
    document.addEventListener('keydown', doForEnter);


  }
}



function closeByAnyClick(evt) {

  console.log(evt.target.classList)

  if (evt.target.classList.contains('modal_is-open')) {
    evt.target.classList.remove('modal_is-open');
    document.removeEventListener('click', closeByAnyClick);


  }


}

//Функция закрытия по клику в любое место
function closeModalByClickInAnyPlace(anyModal) {
  if (anyModal.classList.contains('modal_is-open')){

    document.addEventListener('click', closeByAnyClick);
  }

}



//Функция открытия-закрытия
function toggleModal(modal) {
  removeDisableFromCardSubmitButton()

  modal.classList.toggle('modal_is-open');

  closeModalByClickInAnyPlace(modal);
  closeModalByEsc(modal);


}

//Функция на открытие и закрытие модалки при работе с профилем
function toggleProfileModal(modal) {
  if (!modal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputStatus.value = profileText.textContent;
  }
  toggleModal(editProfileModal)
}

//Функция сохранения модалки при редактировании профиля
function profileEditHandler(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileText.textContent = inputStatus.value;

  toggleProfileModal(editProfileModal)

};


//Чекер наличия стиля случая валидной формы
function cardCheckValidStyle(){

  if (inputTitle.classList.contains('modal__input_type_valid')){
    inputTitle.classList.remove('modal__input_type_valid')
  }
  if (inputUrl.classList.contains('modal__input_type_valid')){
    inputUrl.classList.remove('modal__input_type_valid')
  }

  if (inputTitle.classList.contains('modal__input_type_error')){
    inputTitle.classList.remove('modal__input_type_error')
  }
  if (inputUrl.classList.contains('modal__input_type_error')){
    inputUrl.classList.remove('modal__input_type_error')
  }




  formAddCard.reset()
  subButtonForAddCard.disabled = true;
  subButtonForAddCard.classList.remove('modal__btn-undisabled')

  addCardModal.querySelector(`#modal__input-title-error`).textContent = '';
  addCardModal.querySelector(`#modal__input-url-error`).textContent = '';


}


//Функция сохранения модалки при добавлении карточки
function profileAddCardHandler(e) {
  e.preventDefault();
  renderCard({name:inputTitle.value, link:inputUrl.value})

  formAddCard.reset()

  subButtonForAddCard.classList.remove('modal__btn-undisabled')
  subButtonForAddCard.disabled = true;
  toggleModal(addCardModal)


};


//Открытие и закрытие модалки с добавлением карточки
openAddCardModalButton.addEventListener('click', () => {

  if (!addCardModal.classList.contains('modal_is-open')) {
    subButtonForAddCard.classList.add(object.inactiveButtonClass);
  }

  toggleModal(addCardModal)

});

//Функция удаления стиля дисбаленной кнопки у карточки
function removeDisableFromCardSubmitButton() {
  if (addCardModal.classList.contains('modal_is-open')) {
    subButtonForAddCard.classList.remove(object.inactiveButtonClass);
  }

}

addCardCloseModalButton.addEventListener('click', () => {
  toggleModal(addCardModal)
});

//Открытие и закрытие модалки с редактированием профиля
openEditProfileModalButton.addEventListener('click', () => {
  toggleProfileModal(editProfileModal);

});

editProfileCloseModalButton.addEventListener('click', () => {
  toggleProfileModal(editProfileModal)

});

//Закрытие модалки
imageShowCloseModalButton.addEventListener('click', () => {
  toggleModal(imageShowModal)

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
  e.preventDefault();
  e.target.closest('.element').remove();
};

function handleLikeClick(e){
  e.preventDefault();
  e.target.classList.toggle('element__heart_black');
};

function handleImageClick(e){
  e.preventDefault();
  showImage(e);
  toggleModal(imageShowModal);
  //Используем функцию для закрытия при клике на оверлей


};


function showImage(e) {
  e.preventDefault();
  imageInModal.src = e.target.src;
  imageInModal.alt = e.target.closest('.element').querySelector('.element__title').textContent;
  imageShowModal.querySelector('h3').textContent = e.target.closest('.element').querySelector('.element__title').textContent;


};

//Функция для добавления карточек
function createCard(data) {
  const elementTemplate = document.querySelector('.element-template');
  const card = elementTemplate.content.cloneNode(true);
  const cardLikeButton = card.querySelector('.element__heart');
  const cardDeleteButton = card.querySelector('.element__delete');
  const cardImage = card.querySelector('.element__image');
  const cardImageSource = card.querySelector('img');

  cardImageSource.src = data.link;
  cardImageSource.alt = data.name;
  card.querySelector('.element__title').textContent = data.name;

    //Кнопки на карточках
  cardLikeButton.addEventListener('click', (e) => {
    handleLikeClick(e);
  });

  cardDeleteButton.addEventListener('click', (e) => {
    handleDeleteClick(e);
  });

  cardImage.addEventListener('click', (e) => {
    handleImageClick(e);
  })

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

