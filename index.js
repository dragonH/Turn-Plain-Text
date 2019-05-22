// ==UserScript==
// @name         Turn-Plain-Text
// @namespace    https://github.com/dragonH/Turn-Plain-Text
// @version      0.1
// @description  A script that can turn a tag to plain text
// @author       dragonH
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  let shiftPress = false;
  document.addEventListener('keydown', (e) => {
    shiftPress = e.key === 'Shift'
      ? true
      : false;
  });
  document.addEventListener('keyup', (e) => {
    shiftPress = false;
  });
  document.addEventListener('mouseover', (e) => {
      change(e);
  });
  function change(e) {
    if (e.target.tagName !== 'A') {
      return false;
    }
    if (!shiftPress) {
      return false;
    }
    const node = document.createElement('span');
    const text = document.createTextNode(e.target.innerText);
    const originalDisplay = e.target.style.display;
    const originalVisibility = e.target.style.visibility;
    node.classList = e.target.classList;
    node.style.color = 'black';
    node.style.cursor = '';
    node.append(text);
    e.target.after(node);
    e.target.style.display = 'none';
    e.target.style.visibility = 'hidden';
    const timer = setInterval(() => {
        e.target.style.display = originalDisplay;
        e.target.style.visibility = originalVisibility;
        node.remove();
        clearInterval(timer);
    }, 5000);
  }
})();