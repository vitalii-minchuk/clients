export const validateClientForm = () => {
  const userName = document.getElementById('floatingName');
  const userLastName = document.getElementById('floatingLastName');
  const userMidlname = document.getElementById('floatingMidlname');
  const unacceptableLetter = document.getElementById('unacceptableLetter');
  const writeName = document.getElementById('writeName');
  const writeLastName = document.getElementById('writeLastName');
  const writeMidlname = document.getElementById('writeMidlname');
  const requiredValue = document.getElementById('requiredValue');
  const regexp = /[^a-zA-Z]+$/g;
  const validateArray = [
    unacceptableLetter,
    writeName,
    writeLastName,
    writeMidlname,
    requiredValue
  ];

  const onInputValue = (input) => {
    input.addEventListener('input', () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      for (let item of validateArray) {
        item.textContent = '';
      }
    });

    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      for (let item of validateArray) {
        item.textContent = '';
      }
    };

    input.onchange = () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      if (userName.value && userLastName.value && userMidlname.value) {
        input.textContent = '';
      }
    }
  }

  onInputValue(userName);
  onInputValue(userLastName);
  onInputValue(userMidlname);

  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderBottomColor = 'var(--color-burnt-sienna)';
      message.textContent = `Please enter clients ${name}!`;
      
      return false;
    } else {
      message.textContent = '';
    }

    return true;
  }

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderBottomColor = 'var(--color-burnt-sienna)';
      unacceptableLetter.textContent = `Invalid characters!`;

      return false;
    }

    return true;
  }

  if (!checkRequiredName(userLastName, writeLastName, 'surname')) {return false};
  if (!checkRequiredName(userName, writeName, 'name')) {return false};
  if (!checkRequiredName(userMidlname, writeMidlname, 'middle name')) {return false};
  if (!checkByRegexp(userName, regexp)) {return false};
  if (!checkByRegexp(userLastName, regexp)) {return false};
  if (!checkByRegexp(userMidlname, regexp)) {return false};

  return true
}