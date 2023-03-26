import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputSubmit), 500);
formEl.addEventListener('submit', onFormSubmit);

let formText = {};

populateForm();

function onInputSubmit(event) {
  formText[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formText));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (formEl.email.value === '' || formEl.message.value === '') {
    alert('Заповни поля!!!');
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  console.log(formText);
  event.currentTarget.reset();
  formText = {};
}

function populateForm() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    formText = savedMessage;

    for (const key in formText) {
      formEl.elements[key].value = formText[key];
    }
  }
}
