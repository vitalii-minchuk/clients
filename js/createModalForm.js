import { svgContactDefault, svgContactHover, svgSpinner } from "./svg.js";
import { createContactItem } from "./createContact.js";

export const createClientsForm = () => {
  const modalTitle = document.createElement('h2');
  const modalClose = document.createElement('button');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const labelName = document.createElement('label');
  const requiredName = document.createElement('span')
  const inputLastName = document.createElement('input');
  const labelLastName = document.createElement('label');
  const requiredLastName = document.createElement('span');
  const inputMidlname = document.createElement('input');
  const labelMidlname = document.createElement('label');
  const addContactBtn = document.createElement('button');
  const contactBtnSvgDefault = document.createElement('span');
  const contactBtnSvgHover = document.createElement('span');
  const saveBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  const contactsBlock = document.createElement('div');
  const formFloatingName = document.createElement('div');
  const formFloatingLastName = document.createElement('div');
  const formFloatingMidlname = document.createElement('div');
  const saveSpinnerSvg = document.createElement('span');

  const errorBlock = document.createElement('p');
  const unacceptableLetter = document.createElement('span');
  const writeName = document.createElement('span');
  const writeLastName = document.createElement('span');
  const writeMidlname = document.createElement('span');
  const requiredValue = document.createElement('span');
  const requiredContacts = document.createElement('span');

  saveSpinnerSvg.classList.add('modal__spinner')
  modalTitle.classList.add('modal__title');
  modalClose.classList.add('modal__close', 'btn-reset');
  form.classList.add('modal__form');
  formFloatingName.classList.add('form-floating');
  formFloatingLastName.classList.add('form-floating');
  formFloatingMidlname.classList.add('form-floating');
  inputName.classList.add('modal__input');
  inputLastName.classList.add('modal__input');
  inputMidlname.classList.add('modal__input');
  labelName.classList.add('modal__label');
  labelLastName.classList.add('modal__label');
  labelMidlname.classList.add('modal__label');
  requiredName.classList.add('modal__label',);
  requiredLastName.classList.add('modal__label');
  addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--active');
  saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
  cancelBtn.classList.add('modal__btn-back', 'btn-reset');
  contactBtnSvgDefault.classList.add('btn-contact__svg', 'btn-contact__svg--default', 'btn-contact__svg--active');
  contactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover');
  contactsBlock.classList.add('modal__contact');
  labelName.for = 'floatingName';
  labelLastName.for = 'floatingLastName';
  labelMidlname.for = 'floatingMidlname';
  inputName.id = 'floatingName';
  inputLastName.id = 'floatingLastName';
  inputMidlname.id = 'floatingMidlname';
  inputName.type = 'text';
  inputLastName.type = 'text';
  inputMidlname.type = 'text';
  inputName.placeholder = 'Name';
  inputLastName.placeholder = 'Surname';
  inputMidlname.placeholder = 'Middle name';
  
  errorBlock.classList.add('modal__error');
  unacceptableLetter.id = 'unacceptableLetter';
  writeName.id = 'writeName';
  writeLastName.id = 'writeLastName';
  writeMidlname.id = 'writeMidlname';
  requiredValue.id = 'requiredValue';
  requiredContacts.id = 'requiredContacts';

  saveSpinnerSvg.innerHTML = svgSpinner;
  modalTitle.textContent = 'New client';
  labelName.textContent = 'Name';
  labelLastName.textContent = 'Surname';
  labelMidlname.textContent = 'Middle name';
  addContactBtn.textContent = 'Add contact';
  saveBtn.textContent = 'Save';
  cancelBtn.textContent = 'Cancel';
  requiredName.textContent = '*';
  requiredLastName.textContent = '*';
  contactBtnSvgDefault.innerHTML = svgContactDefault;
  contactBtnSvgHover.innerHTML = svgContactHover;

  saveBtn.append(saveSpinnerSvg);
  labelName.append(requiredName);
  labelLastName.append(requiredLastName);
  formFloatingName.append(inputName, labelName);
  formFloatingLastName.append(inputLastName, labelLastName);
  formFloatingMidlname.append(inputMidlname, labelMidlname);
  errorBlock.append(
    unacceptableLetter,
    writeName,
    writeLastName,
    writeMidlname,
    requiredValue,
    requiredContacts
  );
  contactsBlock.append(addContactBtn);
  form.append(
    formFloatingName,
    formFloatingLastName,
    formFloatingMidlname,
    contactsBlock,
    errorBlock,
    saveBtn,
    cancelBtn
  );
  addContactBtn.append(contactBtnSvgDefault, contactBtnSvgHover);
  

  addContactBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const contactsItems = document.getElementsByClassName('contact');
    if (contactsItems.length < 9) {
      const contactItem = createContactItem();
      contactsBlock.prepend(contactItem.contact);
      contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
      switch (contactsItems.length) {
        case 3:
          document.querySelector('.site-modal__content').style.top = '55%';
          break;
        case 4:
          document.querySelector('.site-modal__content').style.top = '60%';
          break;
        case 5:
          document.querySelector('.site-modal__content').style.top = '65%';
          break;
        case 6:
          document.querySelector('.site-modal__content').style.top = '70%';
          break;
        case 7:
          document.querySelector('.site-modal__content').style.top = '75%';
          break;
        case 8:
          document.querySelector('.site-modal__content').style.top = '80%';
          break;
        case 9:
          document.querySelector('.site-modal__content').style.top = '85%';
          break;
        default:
          document.querySelector('.site-modal__content').style.top = '50%';
          break;
      }
    } else {
      const contactItem = createContactItem();
      contactsBlock.prepend(contactItem.contact);
      addContactBtn.classList.remove('modal__btn-contact--active');
      document.querySelector('.site-modal__content').style.top = '90%';
    }
  });

  addContactBtn.addEventListener('mousemove', () => {
    contactBtnSvgDefault.classList.remove('btn-contact__svg--active');
    contactBtnSvgHover.classList.add('btn-contact__svg--active')
  });

  addContactBtn.addEventListener('mouseleave', () => {
    contactBtnSvgDefault.classList.add('btn-contact__svg--active');
    contactBtnSvgHover.classList.remove('btn-contact__svg--active')
  });

  return {
    form,
    modalClose,
    modalTitle,
    cancelBtn: cancelBtn,
    inputName,
    inputLastName,
    inputMidlname,
    labelName,
    labelLastName,
    labelMidlname,
    contactsBlock,
    addContactBtn
  }
}