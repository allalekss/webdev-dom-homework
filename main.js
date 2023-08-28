'use strict';
import { validateForm } from './validate.js';
import { getTodos, postTodo, getTodosAuthorization } from './api.js';
import { renderAuthorizationPage } from './render.js';
import { renderMarkup } from './renderMarkup.js';
import { renderLogin } from './pagelogin.js';

export let  comments = [];

const promiseLoad = document.querySelector('.promise-load');

// Запрос на сервер для получения данных комментариев без авторизации
export function getAPI() {
  getTodos()
  .then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes:comment.likes,
        isLiked: false,
        propertyColorLike: 'like-button -no-active-like',    
      }
    })
    comments = appComments;
      renderMarkup({
        comments,
        renderLogin,
        fetchPromiseWithAuthorization,
      });
    })
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка, попробуйте повторить позже');
    });
}

  

// Отображение списка комментариев на экране неавторизованному пользователю
getAPI();

// Запрос на сервер для получения данных комментариев с авторизацией
function fetchPromiseWithAuthorization() {
  getTodosAuthorization()
    .then((response) => {
      console.log(response);
      comments = response;
      promiseLoad.classList.add('hidden');
      renderAuthorizationPage({
        comments,
        handleFormSubmission,
      });
    })
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка, попробуйте повторить позже');
    });
}

// Создаём фунцию-генератор карточек
function appendComment(userName, userComment) {
  const textInputElement = document.querySelector('.add-form-text');
  const form = document.querySelector('.add-form');
  const promiseAdd = document.querySelector('.promise-add');

  form.classList.add('hidden');
  promiseAdd.classList.add('hidden');

  postTodo(userName, userComment)
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error('Вы не авторизованы');
      } else if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов');
      } else {
        /*повторный запрос на сервер при ошибке 500 */
        appendComment(userName, userComment);
        throw new Error('Сервер сломался, попробуйте позже');
      }
    })
    .then(() => {
      return fetchPromiseWithAuthorization();
    })
    .then(() => {
      form.classList.remove('hidden');
      promiseAdd.classList.remove('hidden');
      textInputElement.value = '';
    })
    .catch((error) => {
      if (
        error.message !== 'Failed to fetch'
          ? alert(`${error.message}`)
          : alert('Кажется, у вас сломался интернет, попробуйте позже')
      );
      form.classList.toggle('hidden');
      promiseAdd.classList.toggle('hidden');
    });
  renderAuthorizationPage({
    comments,
    handleFormSubmission,
    
  });
}

// Функция обработки при нажатии на кнопку "написать"

function handleFormSubmission() {
  const nameInputElement = document.querySelector('.add-form-name');
  const  textInputElement = document.querySelector('.add-form-text');
  const inputValue = nameInputElement.value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const areaFormValue = textInputElement.value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
    .replaceAll('QUOTE_END', '</div>');
  inputValue === '' || areaFormValue === ''
    ? validateForm(textInputElement)
    : appendComment(inputValue, areaFormValue);
}
