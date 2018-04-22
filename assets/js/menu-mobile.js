((window) => {
  'use strict';

  /*
   *  Menu Constructor
   */
  function Menu() {
    this._init();
  }

  /*
   *  Initialize Menu
   */
  Menu.prototype._init = function() {
    this.body = document.body;
    this.menu = document.querySelector('.menu-mobile')
    this.menuItems = document.querySelectorAll('.menu-item');
    this.backdrop = document.querySelector('#menu-mobile-backdrop');
    this.toggleBtn = document.querySelector('.menu-toggle');

    this._initEvents();
  }

  /*
   *  Initialize menu events
   */
  Menu.prototype._initEvents = function() {
    this.toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._toggle();
    })
  }

  /*
   *  Toggle Menu
   */
  Menu.prototype._toggle = function() {
    this.menu.classList.toggle('active');
    this.backdrop.classList.toggle('active');
    this.body.classList.toggle('has-active-menu');
    this.menuItems.forEach((item) => {
      item.classList.toggle('active');
    })
    this.toggleBtn.classList.toggle('active');
  }

  window.Menu = Menu;
})(window);

const menu = new Menu();
