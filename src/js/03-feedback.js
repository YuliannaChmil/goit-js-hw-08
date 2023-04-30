import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('input', throttle(inputData, 500));
refs.form.addEventListener('submit', onSubmit);

resultFeedback();

function inputData(event) {
  formData = {
    email: refs.input.value.trim(),
    message: refs.textarea.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;
  console.log({ email: email.value.trim(), message: message.value.trim() });
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}

function resultFeedback() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  formData = JSON.parse(data);
  refs.input.value = formData.email ?? '';
  refs.textarea.value = formData.message ?? '';
}
