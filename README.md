# Adaptive menu

## Usage

Include plugin files

```html
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="adaptive-menu.css">
</head>

<body>
    <script src="adaptive-menu.js"></script>
</body>
```

## Call plugin without any options

```js
const menu = new AdaptiveMenuDjCo({});
menu.init();
```

## html structure

```html
<nav class="nav" aria-label="Site navigate">
  <ul  class="nav__list" role="menubar" aria-label="Site navigate">
    <li class="nav__item active" role="none">
      <a href="/" class="nav__link" role="menuitem" tabindex="0" aria-current="page">Home</a>
    </li>
    <li class="nav__item" role="none">
      <a href="#" class="nav__link" role="menuitem" tabindex="-1">Item</a>
    </li>
  </ul>
</nav>

<!-- Schema.org -->
<nav class="nav" aria-label="Site navigate" itemscope itemtype="http://schema.org/SiteNavigationElement">
  <ul  class="nav__list" role="menubar" aria-label="Site navigate">
    <li class="nav__item active" role="none">
      <a href="/" class="nav__link" itemprop="url" role="menuitem" tabindex="0" aria-current="page">Home</a>
    </li>
    <li class="nav__item" role="none">
      <a href="#" class="nav__link" itemprop="url" role="menuitem" tabindex="-1">Item</a>
    </li>
  </ul>
</nav>
```

## Options

```js
const menu = new AdaptiveMenuDjCo({
  // Default Options
  nav: 'nav', // Class name
  navList: 'nav__list', // Class name
  navItem: 'nav__item', // Class name
  ariaLabelSubmenu: 'More', // Name submenu
  iconDesktop: '…',
  iconMobile: '<div class="nav__item-hamburger"><span></span><span></span><span></span></div>',
  breakpoint: 600, // The number of pixels when all menu items should be moved to the dropdown (mobile menu),
  destroy: 500,
});
menu.init();
```

## Download

NPM

npm i @djas420/adaptive-menu

GitLab

git clone <https://gitlab.com/Djas420/Adaptive-menu.git>

GitHub

git clone <https://github.com/Djas420/Adaptive-menu.git>

## For designers

Interested in participating in an open project, write to email [design@djco.ru](mailto:design@djco.ru)
