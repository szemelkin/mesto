const openModalButton = document.querySelector('.profile__edit_button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');

const inputName = document.querySelector('.modal__input_type_name');
const inputStatus = document.querySelector('.modal__input_type_status');

const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');




function toggleModal() {
  modal.classList.toggle('modal_is-open')
}

openModalButton.addEventListener('click', toggleModal);


closeModalButton.addEventListener('click', (e) => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileText.textContent;
  toggleModal()
  e.preventDefault();
});


form.addEventListener('submit', (e) => {

  profileName.textContent = inputName.value;
  profileText.textContent = inputStatus.value;

  toggleModal();

  e.preventDefault();

})



