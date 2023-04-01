# Adaptive menu

## Usage

include plugin files

```html
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="adaptive-menu.css">
</head>

<body>
    <script async src="adaptive-menu.js"></script>
</body>
```

## Call plugin without any options

```js
const menu = new AdaptiveMenuDjCo();
menu.init();
```

## html structure

```html
<nav class="nav">
  <ul  class="nav__list">
    <li class="nav__item">
      <a href="" class="nav__link">Item</a>
    </li>
    <li class="nav__item">
      <a href="" class="nav__link">Item</a>
    </li>
  </ul>
</nav>
```

## Options

```js
const menu = new AdaptiveMenuDjCo(
  nav = '.nav', // Class name
  navList = '.nav__list', // Class name
  navItem = '.nav__item', // Class name
  iconDesktop = '…',
  iconMobile = '<div class="nav__item-hamburger"><span></span><span></span><span></span></div>',
  breakpoint = 600, // The number of pixels when all menu items should be moved to the dropdown (mobile menu)
);
menu.init();
```

## Package managers

NPM
npm install --save @djas420/adaptive-menu

GitLab
git clone https://gitlab.com/Djas420/adaptive-menu.git

GitHub
git clone https://github.com/Djas420/adaptive-menu.git

## For designers

Interested in participating in an open project, write to email [design@djco.ru](mailto:design@djco.ru)
