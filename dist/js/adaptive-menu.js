/*!
 * AdaptiveMenuDjCo v0.0.12 (https://gitlab.com/Djas420/Adaptive-menu)
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
    destroy,
  }) {
    this.nav = nav || 'nav';
    this.navList = navList || 'nav__list';
    this.navItem = navItem || 'nav__item';
    this.ariaLabelSubmenu = ariaLabelSubmenu || 'More';
    this.iconDesktop = iconDesktop || '…';
    this.iconMobile = iconMobile || `<div class="${this.nav}__item-hamburger"><span></span><span></span><span></span></div>`;
    this.breakpoint = (breakpoint === false) ? 0 : breakpoint || 600;
    this.destroy = destroy || false;
  }

  #btnMenu = false;

  #nav;

  #navItems;

  #navList;

  #btnNavItem;

  #subNavItem;

  #timeOut;

  // Mobile/Desktop icon check
  #getBreakpoint() {
    if (window.innerWidth < this.breakpoint) {
      return true;
    }
    return false;
  }

  // Check for destroy
  #getDestroy() {
    if (window.innerWidth < this.destroy) {
      return true;
    }
    return false;
  }

  // Mobile/Desktop icon generation
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

  // Adding a Mobile/Desktop Button
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

  // Building a mobile menu
  #setMobileMenu() {
    this.#setBtnMenu();

    this.#navItems.forEach((item) => {
      this.#subNavItem.append(item);
    });
  }

  // Building a desktop menu
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
      const style = window.getComputedStyle(item, null);
      const width = item.offsetWidth;
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      navItemsWidth.push(width + margin);
    });

    const allNavItemsWidth = navItemsWidth.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (navWidth < allNavItemsWidth) {
      this.#setBtnMenu();

      const nw = navWidth - this.#btnNavItem.clientWidth;

      let navItemsSum = 0;
      this.#navItems.forEach((item) => {
        const style = window.getComputedStyle(item, null);
        const width = item.offsetWidth;
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

        navItemsSum += (width + margin);
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

  // Menu initialization
  init() {
    this.#nav = document.querySelector(`.${this.nav}`);
    this.#navList = document.querySelector(`.${this.navList}`);
    this.#navItems = this.#navList.querySelectorAll(`.${this.navItem}`);

    if (!this.destroy) {
      if (this.#getBreakpoint()) {
        this.#setMobileMenu();
      } else {
        this.#setDesktopMenu();
      }
    }

    const resizeMenu = () => {
      clearTimeout(this.#timeOut);
      this.#timeOut = setTimeout(() => {
        if (this.#getDestroy()) {
          if (this.#btnMenu) {
            const subNavItems = this.#subNavItem.querySelectorAll(`.${this.navItem}`);
            if (subNavItems.length > 0) {
              subNavItems.forEach((item) => {
                this.#btnNavItem.before(item);
              });
            }

            this.#btnNavItem.remove();
            this.#btnMenu = false;
          }
        } else if (this.#getBreakpoint()) {
          this.#setMobileMenu();
        } else {
          this.#setDesktopMenu();
        }
      }, 10);
    };
    resizeMenu();

    window.addEventListener('resize', resizeMenu);
  }
};
