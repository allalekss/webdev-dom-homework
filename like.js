import { renderAuthorizationPage } from './render.js';
import { comments } from './main.js';

// Вешаем обработчик событий на кнопку add comment
export function initAddComments({ buttonElement, handleFormSubmission }) {
  buttonElement.addEventListener('click', () => {
    handleFormSubmission();
  });
}

// Вешаем обработчик событий на клавишу enter
export function initAddLikesListenerForEnter({ handleFormSubmission }) {
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
      handleFormSubmission();
    }
  });
}



// Функция изменения кнопки лайка 
  

export function getLikeButton () {
  const likesButton = document.querySelectorAll('.like-button');
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      const likeIndex = like.dataset.index;
      const commentsElement = comments[likeIndex];
      event.stopPropagation();
      if (commentsElement.isLiked) {
        commentsElement.likes -= 1;
        commentsElement.isLiked = false;
        commentsElement.propertyColorLike = 'like-button -no-active-like'; 
              renderAuthorizationPage({
        comments,
        handleFormSubmission,
      });
      } else {
        commentsElement.likes += 1;
        commentsElement.isLiked = true;
        commentsElement.propertyColorLike = 'like-button -active-like';  
      }      
      renderAuthorizationPage({
        comments,
        handleFormSubmission,
      });    
    });	      
  };   
};






