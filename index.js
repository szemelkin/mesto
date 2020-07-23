//Конпки для едкатирования прфиля
const openModalButton = document.querySelector('.profile__edit-button');
//const closeModalButton = document.querySelector('.modal__close-button');
const openAddCardButton = document.querySelector('.profile__add-button')

//Модальная форма для редактирования профиля//
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const inputName = document.querySelector('.modal__input_type_name');
const inputStatus = document.querySelector('.modal__input_type_status');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

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

//Вставляем карточки
const cardsListElement = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template');
const card = elementTemplate.content.cloneNode(true);
const cardLikeButton = card.querySelector('.element__heart');
const cardDeleteButton = card.querySelector('.element__delete');


//const modalTemplate = document.querySelector('.modal-template');




function addCard(data) {
  const card = elementTemplate.content.cloneNode(true);
  const cardLikeButton = card.querySelector('.element__heart');
  const cardDeleteButton = card.querySelector('.element__delete');

  card.querySelector('img').src = data.link;
  card.querySelector('.element__title').textContent = data.name;
  cardsListElement.prepend(card)

}

initialCards.forEach(data => {
  addCard(data);
})


//Добавление формы при работе с профилем
function toggleModal() {

  if (!modal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputStatus.value = profileText.textContent;
  }

  modal.classList.toggle('modal_is-open');
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileText.textContent = inputStatus.value;

  toggleModal();

})


openModalButton.addEventListener('click', toggleModal);

//closeModalButton.addEventListener('click', toggleModal);

const openFormAddCard = document.querySelector('.profile__add-button');

openFormAddCard.addEventListener('click', addModalForm);


const closeModalButton = document.querySelector('.modal__close-button');
closeModalButton.addEventListener('click', closeModalForm);








//Добавлене карточек с помощью шаблона

//openAddCardButton.addEventListener('click', toggleAddCardModal);

//Поучаем элемент внутри тега темплейта формы
const templateModalForm = document.querySelector('.modal-template');
//Клонируем
const templateModalFormClone = templateModalForm.cloneNode(true);


//Получаем элемент внутри темплейта
const templateModalContent = templateModalFormClone.content;

//Находим нужный класс
const templateModalSection = templateModalContent.querySelector('.modal');

//Добавляем форму из темплейта
//templateModalSection.classList.add('modal_is-open');

//Определяем относительного какого ДОМ будем вставлять
const elementBody= document.querySelector('body');

//Добавляем в темплейт ДОМ

//elementBody.append(templateModalContent);


function addModalForm() {
  templateModalSection.classList.toggle('modal_is-open');
  elementBody.append(templateModalContent);

}


function closeModalForm(e) {
  const templateModalContent = e.target.closest('.modal');
  console.log(templateModalContent);
  templateModalContent.remove();
}





