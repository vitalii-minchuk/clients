import { sendClientData } from "./clientsApi.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientsForm } from "./createModalForm.js";
import { createClientsItem } from "./createClientItem.js"
import { validateClientForm } from "./validateForm.js";
import { validateClientContact } from "./validateContact.js";

export const editClientModal = (data) => {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const titleId = document.createElement('span');
  const createForm = createClientsForm();

  titleId.classList.add('modal__id');
  editModal.classList.add('modal-edit', 'modal', 'site-modal', 'modal-active');
  editModalContent.classList.add('modal-edit__content', 'modal__content', 'site-modal__content');

  
  titleId.textContent = 'ID: ' + data._id.substr(-6);
  createForm.modalTitle.textContent = 'Edit data';
  createForm.cancelBtn.textContent = 'Delete client';

  createForm.inputName.value = data.name;
  createForm.inputLastName.value = data.surname;
  createForm.inputMidlname.value = data.lastName;

  for (let contact of data.contacts) {
    const createContact = createContactItem();

    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactsBlock.prepend(createContact.contact);
    createForm.contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
  }

  createForm.cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    import(`./clientsApi.js`).then(({ deleteClientItem }) => {
      deleteModal.deleteModalDelete.addEventListener('click', () => {
        try {
          deleteModal.deleteSpinner.style.display = 'block';
          setTimeout(() => {
            deleteClientItem(data._id);
            document.getElementById(data._id).remove();
            deleteModal.deleteModal.remove();
            document.querySelector('.modal').remove();
          }, 1500);

        } catch (error) {
          console.log(error);

        } finally {
          setTimeout(() => deleteModal.deleteSpinner.style.display = 'none', 1500);
        }
      });
    });
  });

  createForm.modalClose.addEventListener('click', () => {
    editModal.remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target == editModal) {
      editModal.remove();
    }
  })

  if (data.contacts.length == 10) {
    createForm.addContactBtn.classList.remove('modal__btn-contact--active');
  }

  createForm.form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (!validateClientForm()) {
      return
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputLastName.value;
    client.lastName = createForm.inputMidlname.value;
    client.contacts = contacts;

    
    const spinner = document.querySelector('.modal__spinner');
    
    try {
      spinner.style.display = 'block';
      const editedData = await sendClientData(client, 'PATCH', data._id);
      setTimeout(() => {
        document.querySelector('.clients__tbody').replaceChild(
          createClientsItem(editedData),
          document.getElementById(editedData._id)
        );
        document.querySelector('.modal').remove();
      }, 1500);
      
    } catch (error) {
      console.log(error)

    } finally {
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 1500);
    }

  });
  
  createForm.modalTitle.append(titleId);
  editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
  editModal.append(editModalContent);

  return {
    editModal,
    editModalContent
  }  
}



// rjss