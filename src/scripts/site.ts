import { content, isLanguage, type Language, type LocalizedContent } from '../data/content';
import { siteConfig } from '../data/site';
import { buildContactMailto, buildReservationMailto } from '../utils/mailto';

const STORAGE_KEY = 'imperial.language.v1';
let currentLanguage: Language = 'de';
let activeCategory = content.de.menu.categories[0].id;

function getNestedValue(source: LocalizedContent, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((accumulator, key) => {
    if (accumulator && typeof accumulator === 'object' && key in accumulator) {
      return (accumulator as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
  return typeof value === 'string' ? value : undefined;
}

function renderMenu(copy: LocalizedContent): void {
  const category = copy.menu.categories.find((item) => item.id === activeCategory) ?? copy.menu.categories[0];
  activeCategory = category.id;

  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((button) => {
    const localizedCategory = copy.menu.categories.find((item) => item.id === button.dataset.category);
    if (localizedCategory) button.textContent = localizedCategory.label;
    const active = button.dataset.category === activeCategory;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });

  const list = document.querySelector<HTMLElement>('[data-dish-list]');
  if (!list) return;
  list.replaceChildren(...category.dishes.map((dish) => {
    const article = document.createElement('article');
    article.className = 'dish';

    const heading = document.createElement('div');
    heading.className = 'dish__heading';
    const title = document.createElement('h3');
    title.textContent = dish.name;
    const price = document.createElement('span');
    price.textContent = `CHF ${dish.price}`;
    heading.append(title, price);

    const description = document.createElement('p');
    description.textContent = dish.description;
    article.append(heading, description);

    if (dish.vegetarian) {
      const marker = document.createElement('span');
      marker.className = 'veg-mark';
      marker.textContent = `● ${copy.menu.vegetarian}`;
      article.append(marker);
    }
    return article;
  }));
}

function renderEvents(copy: LocalizedContent): void {
  const grid = document.querySelector<HTMLElement>('[data-event-grid]');
  if (!grid) return;
  grid.replaceChildren(...copy.events.items.map((event) => {
    const card = document.createElement('article');
    card.className = 'event-card';
    const top = document.createElement('div');
    top.className = 'event-card__top';
    const number = document.createElement('span');
    number.textContent = event.number;
    const recurring = document.createElement('span');
    recurring.textContent = copy.events.recurring;
    top.append(number, recurring);
    const cadence = document.createElement('p');
    cadence.className = 'event-card__date';
    cadence.textContent = event.cadence;
    const title = document.createElement('h3');
    title.textContent = event.title;
    const description = document.createElement('p');
    description.textContent = event.description;
    const link = document.createElement('a');
    link.href = '#reserve';
    const linkText = document.createElement('span');
    linkText.textContent = copy.events.reserve;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(linkText, arrow);
    card.append(top, cadence, title, description, link);
    return card;
  }));
}

function renderHours(copy: LocalizedContent): void {
  const list = document.querySelector<HTMLElement>('[data-hours-list]');
  if (!list) return;
  list.replaceChildren(...copy.contact.hoursRows.map(([day, time]) => {
    const row = document.createElement('p');
    const dayElement = document.createElement('span');
    dayElement.textContent = day;
    const timeElement = document.createElement('span');
    timeElement.textContent = time;
    row.append(dayElement, timeElement);
    return row;
  }));
}

function setLanguage(language: Language, persist = true): void {
  currentLanguage = language;
  const copy = content[language];

  document.documentElement.lang = language;
  document.title = copy.meta.title;
  document.querySelector<HTMLMetaElement>('#meta-description')?.setAttribute('content', copy.meta.description);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    const value = getNestedValue(copy, key);
    if (value) element.textContent = value;
  });

  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-placeholder]').forEach((element) => {
    const key = element.dataset.placeholder;
    if (!key) return;
    const value = getNestedValue(copy, key);
    if (value) element.placeholder = value;
  });

  document.querySelectorAll<HTMLButtonElement>('[data-language-switch]').forEach((button) => {
    const active = button.dataset.languageSwitch === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (menuToggle) menuToggle.setAttribute('aria-label', copy.nav.open);

  renderMenu(copy);
  renderEvents(copy);
  renderHours(copy);

  if (persist) localStorage.setItem(STORAGE_KEY, language);
  document.querySelector<HTMLDialogElement>('#language-dialog')?.close();
}

function setupLanguage(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#language-dialog');
  const storedLanguage = localStorage.getItem(STORAGE_KEY);

  document.querySelectorAll<HTMLButtonElement>('[data-language-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.languageChoice ?? null;
      if (isLanguage(value)) setLanguage(value);
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-language-switch]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.languageSwitch ?? null;
      if (isLanguage(value)) setLanguage(value);
    });
  });

  if (dialog) dialog.addEventListener('cancel', (event) => event.preventDefault());

  if (isLanguage(storedLanguage)) {
    setLanguage(storedLanguage, false);
  } else if (dialog && !dialog.open) {
    dialog.showModal();
  }
}

function setupMenuTabs(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.dataset.category) return;
      activeCategory = button.dataset.category;
      renderMenu(content[currentLanguage]);
    });
  });
}

function setupMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('#mobile-nav');
  if (!toggle || !nav) return;

  const close = (): void => {
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', content[currentLanguage].nav.open);
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const opening = nav.hidden;
    nav.hidden = !opening;
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? content[currentLanguage].nav.close : content[currentLanguage].nav.open);
    document.body.classList.toggle('nav-open', opening);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
}

function setupForms(): void {
  const dateInput = document.querySelector<HTMLInputElement>('[data-min-date]');
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
    dateInput.min = localToday;
  }

  const reservationForm = document.querySelector<HTMLFormElement>('#reservation-form');
  reservationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!reservationForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(reservationForm).entries());
    const url = buildReservationMailto(siteConfig.restaurantEmail, currentLanguage, {
      name: String(values.name ?? ''), email: String(values.email ?? ''), phone: String(values.phone ?? ''),
      date: String(values.date ?? ''), time: String(values.time ?? ''), guests: String(values.guests ?? ''), message: String(values.message ?? ''),
    });
    const status = document.querySelector<HTMLElement>('[data-reservation-status]');
    if (status) status.textContent = content[currentLanguage].reserve.status;
    window.location.href = url;
  });

  const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(contactForm).entries());
    const url = buildContactMailto(siteConfig.contactEmail, {
      name: String(values.name ?? ''), email: String(values.email ?? ''), subject: String(values.subject ?? ''), message: String(values.message ?? ''),
    });
    const status = document.querySelector<HTMLElement>('[data-contact-status]');
    if (status) status.textContent = content[currentLanguage].contact.status;
    window.location.href = url;
  });
}

function setupReveals(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  elements.forEach((element) => observer.observe(element));
}

function setupHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const sync = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', sync, { passive: true });
  sync();
}

setupLanguage();
setupMenuTabs();
setupMobileMenu();
setupForms();
setupReveals();
setupHeader();
