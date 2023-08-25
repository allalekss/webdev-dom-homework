
import {  commentsElement} from "./main.js";
import { getLikeButton} from "./like.js";



// HTML код через JS
export const renderComments = (comments) => {

  const commentsHtml = comments.map((comment, index) => {   
      const commentDate = new Date(comment.date);
      const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
    return `<li class="comment">
    <div class="comment-header">
    <div>${comment.name}
          </div>
          <div class="date">${timeDate}</div>
        </div>
        <div class="comment-body">
          <div class="comments-text">
            ${comment.text}
          </div></div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter"> ${comment.likes}</span>
            <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
            </div>
        </div>
      </li>`}).join("");
    
    commentsElement.innerHTML = commentsHtml;
    
    getLikeButton(comments);  
    };
    