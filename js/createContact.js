import { svgDelete } from "./svg.js";

export const createContactItem = () => {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('button');
  const contactList = document.createElement('ul');
  const contactPhone = document.createElement('li');
  const contactVk = document.createElement('li');
  const contactFb = document.createElement('li');
  const contactEmail = document.createElement('li');
  const contactOther = document.createElement('li');
  const contactInput = document.createElement('input');
  const contactDelete = document.createElement('button');
  const contactDeleteTooltip = document.createElement('span');

  contact.classList.add('contact');
  contactDeleteTooltip.classList.add('contact__tooltip', 'site-tooltip');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactList.classList.add('contact__list', 'list-reset');
  contactPhone.classList.add('contact__item');
  contactVk.classList.add('contact__item');
  contactFb.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete', 'btn-reset');

  contactName.textContent = 'Phone';
  contactDeleteTooltip.textContent = 'delete contact';
  contactPhone.textContent = 'Phone';
  contactEmail.textContent = 'Email';
  contactVk.textContent = 'VK';
  contactFb.textContent = 'Facebook';
  contactOther.textContent = 'Other';
  contactInput.placeholder = 'Please enter contact';
  contactInput.type = 'text';
  contactDelete.innerHTML = svgDelete;

  contactDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    contact.remove();
    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
  });

  contactName.addEventListener('click', (evt) => {
    evt.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
    contactDelete.classList.toggle('contact__delete--hide');
  });

  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactName.classList.remove('contact__list--active');
    contactDelete.classList.remove('contact__delete--hide');
  });

  const typesArray = [
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther
  ];
  const setType = (type) => {
    type.addEventListener('click', () => {
      contactList.classList.remove('contact__list--active');
      contactName.classList.remove('contact__list--active');
      contactName.textContent = type.textContent;
    });
  }
  for (let type of typesArray) {
    setType(type);
  }

  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther,
    contactOther
  );

  return {
    contact,
    contactName,
    contactInput,
    contactDelete
  }
}