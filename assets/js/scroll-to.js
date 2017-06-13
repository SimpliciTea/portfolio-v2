var scrollLinks = document.getElementsByClassName('scroll-to');


// sought a vanilla-JS solution, chose to follow
// https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    
    window.scroll(0, Math.ceil((easeInOutQuad(time) * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset >= destinationOffsetToScroll - 3) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}


[...scrollLinks].map(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let scrollTargetId = link.href.slice(link.href.indexOf('#') + 1);
    let scrollTarget = document.getElementById(scrollTargetId);

    scrollIt(
      scrollTarget,
      300,
      'easeInOutQuad'
    );
  })
})
