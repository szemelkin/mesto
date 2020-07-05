const openModalButton = document.querySelector('.profile__edit_button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');

function closeModal() {
  modal.classList.toggle('modal_is-open')
}

openModalButton.addEventListener('click', closeModal)


closeModalButton.addEventListener('click', closeModal)
