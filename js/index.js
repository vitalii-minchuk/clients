import { createClientHeader } from "./createHeader.js";
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientsItem } from "./createClientItem.js";
import { sortTable } from "./sortClientsTable.js";
import { searchClients } from "./searchClient.js";


const createApp = async () => {
  const header = createClientHeader();
  const clientSection = createClientsSection();
  const preloader = clientSection.preloader;
  document.body.append(header, clientSection.main);
  const btn = document.querySelector('.clients__btn');
  btn.classList.add('clients__btn--hide');
  
  try {
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      document.querySelector('.clients__tbody').append(createClientsItem(client));
    }

  } catch (error) {
    console.log(error)

  } finally {
    setTimeout(() => {
      preloader.remove();
      btn.classList.remove('clients__btn--hide');
    }, 2000);
  }
}

createApp();
document.addEventListener('DOMContentLoaded', sortTable());

