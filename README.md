
browserify-replace
====================

[Browserify](http://browserify.org/) Transform For Replacing Strings.

<p/>
<img src="https://nodei.co/npm/browserify-replace.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/browserify-replace.png" alt=""/>

About
-----

When creating Browser versions of libraries and applications with the
help of the excellent [Browserify](http://browserify.org/) toolchain
one often has to replace certain strings during the transformation.
A usual use-case is the replacement of placeholders with the current
version number, etc. This Browserify transform allows you
to apply one or more Regular Expression based string replacements.

Installation
------------

```shell
$ npm install -g browserify
$ npm install -g browserify-replace
```

Usage
-----

#### Shell

```shell
$ browserify -t [ browserify-replace \
                  --replace '{ "from": "\\$foo", "to": 42 }' \
                  --replace '{ "from": "\\$bar", "to": "quux" }' ] \
             -o sample.browser.js sample.js
```

#### Grunt

```js
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-browserify");
    grunt.initConfig({
        browserify: {
            "sample": {
                files: {
                    "sample.browser.js": [ "sample.js" ]
                },
                options: {
                    transform: [
                        [   "browserify-replace", {
                                replace: [
                                    { from: /\$foo/, to: 42 },
                                    { from: /\$bar/, to: "quux" }
                                ]
                            }
                        ]
                    ]
                }
            }
        },
        [...]
    });
    [...]
};
```

License
-------

Copyright (c) 2015-2021 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

