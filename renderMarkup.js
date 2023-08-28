// Функция рендера списка комментариев
const app = document.querySelector('.app');

export function renderMarkup({
  comments,
  renderLogin,
  fetchPromiseWithAuthorization,
}) {
  const usersNoRegisterHtml = comments
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
          <span class="likes-counter" data-index="${index}" data-count="${
        comment.likes
      }">${comment.likes}</span>
          <button class="like-button" data-index="${index}"  data-active-like="${
        comment.isLiked
      }" data-is-like-loading="${comment.isLikeLoading}"></button>
        </div>
      </div>
      <div class="edit hidden">
      <button class="edit-button edit-hidden" data-index="${index}" data-hidden="${
        comment.isEdit
      }">Редактировать</button>
      <button class="edit-button-save edit-hidden" data-index="${index}" data-hidden="${!comment.isEdit}">Сохранить</button>
    </div>
    </li>
    `;
    })
    .join('');

  const appNoRegisterHtml = `  
  <div class="container">
<ul class="comments">
  ${usersNoRegisterHtml}
</ul>
<p class="add-text">Чтобы добавить комментарий, <button class="add-button">авторизуйтесь</button></p>
</div>`;

  app.innerHTML = appNoRegisterHtml;
  
  const buttonAuthorization = document.querySelector('.add-button');

  // события на кнопке авторизоваться
  buttonAuthorization.addEventListener('click', () => {
    console.log('click');
    renderLogin({ fetchPromiseWithAuthorization });
  });
}

