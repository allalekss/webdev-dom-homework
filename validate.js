// Валидация
export function validateForm(textInputElement) {
  if (textInputElement.value === '') {
    textInputElement.classList.add('error');
  }
}
