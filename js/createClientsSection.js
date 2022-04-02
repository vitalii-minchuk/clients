import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClientsSection = () => {
  const section = document.createElement('section');
  const h1 = document.createElement('h1');
  const container = document.createElement('div');
  const main = document.createElement('main');
  const sortingDisplay = document.createElement('thead');
  const theadTR = document.createElement('tr');
  const sortingDisplayId = document.createElement('th');
  const sortingDisplayName = document.createElement('th');
  const sortingDisplayCreate = document.createElement('th');
  const sortingDisplayEdit = document.createElement('th');
  const sortingDisplayContacts = document.createElement('th');
  const sortingDisplayActions = document.createElement('th');
  const sortingDisplaySpan = document.createElement('span');
  const addUserBtn = document.createElement('button');
  const addUserBtnSvg = document.createElement('span');
  const tableWrapper = document.createElement('div');
  const clientsTable = document.createElement('table');
  const tbody = document.createElement('tbody');
  const createSpan = document.createElement('span');
  const editSpan = document.createElement('span');
  const preloader = createPreloader();

  sortingDisplayId.setAttribute('data-type', 'id');
  sortingDisplayName.setAttribute('data-type', 'text');
  sortingDisplayCreate.setAttribute('data-type', 'create');
  sortingDisplayEdit.setAttribute('data-type', 'update');

  sortingDisplayId.addEventListener('click', () => {
    if (sortingDisplayId.classList.contains('sort-down')) {
      sortingDisplayId.classList.remove('sort-down');
      sortingDisplayId.classList.add('sort-up');
    } else {
      sortingDisplayId.classList.add('sort-down');
      sortingDisplayId.classList.remove('sort-up');
    }
  });

  sortingDisplayName.addEventListener('click', () => {
    if (sortingDisplayName.classList.contains('sort-down')) {
      sortingDisplaySpan.textContent = 'a-z';
      sortingDisplayName.classList.remove('sort-down');
      sortingDisplayName.classList.add('sort-up');
    } else {
      sortingDisplaySpan.textContent = 'z-a';
      sortingDisplayName.classList.remove('sort-up');
      sortingDisplayName.classList.add('sort-down');
    }
  });

  sortingDisplayCreate.addEventListener('click', () => {
    if (sortingDisplayCreate.classList.contains('sort-down')) {
      sortingDisplayCreate.classList.remove('sort-down');
      createSpan.classList.add('sort-up');
    } else {
      createSpan.classList.remove('sort-up');
      sortingDisplayCreate.classList.add('sort-down');
    }
  });
  sortingDisplayEdit.addEventListener('click', () => {
    if (sortingDisplayEdit.classList.contains('sort-down')) {
      sortingDisplayEdit.classList.remove('sort-down');
      editSpan.classList.add('sort-up');
    } else {
      editSpan.classList.remove('sort-up');
      sortingDisplayEdit.classList.add('sort-down');
    }
  });

  section.classList.add('clients');
  tableWrapper.classList.add('clients__wrapper');
  h1.classList.add('clients__heading');
  tbody.classList.add('clients__tbody');
  sortingDisplay.classList.add('clients__display', 'display-info');
  sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
  sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-down');
  sortingDisplayCreate.classList.add('display-info__item', 'display-info__item--create', 'sort-down');
  sortingDisplayEdit.classList.add('display-info__item', 'display-info__item--change', 'sort-down');
  sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
  sortingDisplayActions.classList.add('display-info__item', 'display-info__item--actions');
  sortingDisplaySpan.classList.add('display-info__sorting');
  addUserBtn.classList.add('clients__btn', 'btn-reset');
  addUserBtnSvg.classList.add('clients__svg');
  container.classList.add('container', 'clients__container');
  main.classList.add('main');
  clientsTable.classList.add('clients__table');
  createSpan.classList.add('create__span');
  editSpan.classList.add('change__span');

  h1.textContent = 'Clients';
  sortingDisplayId.textContent = 'id';
  sortingDisplayName.textContent = 'Client full name ';
  sortingDisplaySpan.textContent = 'a-z';
  sortingDisplayCreate.textContent = 'of creation';
  sortingDisplayEdit.textContent = 'Latest';
  sortingDisplayContacts.textContent = 'Contacts';
  sortingDisplayActions.textContent = 'Actions';
  addUserBtn.textContent = 'Add client';
  addUserBtnSvg.innerHTML = svgAddUser;

  addUserBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.append(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTR.append(
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayCreate,
    sortingDisplayEdit,
    sortingDisplayContacts,
    sortingDisplayActions
  );
  sortingDisplay.append(theadTR);
  tableWrapper.append(clientsTable);
  clientsTable.append(sortingDisplay, tbody);
  tbody.append(preloader);
  addUserBtn.append(addUserBtnSvg);
  container.append(h1, tableWrapper, addUserBtn);

  return {
    main,
    clientsTable,
    tbody,
    preloader
  }
}