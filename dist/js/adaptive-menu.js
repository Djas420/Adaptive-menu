/*!
 * AdaptiveMenuDjCo v0.0.2 (https://gitlab.com/Djas420/Adaptive-menu)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://gitlab.com/Djas420/Adaptive-menu/-/blob/main/LICENSE)
 */

class AdaptiveMenuDjCo {
  constructor(
    nav = '.nav',
    navList = '.nav__list',
    navItem = '.nav__item',
    iconDesktop = '…',
    iconMobile = '<div class="nav__item-hamburger"><span></span><span></span><span></span></div>',
    breakpoint = 600,
  ) {
    this.nav = nav;
    this.navList = navList;
    this.navItem = navItem;
    this.iconDesktop = iconDesktop;
    this.iconMobile = iconMobile;
    this.breakpoint = breakpoint;
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

  #setBtnMenu() {
    if (!this.#btnMenu) {
      let btn;
      if (this.#getBreakpoint()) {
        btn = `
            <li class="nav__item-btn">
              <div class="nav__item-icon">${this.iconMobile}</div>
              <ul class="nav__item-sub"></ul>
            </li>`;
      } else {
        btn = `
            <li class="nav__item-btn">
              <div class="nav__item-icon">${this.iconDesktop}</div>
              <ul class="nav__item-sub"></ul>
            </li>`;
      }
      document.querySelector(this.navList).insertAdjacentHTML('beforeend', btn);

      this.#btnNavItem = document.querySelector('.nav__item-btn');
      this.#subNavItem = document.querySelector('.nav__item-sub');

      this.#btnNavItem.addEventListener('click', () => {
        this.#btnNavItem.querySelector('.nav__item-icon').classList.toggle('active');
      });

      this.#btnMenu = true;
    } else if (this.#getBreakpoint()) {
      this.#btnNavItem.querySelector('.nav__item-icon').innerHTML = this.iconMobile;
    } else {
      this.#btnNavItem.querySelector('.nav__item-icon').innerHTML = this.iconDesktop;
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
      const subNavItems = this.#subNavItem.querySelectorAll(this.navItem);
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
    } else if (this.#subNavItem !== undefined && this.#subNavItem.querySelectorAll(this.navItem).length <= 0) {
      this.#btnNavItem.remove();
      this.#btnMenu = false;
    }

    this.#nav.style.overflow = '';
  }

  init() {
    this.#nav = document.querySelector(this.nav);
    this.#navList = document.querySelector(this.navList);
    this.#navItems = document.querySelectorAll(this.navItem);
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
}
