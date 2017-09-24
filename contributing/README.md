Webpack Babel Starter - Contributing
====================================
Thanks for contributing!

### If you're not a contributer

You can completly remove this folder (it only contains tests run on [travis](https://travis-ci.org/topheman/webpack-babel-starter) that ensure non regression of the boilerplate - nothing to do with your unit tests)

You can also remove the following lines in your `package.json` which won't be relevant anymore:

```js
"contributing-test": "./contributing/bin/contributing-test.sh"
```

The tests are relying on `mocha` and `chai`. If you don't use those dependencies yourself, you can remove them using :

```shell
npm remove mocha chai --dev
```

### Launch tests

```shell
npm run contributing-test
```

This will launch builds and run tests over the generated files. Those tests are run on [travis](https://travis-ci.org/topheman/webpack-babel-starter), if you submit a PR, they will run against your code, so you should launch them before submitting - and maybe update tests if needed.
