let openModalButton = document.querySelector('.profile__edit_button');
let closeModalButton = document.querySelector('.modal__close-button');
let modal = document.querySelector('.modal');
let form = document.querySelector('.modal__form');

let inputName = document.querySelector('.modal__input_type_name');
let inputStatus = document.querySelector('.modal__input_type_status');

let profileName = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');




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



