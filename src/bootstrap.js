/* eslint-disable max-len */
/* This is how you use the environments variables passed by the webpack.DefinePlugin */

/**
 * The linter can be disabled via LINTER=false env var - show a message in console to inform if it's on or off
 * Won't show in production
 */
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.LINTER) {
    console.warn('Linter disabled, make sure to run your code against the linter, otherwise, if it fails, your commit will be rejected.');
  }
  else {
    console.info('Linter active, if you meet some problems, you can still run without linter, just set the env var LINTER=false.');
  }
}
else if (process.env.DEVTOOLS) {
  console.info('Turn on the "Sources" tab of your devtools to inspect original source code - thanks to sourcemaps!');
}

/**
 * You could setup some mocks for tests
 * Won't show in production
 */
if (process.env.NODE_ENV === 'mock') {
  console.info('MOCK mode');
}

if (process.env.DEVTOOLS && process.env.NODE_ENV !== 'production') {
  console.info(`You're on DEVTOOLS mode, you may have access to tools enhancing developer experience - off to you to choose to disable them in production ...`);
}

/** This is where the "real code" start */

const main = () => {
  console.log('Welcome! More infos at https://github.com/topheman/webpack-babel-starter');
  const { document } = global;
  // the following is nothing extraordinary ... just to show that the requiring of images work (as well from sass and require / direct and inlined)
  if (document && document.querySelector) {

    const testRequireEnsureLink = document.querySelector('.test-require-ensure');
    const logo = global.document.querySelector('.logo');

    /** display logos */
    const cssClasses = ['babel', 'npm', 'eslint', 'sass'];
    let current = 0;
    document.getElementById('copyright-year').innerHTML = `© ${(new Date()).getFullYear()} `;
    logo.addEventListener('mouseover', () => {
      const body = document.getElementsByTagName('body')[0];
      cssClasses.forEach(name => body.classList.remove(name));
      current = (current + 1) % cssClasses.length;
      body.classList.add(cssClasses[current]);
    });

    testRequireEnsureLink.addEventListener('click', () => {
      // the following won't be included in the original build but will be lazy loaded only when needed
      import('./scripts/css-utils.js')
        .then(module => {
          const { toggleCssClassName } = module;
          toggleCssClassName(logo, 'rotate');
          toggleCssClassName(testRequireEnsureLink, 'active');
        })
        .catch(error => console.error('Chunk loading failed', error));
    });
  }
};

main();
