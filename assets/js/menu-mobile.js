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
    this.wrapper = document.querySelector('.nav-mobile');
    this.menu = document.querySelector('.menu-mobile')
    this.menuItems = document.querySelectorAll('.menu-item');
    this.backdrop = document.querySelector('#menu-mobile-backdrop');
    this.toggleBtn = document.querySelector('.menu-toggle');
    this.lastScrollPosition = 0;

    this._initEvents();
  }

  /*
   *  Initialize menu events
   */
  Menu.prototype._initEvents = function() {
    
    // menu toggle handler
    this.toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._toggle();
    })

    // sticky menu handler
    window.addEventListener('scroll', (e) => {
      this._handlePageScroll();
    })

    // toggle menu off on link click
    this.menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this._toggle();
      })
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

  /*
   *  Toggle Navbar Anchor
   */
  Menu.prototype._handlePageScroll = function() {
    var currY = window.scrollY;
    var header = document.querySelector('header');

    // scrolling down?
    if (currY > this.lastScrollPosition) {

      // when below header, disappear
      if (currY > header.clientHeight - this.wrapper.clientHeight) {
        console.log('hit');
        if (!this.wrapper.classList.contains('nav-mobile--anchored')) {
          this.wrapper.classList.add('nav-mobile--anchored');
        }
      }
    }

    // must be scrolling up!
    else {
      if (currY < header.clientHeight - 50) {
        if (this.wrapper.classList.contains('nav-mobile--anchored')) {
          this.wrapper.classList.remove('nav-mobile--anchored');
        }
      }
    }

    this.lastScrollPosition = currY;
  }

  window.Menu = Menu;
})(window);

const menu = new Menu();
