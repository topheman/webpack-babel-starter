/* eslint-disable max-len */
console.info(`Check your "Network" tab, a chunk of code was loaded on demand by the following snippet:`);
console.info(`import('./scripts/css-utils.js').then(module => /* do something */).catch(e => console.error(e))`);

export const toggleCssClassName = (element, className) => {
  element.classList.toggle(className);
};
