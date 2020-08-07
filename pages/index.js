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


//Функция закрытия по Esc
function escapeCloseModal(evt, anyModal) {
  const escKey = 'Escape';
  if (evt.key === escKey && anyModal.classList.contains('modal_is-open')) {
    toggleModal(anyModal);
  }
}

//Навешиваем всем модалкам (попапам) закрытие от клавищи Esc
document.addEventListener('keydown', (evt) => {
  escapeCloseModal(evt, editProfileModal);
  escapeCloseModal(evt, addCardModal);
  escapeCloseModal(evt, imageShowModal);
  });


//Закрываем модалку кликом в любом месте
function overlayClosing(anyModal) {
  document.addEventListener('click', function (evt) {
    if ((evt.target.classList.contains('modal_is-open'))) {
      toggleModal(anyModal);

    }
  });

}

// document.addEventListener('click', function (evt) {
//   if ((evt.target.classList.contains('modal_is-open'))) {
//     toggleModal(editProfileModal);
//     // toggleModal(addCardModal);
//     // toggleModal(imageShowModal);
//   }


  // if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))

  // if (editProfileModal.classList.contains('modal_is-open')) {
  //   // toggleModal(editProfileModal);
  //   console.log('FUCK YOU')
  // }
  // if (!(evt.target.classList.contain('modal_is-open'))) {
  //     toggleModal(editProfileModal);
  //     toggleModal(addCardModal);
  //     toggleModal(imageShowModal);
  //    }
// });


//Функция открытия-закрытия
function toggleModal(modal) {
  modal.classList.toggle('modal_is-open');

}

//Функция на открытие и закрытие модалки
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
  //toggleModal(editProfileModal);
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
  //Используем функцию для закрытия при клике на оверлей
  overlayClosing(addCardModal);
});

addCardCloseModalButton.addEventListener('click', () => {
  toggleModal(addCardModal)
});

//Открытие и закрытие модалки с редактированием профиля
openEditProfileModalButton.addEventListener('click', () => {
  toggleProfileModal(editProfileModal);
  //Используем функцию для закрытия при клике на оверлей
  overlayClosing(editProfileModal);
  //toggleModal(editProfileModal)
});

editProfileCloseModalButton.addEventListener('click', () => {
  toggleProfileModal(editProfileModal)
  //toggleModal(editProfileModal)
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
  overlayClosing(imageShowModal);
};


function showImage(e) {
  e.preventDefault();
  imageShowModal.querySelector('img').src = e.target.src;
  imageShowModal.querySelector('img').alt = e.target.closest('.element').querySelector('.element__title').textContent;
  imageShowModal.querySelector('h3').textContent = e.target.closest('.element').querySelector('.element__title').textContent;


};

//Функция для добавления карточек
function createCard(data) {
  const elementTemplate = document.querySelector('.element-template');
  const card = elementTemplate.content.cloneNode(true);
  const cardLikeButton = card.querySelector('.element__heart');
  const cardDeleteButton = card.querySelector('.element__delete');
  const cardImage = card.querySelector('.element__image');

  card.querySelector('img').src = data.link;
  card.querySelector('img').alt = data.name;
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


// // /// Игошевский код вторая попытка
// //  Прописать аттрибуты для валидации  полеей без жс
// //  Запустить валидацию всех форм
// // Сбросить дефолтное поведение сабмита и валидации
// // Повестить обработчик событий на кадлое поле ввода
// // Проверить валидность введенныз даннызх в поле
// // Найти ошибку относящуюся к полю
// // Добавить логику показа и скрытия  ощшибки
// // Добавить вариацию кнопки


// const object = {
//   formSelector:'.modal__form',
//   inputSelector: '.modal__input',
//   inputValidClass: 'modal__input_type_valid',
//   inputErrorClass: 'modal__input_type_error',
//   submitButtonSelector: '.modal__btn-save',
//   inactiveButtonClass: 'modal__btn-disabled',
//   activeButtonClass: 'modal__btn-undisabled',
//   errorClass: 'modal__error_visible'
// }


// // Поработаем с кнопкой
// function  buttonValidation(inputs,buttonSubmit,activeButtonClass,inactiveButtonClass) {
//   const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);

//   if (!isFormValid) {

//     buttonSubmit.classList.add(activeButtonClass);
//     buttonSubmit.classList.remove(inactiveButtonClass);
//     buttonSubmit.disabled = false;
//   } else {

//     buttonSubmit.classList.remove(activeButtonClass);
//     buttonSubmit.classList.add(inactiveButtonClass);
//     buttonSubmit.disabled = true;
//   }
// };

// //Проверим правильность инпутов
// function  inputValidation(inputElement, inputValidClass, inputErrorClass, errorClass, formElement) {
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   if (inputElement.validity.valid) {
//     inputElement.classList.add(inputValidClass);
//     inputElement.classList.remove(inputErrorClass);
//     errorElement.textContent = '';
//     errorElement.classList.remove(errorClass);

//   } else {
//     inputElement.classList.remove(inputValidClass);
//     inputElement.classList.add(inputErrorClass);
//     errorElement.textContent = inputElement.validationMessage;
//     errorElement.classList.add(errorClass);

//   }
// };

// // Повесим обработчик на каждый импут
// function inputsHandler(inputs,formElement, inputValidClass, inputErrorClass, errorClass, formElement,buttonSubmit,activeButtonClass,inactiveButtonClass) {


//   inputs.forEach((inputElement)=>{
//     inputElement.addEventListener('input',(evt)=>{
//       inputValidation(inputElement, inputValidClass, inputErrorClass, errorClass, formElement);
//       buttonValidation(inputs,buttonSubmit,activeButtonClass,inactiveButtonClass);
//     });
//   });
// };

// //обработчик форм
// function formsHandler(formSelector, inputSelector, submitButtonSelector, inputValidClass, inputErrorClass, errorClass, activeButtonClass,inactiveButtonClass) {
//   const forms = Array.from(document.querySelectorAll(formSelector));
//   forms.forEach((formElement) => {
//     //Сбросим дефолтное поведение сабмита
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     // Найдем все инпуты внутри формы
//     const inputs = Array.from(formElement.querySelectorAll(inputSelector));
//     // Найдем все сабмиты внутри формы
//     const buttonSubmit = formElement.querySelector(submitButtonSelector);

//     inputsHandler(inputs,formElement, inputValidClass, inputErrorClass, errorClass, formElement,buttonSubmit,activeButtonClass,inactiveButtonClass)
//   });
// }

// const enableValidation = ({formSelector,inputSelector, inputValidClass, inputErrorClass, submitButtonSelector,inactiveButtonClass, activeButtonClass, errorClass}) => {
//   formsHandler(formSelector, inputSelector, submitButtonSelector, inputValidClass, inputErrorClass, errorClass, activeButtonClass,inactiveButtonClass)

// };


// enableValidation(object);




// // const enableValidation = ({formSelector,inputSelector, inputValidClass, inputErrorClass, submitButtonSelector,inactiveButtonClass, activeButtonClass, errorClass}) => {
// //   formsHandler(formSelector, inputSelector, submitButtonSelector, inputValidClass, inputErrorClass, errorClass, activeButtonClass,inactiveButtonClass)
// //   // //найдем все формы
// //   // const forms = Array.from(document.querySelectorAll(formSelector));
// //   // //Сбросим дефолтное поведение сабмита
// //   // forms.forEach((formElement) => {
// //   //   //Сбросим дефолтное поведение сабмита
// //   //   formElement.addEventListener('submit', (evt) => {
// //   //     evt.preventDefault();
// //   //   });
// //   //   // Найдем все инпуты внутри формы
// //   //   const inputs = Array.from(formElement.querySelectorAll(inputSelector));
// //   //   // Найдем все сабмиты внутри формы
// //   //   const buttonSubmit = formElement.querySelector(submitButtonSelector);

// //   //   inputsHandler(inputs,formElement, inputValidClass, inputErrorClass, errorClass, formElement,buttonSubmit,activeButtonClass,inactiveButtonClass)
// //   //   // Повесим обработчик на каждый импут
// //   //   // inputs.forEach((inputElement)=>{
// //   //   //   inputElement.addEventListener('input',(evt)=>{
// //   //   //     //Выведем/спрячем ошибки
// //   //   //     // const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

// //   //   //     inputValidation(inputElement, inputValidClass, inputErrorClass, errorClass, formElement)
// //   //   //     //Проверим правильность инпутов
// //   //   //     // if (inputElement.validity.valid) {
// //   //   //     //   inputElement.classList.add(inputValidClass);
// //   //   //     //   inputElement.classList.remove(inputErrorClass);
// //   //   //     //   errorElement.textContent = '';
// //   //   //     //   errorElement.classList.remove(errorClass);

// //   //   //     // } else {
// //   //   //     //   inputElement.classList.remove(inputValidClass);
// //   //   //     //   inputElement.classList.add(inputErrorClass);
// //   //   //     //   errorElement.textContent = inputElement.validationMessage;
// //   //   //     //   errorElement.classList.add(errorClass);

// //   //   //     // }


// //   //   //     // Поработаем с кнопкой
// //   //   //     // const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);

// //   //   //     // if (!isFormValid) {

// //   //   //     //   buttonSubmit.classList.add(activeButtonClass);
// //   //   //     //   buttonSubmit.classList.remove(inactiveButtonClass);
// //   //   //     //   buttonSubmit.disabled = false;
// //   //   //     // } else {

// //   //   //     //   buttonSubmit.classList.remove(activeButtonClass);
// //   //   //     //   buttonSubmit.classList.add(inactiveButtonClass);
// //   //   //     //   buttonSubmit.disabled = true;
// //   //   //     // }
// //   //   //     buttonValidation(inputs,buttonSubmit,activeButtonClass,inactiveButtonClass)

// //   //     // });
// //   //   // });


// //   // });

// // };