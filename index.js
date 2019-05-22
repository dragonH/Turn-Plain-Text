// ==UserScript==
// @name         Turn-Plain-Text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
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
    setTimeout(() => {
        change(e);
    }, 100);
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
    setTimeout(() => {
        e.target.style.display = originalDisplay;
        e.target.style.visibility = originalVisibility;
        node.remove();
    }, 5000);
  }
})();