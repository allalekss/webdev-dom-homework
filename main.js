import { getTodos,postTodo} from "./api.js";
import { renderComments} from "./render.js";
import { getLikeButton} from "./like.js";

const form = document.querySelector('.add-form');
export const nameInputElement = document.querySelector('.add-form-name');
export const textInputElement = document.querySelector('.add-form-text');
export const buttonElement = document.querySelector('.add-form-button');
export const commentsElement = document.querySelector('.comments');
// const buttonElementDel = document.querySelector('.delete-form-button');
// const arrayInputs = [nameInputElement, textInputElement];
// const host = "https://wedev-api.sky.pro/api/v1/ala-sharova/comments";
// const listElement = document.getElementById("list");
const commentsLoading = document.querySelector('.loader');
const commentLoading = document.querySelector('.loader_1');
export let comments = [];


  
// Функция getAPI позволяет получать данные с сервера

const getAPI = () => {
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
renderComments(comments);
})
.then(() => {
commentsLoading.style.display = 'none';
})
};

getAPI();

// Функция postAPI позволяет отправлять данные на сервер
const postAPI = (nameInputElement, textInputElement) => {
  form.style.display = 'none';
  commentLoading.style.display = 'flex';
  postTodo()
.then((responseData) => {
      comments = responseData.todos;
      getAPI();
    })
.then(() => {
  nameInputElement.value = '';
  textInputElement.value = '';	
  form.style.display = 'flex';
  commentLoading.style.display = 'none';
})
.catch((error) =>{
  form.style.display = 'flex';
  commentLoading.style.display = 'none';
  if (error.message === "Сервер сломался") {
    alert("Сервер сломался, попробуйте позже");

  } else if (error.message === "Плохой запрос") {
    alert("Имя и комментарий должны быть не короче 3 символов");

  } else {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    console.warn(error);
  }
})
};	   




getLikeButton();



// комментарий вводимый пользователем добавляем в массив

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');
  if(nameInputElement.value === "" || textInputElement === "") {
      textInputElement.classList.add('error');
      nameInputElement.classList.add('error');
      return;
  } 
  textInputElement.classList.remove('error');
  postAPI(nameInputElement, textInputElement);
})
  
renderComments(comments);


console.log("It works!");


