import { findClient } from "./clientsApi.js";
import { createClientsItem } from "./createClientItem.js";

export const searchClients = (clients) => {
  const findList = document.querySelector('.find-list');
  const input = document.querySelector('.header__input');

  clients.forEach((client) => {
    const findItem = document.createElement('li');
    const findLink = document.createElement('a');

    findItem.classList.add('find__list-item');
    findLink.classList.add('find__list-link');

    findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
    findLink.href = '#';

    findItem.append(findLink);
    findList.append(findItem);
  });

  const rewriteTable = async (str) => {
    
    const response = await findClient(str);
    
    const tbody = document.querySelector('.clients__tbody');
    tbody.innerHTML = '';

    for (let client of response) {
      tbody.append(createClientsItem(client));
    }
  }

  input.addEventListener('input', async () => {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll('.find__list-link');

    if (value !== '') {
      rewriteTable(value);

      foundItems.forEach((link) => {
        
        if (link.innerText.search(value) == -1) {
          link.classList.add('hide');
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove('hide');
          findList.classList.remove('hide');
          const str = link.innerText;
          link.innerHTML = insertMark(str, link.innerText.search(value), value.length)
        }
      });
    } else {
      foundItems.forEach((link) => {
        const tbody = document.querySelector('.clients__tbody');
      
        tbody.innerHTML = '';

        clients.forEach(client => tbody.append(createClientsItem(client)));

        link.classList.remove('hide');
        findList.classList.add('hide');
        link.innerHTML = link.innerText;
      })
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target !== findList && e.target !==input) {
      findList.classList.add('hide');
    }
  });

  const insertMark = (str, pos, length) => str
    .slice(0, pos) + '<mark>' + str
    .slice(pos, pos + length) + '</mark>' + str
    .slice(pos + length);

}