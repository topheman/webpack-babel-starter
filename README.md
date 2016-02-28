Webpack Babel Starter
=====================
A webpack starter kit with full development & build workflow, inspired by [topheman/react-es6-redux](https://github.com/topheman/react-es6-redux).

What's in it:

* Development / Build / Lint tasks
* [Babel](https://babeljs.io/) transpiler
* [Eslint](http://eslint.org/) / [babel-eslint](https://github.com/babel/babel-eslint) / [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v5.0.1/packages/eslint-config-airbnb)
* Sass support

###Install

```shell
git clone https://github.com/topheman/webpack-babel-starter.git
cd webpack-babel-starter
npm install
```

###Run

```shell
npm start
```

Goto http://localhost:8080

###Build

All the build tasks will create a built version of the project in the `./build` folder, cleaning it before making the build.

* `npm run build`
* `npm run build-prod` optimized / uglified version

###Linter

* eslint is running while you're developping, check your console for errors
* you can also launch it via `npm run lint`
* see `.eslintrc` for the configuration (currently, this project uses [the airbnb presets](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v5.0.1/packages/eslint-config-airbnb) - if you find it to restrictive, just remove `"extends": "airbnb/base"` in the `.eslintrc`)

###Customizations

You can customize the behavior of the scripts by specifying environments vars:

* `NODE_ENV` by default at `development`, `NODE_ENV=production` when you `npm run build-prod`
* `LINTER=false` will disable the linter (enabled by default, ex: `LINTER=false npm start`)
* `STATS=true` will write `stats.json` profiling file on disk from webpack at build (disabled by default, ex: `STATS=true npm run build`)
* `FAIL_ON_ERROR=true` will break the build if any errors occurs (useful for CIs such ase Travis - at `false` in dev-server, at `true` when building)

###Bonus

Check the source code of the html/js/css generated files, you'll see a banner containing informations such as:

* date the build was made
* version
* git revision / link to this revision on github

Copyright 2016 © Christophe Rosset

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.


