Webpack Babel Starter - Contributing
====================================
Thanks for contributing!

###If you're not a contributer

You can completly remove this folder (it only contains tests run on [travis](https://travis-ci.org/topheman/webpack-babel-starter) that ensure non regression of the boilerplate - nothing to do with your unit tests)

You can also remove the following lines in the package.json which won't be relevant anymore:

```js
"contributing-install": "./contributing/bin/contributing-install.sh",
"contributing-test": "./contributing/bin/contributing-test.sh"
```

###Workspace setup

In order not to pollute the enduser's `package.json` with `devDependencies` like test/assertion framework, I didn't include anything in it.

To install contributing dependencies: `npm run contributing-install`

###Launch tests

```shell
npm run contributing-test
```

This will launch builds and run tests over the generated files. Those tests are run on Travis, if you submit a PR, they will run against your code, so you should launch them before submitting - and maybe update tests if needed.