const main = () => {
  console.log('Hello world !!!');
  document.getElementById('copyright-year').innerHTML = `© ${(new Date()).getFullYear()} `;
};

main();
