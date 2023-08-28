// Функция рендера списка комментариев
import {
  initAddComments,
  initAddLikesListenerForEnter,
  getLikeButton,
} from './like.js';
import { name } from './api.js';

export function renderAuthorizationPage({
  comments,
  handleFormSubmission,
}) {
  const commentsHtml = comments
    .map((comment, index) => {
      const commentDate = new Date(comment.date);
    const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();

      return `
  <li class="comment">
  <div class="comment-header" data-index="${index}">
    <div>${comment.name}</div>
    <div>${timeDate}</div>
  </div>
  <div class="comment-body">
    <div class="comment-area edit-hidden" data-hidden="${!comment.isEdit}">
     <textarea class="comment-area-edit" type="textarea" name="edit-text "data-index="${index}">${
        comment.text
      }</textarea>
    </div>
    <div class="comment-text edit-hidden" style="white-space: pre-line" data-hidden="${
      comment.isEdit
    }" data-index="${index}">
      ${comment.text}
    </div>
  </div>
  <div class="comment-footer">
  <div class="likes">
  <span class="likes-counter"> ${comment.likes}</span>
  <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
  </div>
  </div>
  <div class="edit hidden">
  <button class="edit-button edit-hidden" data-index="${index}" data-hidden="${
        comment.isEdit
      }">Редактировать</button>
  <button class="edit-button-save edit-hidden" data-index="${index}" data-hidden="${!comment.isEdit}">Сохранить</button>
</div>
</li>`;
    })
    .join('');

  const appHtml = `
  <div class="container">
    <ul class="comments">
      ${commentsHtml}
    </ul>
    <div class="add-form">
      <input type="text" class="add-form-name add-form-input" placeholder="${name}" value="${name}" readonly/>
      <textarea type="textarea" class="add-form-text add-form-input" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <div class="comment-header add-form promise-add hidden" data-index="">
    Комментарий добавляется...
    </div>
</div>
`;

  const app = document.querySelector('.app');
  app.innerHTML = appHtml;

  
  const buttonElement = document.querySelector('.add-form-button');
  

  initAddComments({ buttonElement, handleFormSubmission });
  initAddLikesListenerForEnter({ handleFormSubmission });
  getLikeButton(comments);
}

