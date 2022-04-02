export const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById('requiredContacts');
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|0-9|@|.]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      writeValue.textContent = '';
    });

    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      writeValue.textContent = '';
    };
  }

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderBottomColor =  'var(--color-burnt-sienna)';
  }

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('Fields of the contacts must be completed', writeValue, contactInput);
    return false;
  }

  switch (contactType.innerHTML) {
    case 'Phone':
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage('Numbers only', writeValue, contactInput);

        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('Telephone numbers are 11 digit numbers!', writeValue, contactInput);

        return false;
      }

    return true;

    case 'Email':
      if (onlyEmail.test(contactInput.value)) {
        showErrorMessage('Wrong email!', writeValue, contactInput);

        return false;
      }

    return true;
    
    default:

    return true
  }
}