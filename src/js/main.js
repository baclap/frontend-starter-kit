'use strict';

// ES6 out of the box
const test = 'Button click';
document.querySelector('button').addEventListener('click', (e) => {
  alert(test)
})
