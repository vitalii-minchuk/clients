import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";
import { createClientsItemByType, formatDate, formatTime } from "./utils.js";

export const createClientsItem = (data) => {
  const clientTr = document.createElement('tr');
  const clientIdTd = document.createElement('td');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientName = document.createElement('span');
  const clientLastName = document.createElement('span');
  const clientMidlname = document.createElement('span');
  const clientCreated = document.createElement('td');
  const createdDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);
  const editSpinner = document.createElement('span')
  const deleteSpinner = document.createElement('span')

  editSpinner.classList.add('actions__spinner');
  deleteSpinner.classList.add('actions__spinner');
  clientTr.classList.add('clients__item');
  clientTr.id = data._id;
  clientIdTd.classList.add('clients__id');
  clientFullName.classList.add('clients__full-name');
  clientName.classList.add('clients__name');
  clientLastName.classList.add('clients__last-name');
  clientMidlname.classList.add('clients__midlname');
  clientCreated.classList.add('clients__created');
  createdDate.classList.add('crated__date');
  createdTime.classList.add('crated__time');
  clientChanged.classList.add('clients__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('clients__contacts');
  clientActions.classList.add('clients__actions')
  clientDelete.classList.add('clients__delete', 'btn-reset');
  clientEdit.classList.add('clients__edit', 'btn-reset');

  for (let contact of data.contacts) {
    createClientsItemByType(contact.type, contact.value, clientContacts)
  }

  const deleteById = () => {
    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteClient.deleteModalDelete.addEventListener('click', () => {
        try {
          deleteClient.deleteSpinner.style.display = 'block';
          setTimeout(() => {
            deleteClientItem(data._id);
            document.getElementById(data._id).remove();
            deleteClient.deleteModal.remove();
          }, 1500);

        } catch (error) {
          console.log(error);

        } finally {
          setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 1500);
        }
      });
    });
  }

  clientDelete.addEventListener('click', () => {
    clientDelete.classList.add('actions-white');
    deleteSpinner.style.display = 'block';

    setTimeout(() => {
      deleteById();
      document.body.append(deleteClient.deleteModal);

      clientDelete.classList.remove('actions-white');
      deleteSpinner.style.display = 'none';
    }, 1000)
  })
  
  clientEdit.addEventListener('click', () => {
    clientEdit.classList.add('actions-white');
    editSpinner.style.display = 'block';

    setTimeout(() => {
      document.body.append(editClient.editModal);

      clientEdit.classList.remove('actions-white');
      editSpinner.style.display = 'none';
    }, 1000);
  });

  deleteSpinner.innerHTML = svgSpinner;
  editSpinner.innerHTML = svgSpinner;
  clientId.textContent = data._id.substr(-6);
  clientName.textContent = data.name;
  clientLastName.textContent = data.surname;
  clientMidlname.textContent = data.lastName;
  clientEdit.textContent = 'Edit';
  clientDelete.textContent = 'Delete';
  createdDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);

  clientIdTd.append(clientId);
  clientDelete.append(deleteSpinner);
  clientEdit.append(editSpinner);
  clientFullName.append(clientLastName, clientName, clientMidlname);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientChanged.append(changedDate, changedTime);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(
    clientIdTd,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return clientTr;
}