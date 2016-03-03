/* eslint-disable max-len */
console.info(`Check your "Network" tab, a chunk of code was loaded on demand by the following snippet:`);
console.info(`require.ensure([], (require) => { require('./scripts/css-utils.js') /*...*/ })`);

export const toggleCssClassName = (element, className) => {
  element.classList.toggle(className);
};
