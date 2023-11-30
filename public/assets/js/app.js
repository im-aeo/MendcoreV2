document.addEventListener('DOMContentLoaded', function() {
/**
 * THEMES
 * messy idc
 */

let theme = localStorage.getItem('theme') || 'light';

function applyTheme() {
  const style = document.getElementById('theme-style');
  if (style) {
    style.href = `/assets/css/themes/variables-${theme}.css`;
  } else {
    const newStyle = document.createElement('link');
    newStyle.rel = 'stylesheet';
    newStyle.href = `/assets/css/themes/variables-${theme}.css`;
    newStyle.id = 'theme-style';
    document.head.appendChild(newStyle);
  }
}

applyTheme();

function setTheme(newTheme) {
  theme = newTheme;
  localStorage.setItem('theme', theme);
  applyTheme();
}

document.getElementById('light-theme-btn').onclick = function () {
  setTheme('light');
};

document.getElementById('dark-theme-btn').onclick = function () {
  setTheme('dark');
};

/**
 * MAIN
 */

document.querySelectorAll('[data-tooltip-title]').forEach(function (element) {
  tippy(element, {
    content: element.getAttribute('data-tooltip-title'),
    placement: element.getAttribute('data-tooltip-placement') || 'top',
    allowHTML: element.hasAttribute('data-tooltip-html'),
    arrow: false,
  });
});

document.querySelectorAll('[data-toggle-element]').forEach(function (element) {
  const target = document.querySelector(element.getAttribute('data-toggle-element'));

  if (!target) return;

  element.onclick = function () {
    target.classList.toggle('hide');
  };
});

document.getElementById('sidebar-toggler').onclick = function () {
  document.querySelector('.sidebar').classList.toggle('show-for-large');
};

document.getElementById('global-search-bar').onkeyup = function () {
  const classList = document.getElementById('global-search-results').classList;

  if (this.value !== '') {
    classList.remove('hide');
  } else {
    classList.add('hide');
  }
};

document.querySelectorAll('[data-toggle-modal]').forEach(function (element) {
  const targetId = element.getAttribute('data-toggle-modal');
  const target = document.querySelector(targetId);

  if (!target) return;

  element.onclick = function () {
    const active = target.classList.contains('active');
    const className = active ? 'modal-animation-reverse' : 'modal-animation';

    document.body.style.overflowY = active ? '' : 'hidden';
    document.body.classList.add(className);

    if (active) {
      target.onclick = null;
    } else {
      target.classList.add('active');
      target.onclick = function (event) {
        if (targetId === `#${event.target.id}`) {
          element.click();
        }
      };
    }

    setTimeout(function () {
      if (active) {
        target.classList.remove('active');
      }

      document.body.classList.remove(className);
    }, active ? 200 : 400);
  };
});

document.querySelectorAll('.dropdown').forEach(function (element) {
  const dropdownButton = element.querySelector('.dropdown-button');
  const dropdownMenu = element.querySelector('.dropdown-menu');

  document.addEventListener('click', function (event) {
    const isDropdownClicked = dropdownButton.contains(event.target);
    const isMenuClicked = dropdownMenu.contains(event.target);

    if (!isDropdownClicked && !isMenuClicked) {
      element.classList.remove('active');
    }
  });

  dropdownButton.addEventListener('click', function () {
    element.classList.toggle('active');
  });
});

document.querySelectorAll('.collapsible').forEach(function (element) {
  element.addEventListener('click', function (event) {
    if (!event.target.closest('.collapsible-menu')) {
      element.classList.toggle('active');
    }
  });
});
});
