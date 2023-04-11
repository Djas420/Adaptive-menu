/*!
 * AdaptiveMenuDjCo v0.0.5 (https://gitlab.com/Djas420/Adaptive-menu)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://gitlab.com/Djas420/Adaptive-menu/-/blob/main/LICENSE)
 */

window.AdaptiveMenuDjCo = class {
  constructor({
    nav,
    navList,
    navItem,
    ariaLabelSubmenu,
    iconDesktop,
    iconMobile,
    breakpoint,
  }) {
    this.nav = nav || 'nav';
    this.navList = navList || 'nav__list';
    this.navItem = navItem || 'nav__item';
    this.ariaLabelSubmenu = ariaLabelSubmenu || 'More';
    this.iconDesktop = iconDesktop || '…';
    this.iconMobile = iconMobile || '<div class="nav__item-hamburger"><span></span><span></span><span></span></div>';
    this.breakpoint = breakpoint || 600;
  }

  #btnMenu = false;

  #nav;

  #navItems;

  #navList;

  #btnNavItem;

  #subNavItem;

  #timeOut;

  #getBreakpoint() {
    if (window.innerWidth <= this.breakpoint) {
      return true;
    }
    return false;
  }

  #htmlBtnMenu() {
    let icon;
    if (this.#getBreakpoint()) {
      icon = this.iconMobile;
    } else {
      icon = this.iconDesktop;
    }

    return `
      <li class="${this.navItem}-btn" role="none">
        <button class="${this.navItem}-icon"
          role="none"
          aria-haspopup="true"
          aria-expanded="false"
          href="#"
          tabindex="-1"
          type="button"
        >${icon}</button>
        <ul class="${this.navList}-submenu" role="menu" aria-label="${this.ariaLabelSubmenu}"></ul>
      </li>
    `;
  }

  #setBtnMenu() {
    if (!this.#btnMenu) {
      const btn = this.#htmlBtnMenu();
      document.querySelector(`.${this.navList}`).insertAdjacentHTML('beforeend', btn);

      this.#btnNavItem = document.querySelector(`.${this.navItem}-btn`);
      this.#subNavItem = document.querySelector(`.${this.navList}-submenu`);

      const navItemIcon = this.#btnNavItem.querySelector(`.${this.navItem}-icon`);
      navItemIcon.addEventListener('click', (e) => {
        e.preventDefault();
      });

      this.#btnNavItem.addEventListener('click', () => {
        navItemIcon.classList.toggle('active');
        if (navItemIcon.getAttribute('aria-expanded') === 'false') {
          navItemIcon.setAttribute('aria-expanded', 'true');
        } else {
          navItemIcon.setAttribute('aria-expanded', 'false');
        }
      });

      this.#btnMenu = true;
    } else if (this.#getBreakpoint()) {
      this.#btnNavItem.querySelector(`.${this.navItem}-icon`).innerHTML = this.iconMobile;
    } else {
      this.#btnNavItem.querySelector(`.${this.navItem}-icon`).innerHTML = this.iconDesktop;
    }
  }

  #setMobileMenu() {
    this.#setBtnMenu();

    this.#navItems.forEach((item) => {
      this.#subNavItem.append(item);
    });
  }

  #setDesktopMenu() {
    this.#nav.style.overflow = 'hidden';
    const navWidth = this.#navList.clientWidth;

    if (this.#btnMenu) {
      const subNavItems = this.#subNavItem.querySelectorAll(`.${this.navItem}`);
      if (subNavItems.length > 0) {
        subNavItems.forEach((item) => {
          this.#btnNavItem.before(item);
        });
      }
    }
    const navItemsWidth = [];
    this.#navItems.forEach((item) => {
      navItemsWidth.push(item.clientWidth);
    });

    const allNavItemsWidth = navItemsWidth.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (navWidth < allNavItemsWidth) {
      this.#setBtnMenu();

      const nw = navWidth - this.#btnNavItem.clientWidth;

      let navItemsSum = 0;
      this.#navItems.forEach((item) => {
        navItemsSum += item.clientWidth;
        if (nw < navItemsSum) {
          this.#subNavItem.append(item);
        }
      });
    } else if (this.#subNavItem !== undefined && this.#subNavItem.querySelectorAll(`.${this.navItem}`).length <= 0) {
      this.#btnNavItem.remove();
      this.#btnMenu = false;
    }

    this.#nav.style.overflow = '';
  }

  init() {
    this.#nav = document.querySelector(`.${this.nav}`);
    this.#navList = document.querySelector(`.${this.navList}`);
    this.#navItems = document.querySelectorAll(`.${this.navItem}`);
    if (this.#getBreakpoint()) {
      this.#setMobileMenu();
    } else {
      this.#setDesktopMenu();
    }
    window.priorityNavDjCoTimeout = this;
    window.addEventListener('resize', () => {
      clearTimeout(this.#timeOut);
      this.#timeOut = setTimeout(() => {
        if (window.priorityNavDjCoTimeout.#getBreakpoint()) {
          window.priorityNavDjCoTimeout.#setMobileMenu();
        } else {
          window.priorityNavDjCoTimeout.#setDesktopMenu();
        }
      }, 10);
    });
  }
};
