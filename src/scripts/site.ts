import { content, isLanguage, type Language, type LocalizedContent } from '../data/content';
import { siteConfig } from '../data/site';
import { resolveInitialLanguage } from '../utils/language';
import { buildReservationMailto } from '../utils/mailto';

const STORAGE_KEY = 'imperial.language.v1';
let currentLanguage: Language = 'de';
let activeGalleryIndex = 0;

function getNestedValue(source: LocalizedContent, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((accumulator, key) => {
    if (accumulator && typeof accumulator === 'object' && key in accumulator) {
      return (accumulator as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
  return typeof value === 'string' ? value : undefined;
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

function updateGalleryControls(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.gallery-card'));
  const previous = document.querySelector<HTMLButtonElement>('[data-gallery-previous]');
  const next = document.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const status = document.querySelector<HTMLElement>('[data-gallery-status]');
  if (!cards.length || !previous || !next || !status) return;

  activeGalleryIndex = Math.max(0, Math.min(activeGalleryIndex, cards.length - 1));
  previous.disabled = activeGalleryIndex === 0;
  next.disabled = activeGalleryIndex === cards.length - 1;
  status.textContent = `${activeGalleryIndex + 1} / ${cards.length}`;
  status.parentElement?.setAttribute(
    'aria-label',
    `${content[currentLanguage].gallery.counter} ${activeGalleryIndex + 1} / ${cards.length}`,
  );
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

  document.querySelectorAll<HTMLElement>('[data-i18n-label]').forEach((element) => {
    const key = element.dataset.i18nLabel;
    if (!key) return;
    const value = getNestedValue(copy, key);
    if (value) element.setAttribute('aria-label', value);
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

  renderEvents(copy);
  renderHours(copy);
  updateGalleryControls();

  if (persist) localStorage.setItem(STORAGE_KEY, language);
}

function setupLanguage(): void {
  const storedLanguage = localStorage.getItem(STORAGE_KEY);

  document.querySelectorAll<HTMLButtonElement>('[data-language-switch]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.languageSwitch ?? null;
      if (isLanguage(value)) setLanguage(value);
    });
  });

  const initialLanguage = resolveInitialLanguage(storedLanguage, navigator.languages.length ? navigator.languages : navigator.language);
  setLanguage(initialLanguage, !isLanguage(storedLanguage));
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
  nav.querySelectorAll('a, [data-language-switch]').forEach((control) => control.addEventListener('click', close));
}

function setupGallery(): void {
  const grid = document.querySelector<HTMLElement>('[data-gallery-grid]');
  const previous = document.querySelector<HTMLButtonElement>('[data-gallery-previous]');
  const next = document.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.gallery-card'));
  if (!grid || !previous || !next || !cards.length) return;

  const scrollToCard = (index: number): void => {
    activeGalleryIndex = Math.max(0, Math.min(index, cards.length - 1));
    const target = cards[activeGalleryIndex];
    grid.style.scrollSnapType = 'none';
    grid.style.scrollBehavior = 'auto';
    grid.scrollLeft = target.offsetLeft;
    grid.style.scrollBehavior = '';
    grid.style.scrollSnapType = '';
    updateGalleryControls();
  };

  previous.addEventListener('click', () => scrollToCard(activeGalleryIndex - 1));
  next.addEventListener('click', () => scrollToCard(activeGalleryIndex + 1));

  let frame = 0;
  grid.addEventListener('scroll', () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      activeGalleryIndex = cards.reduce((closestIndex, card, index) => {
        const closestDistance = Math.abs(cards[closestIndex].offsetLeft - grid.offsetLeft - grid.scrollLeft);
        const distance = Math.abs(card.offsetLeft - grid.offsetLeft - grid.scrollLeft);
        return distance < closestDistance ? index : closestIndex;
      }, 0);
      updateGalleryControls();
    });
  }, { passive: true });

  updateGalleryControls();
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
setupMobileMenu();
setupGallery();
setupForms();
setupReveals();
setupHeader();
