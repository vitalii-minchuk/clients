import { contactTooltip } from "./createTooltip.js";
import { svgPhone, svgVk, svgEmail, svgFb, svgOther } from "./svg.js";

export const formatDate = data => {
  const newDate = new Date(data);
  const correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const resultDate = newDate.toLocaleString('ua', correctDate);

  return resultDate;
} 

export const formatTime = data => {
  const newDate = new Date(data);
  const correctDate = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }
  const resultTime = newDate.toLocaleString('ua', correctDate);

  return resultTime;
}

export const createContactLink = (type, value, element, svg, item) => {
  const setTooltip = contactTooltip(type, value);

  element = document.createElement('a');
  element.classList.add('clients__contacts-link');
  element.innerHTML = svg;

  if (type === 'Email') {
    element.href =`mailto: ${value.trim()}`;
  } else if (type === 'Phone') {
    element.href =`tel: ${value.trim()}`;
    setTooltip.tooltipValue.style.color = 'var(--color-white)';
    setTooltip.tooltipValue.style.textDecoration = 'none';
  } else {
    element.href = value.trim();
    setTooltip.tooltipValue.style.color = 'var(--color-white)';
    setTooltip.tooltipValue.style.textDecoration = 'none';
  }

  element.append(setTooltip.tooltip);
  item.append(element);
}

export const createClientsItemByType = (type, value, item) => {
  switch (type) {
    case 'Phone':
      let phone;
      createContactLink(type, value, phone, svgPhone, item);
      break;
    case 'Facebook':
      let facebook;
      createContactLink(type, value, facebook, svgFb, item);
      break;
    case 'Email':
      let email;
      createContactLink(type, value, email, svgEmail, item);
      break;
    case 'VK':
      let vk;
      createContactLink(type, value, vk, svgVk, item);
      break;
    case 'Other':
      let other;
      createContactLink(type, value, other, svgOther, item);
      break;
    default:
      break;
  }
}