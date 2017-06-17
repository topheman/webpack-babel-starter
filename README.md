Webpack Babel Starter
=====================

[![Build Status](https://travis-ci.org/topheman/webpack-babel-starter.svg?branch=v1)](https://travis-ci.org/topheman/webpack-babel-starter)
![Release](https://img.shields.io/badge/release-v1-blue.svg)

**A new version relying on webpack 2 is now available!** [Check it out](https://github.com/topheman/webpack-babel-starter)

A webpack starter kit with full development & build workflow, inspired by [topheman/react-es6-redux](https://github.com/topheman/react-es6-redux).

What's in this boilerplate:

* Development / Build / Lint tasks
* [Babel](https://babeljs.io/) transpiler
* [Eslint](http://eslint.org/) / [babel-eslint](https://github.com/babel/babel-eslint) / [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v5.0.1/packages/eslint-config-airbnb)
* Sass support
* Ship a version of your site with sourcemaps (see demo)

Already in use in the following projects:

* [topheman/rxjs-experiments](https://github.com/topheman/rxjs-experiments) (RxJS)
* [topheman/react-es6-redux](https://github.com/topheman/react-es6-redux) (React/Redux/Github Api) - since [v3.0.0](https://github.com/topheman/react-es6-redux/releases/tag/v3.0.0) 
* [topheman/d3-react-experiments](https://github.com/topheman/d3-react-experiments) (React/d3)

I also have ported it on [topheman/angular2-sandbox](https://github.com/topheman/angular2-sandbox) to be used the same way in an Angular2 / TypeScript project.

### Install

```shell
git clone https://github.com/topheman/webpack-babel-starter.git
cd webpack-babel-starter
npm install
```

### Run

```shell
npm start
```

Goto [http://localhost:8080](http://localhost:8080)

If you need to access from a remote device (such as a smartphone on the same network), just `LOCALHOST=false npm start` and your site will be accessible via your IP (which will be output on the terminal at launch).

### Build

The `./build` directory is ignored by git, it will contain a `dist` directory which holds the distribution version of your website (the one that you will [ship once built](https://github.com/topheman/webpack-babel-starter/wiki#deploy)).

All the build tasks will create a built version of the project in the `./build/dist` folder, cleaning it before making the build.

* `npm run build`
* `npm run build-prod` optimized / uglified version
* `npm run build-prod-all` will build:
	* production version (optimized / uglified)
	* a debuggable version accessible at `/devtools` shipping all the sourcemaps, to ease sharing transpiled source code

`npm run serve-dist` will serve your `./build/dist` folder at [http://localhost:3000](http://localhost:3000) so that you could test the built version you just made.

### Linter

* eslint is running while you're developping, check your console for errors
* you can also launch it via `npm run lint`
* see `.eslintrc` for the configuration (currently, this project uses [the airbnb presets](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v5.0.1/packages/eslint-config-airbnb) - if you find it to restrictive, just remove `"extends": "airbnb/base"` in the `.eslintrc`)

### Customizations

You can customize the behavior of the scripts by specifying environments vars:

* `NODE_ENV` by default at `development`, `NODE_ENV=production` when you `npm run build-prod`
* `LINTER=false` will disable the linter (enabled by default, ex: `LINTER=false npm start`)
* `STATS=true` will write `stats.json` profiling file on disk from webpack at build (disabled by default, ex: `STATS=true npm run build`)
* `FAIL_ON_ERROR=true` will break the build if any errors occurs (useful for CIs such as travis - at `false` in dev-server, at `true` when building)
* `LOCALHOST=false` to access via IP from other devices on the same network (ex: `LOCALHOST=false npm start` - default `true`)
* `DEVTOOLS`: By default at `null`. Used internally by `npm run build-prod-all` (you may not need that if you don't do OSS)

### Assets

The main image loaders are declared in the webpack config so that when you `require('./foo.png')` or use the helper `url('./bar.gif')` in your `.scss` files, at build time, those images will automatically be:

* copied into `/build/dist/assets`
* there name will be hashed (without you bothering with the reference in the generated code)
* the hashed name will only change if the file changes (caching & git friendly)
* I made sure that the css supports relative urls (this is why `main.css` lands at the same level as `index.html`)

### FAQ / Deploy

* deploy on github pages - [see wiki](https://github.com/topheman/webpack-babel-starter/wiki#deploy)
* a problem ? Checkout the [FAQ](https://github.com/topheman/webpack-babel-starter/wiki#faq)
* [Using React](https://github.com/topheman/webpack-babel-starter/wiki#react-hot-reload) ? Checkout how I integrated all the usual tools around React on some of my own projects, based on this boilerplate.

### Bonus

Check the source code of the html/js/css generated files, you'll see a banner containing informations such as:

* date the build was made
* version
* git revision / link to this revision on github

### Contributing

PRs are welcome, just keep in mind this boilerplate aims to keep beeing framework agnostic.

Everything related to contributing (tests, framework dependencies ...) is located in the [/contributing](https://github.com/topheman/webpack-babel-starter/tree/v1/contributing) folder. Check the readme in there to see how to setup your workspace.

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


