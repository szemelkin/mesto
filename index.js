const openModalButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');

const inputName = document.querySelector('.modal__input_type_name');
const inputStatus = document.querySelector('.modal__input_type_status');

const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

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

const cardsListElement = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template');


function addCard(link, name) {
  const card = elementTemplate.content.cloneNode(true);
  card.querySelector('img').src = link;
  card.querySelector('.element__title').textContent = name;
  cardsListElement.prepend(card)

}

initialCards.forEach(card => {
  addCard(card.link, card.name);
})



function toggleModal() {

  if (!modal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputStatus.value = profileText.textContent;
  }

  modal.classList.toggle('modal_is-open');
}

openModalButton.addEventListener('click', toggleModal);


closeModalButton.addEventListener('click', toggleModal);


form.addEventListener('submit', (e) => {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileText.textContent = inputStatus.value;

  toggleModal();

})



