const colors = [ 
  // 'rgb(255, 151, 25)',
  // 'rgb(255, 163, 50)',
  // 'rgb(255, 174, 76)',
  // 'rgb(255, 186, 102)',
  // 'rgb(255, 197, 127)',
  // 'rgb(255, 209, 153)',
  // 'rgb(255, 220, 177)',
  'rgb(255, 226, 188)',
  'rgb(255, 231, 203)',
  'rgb(255, 237, 211)',
  'rgb(255, 242, 225)',
  'rgb(255, 249, 237',
  'rgb(255, 255, 255'
]

let rainbowStrings = document.getElementsByClassName('rainbowjs-string');


// wrap chars of each string in spans for styling
// keeping nodeList intact
[...rainbowStrings].forEach(string => {
  let mappedChars = string.innerHTML.split('').map(char => {
    return `<span class="rainbowjs-char">${char}</span>` 
  });

  string.innerHTML = mappedChars.join('');
});

let interval;
let init = false;

// fn to trigger color cycling on letters
function cycle() {
  // seed start
  if (!init) {
    let i = 0;

    [...this.childNodes].forEach(node => {
      if (i === colors.length) i = 0;
      // let color = colors[Math.floor(Math.random() * (colors.length))] || colors[0];

      node.style.color = colors[i];
      i++;
    });

    init = true;
  }
  
  // cycle
  [...this.childNodes].forEach(node => {
    let nextColorIndex = colors.indexOf(node.style.color) + 1;
    if (nextColorIndex === 5) nextColorIndex = 0;

    node.style.color = colors[nextColorIndex]
  });
}


// hover listeners
[...rainbowStrings].forEach(string => {

  string.addEventListener('mouseenter', () => interval=setInterval(cycle.bind(string), 50));
  
  string.addEventListener('mouseleave', () => {
    clearInterval(interval);
    init = false;

    [...string.childNodes].map(node => node.style.color = 'white');
  });
});
