/*
**  browserify-replace -- Browserify Transform for Replacing Strings
**  Copyright (c) 2015-2021 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const through = require("through2")

/*  export a Browserify plugin  */
module.exports = (file, opts) => {
    /*  sanity check configuration  */
    if (!opts.replace)
        throw new Error("no configuration entry \"replace\" found")
    if (!(typeof opts.replace === "object" && opts.replace instanceof Array))
        opts.replace = [ opts.replace ]
    for (let i = 0; i < opts.replace.length; i++) {
        if (typeof opts.replace[i] === "string")
            opts.replace[i] = JSON.parse(opts.replace[i])
        else if (typeof opts.replace[i] !== "object")
            throw new Error(`configuration entry "replace[${i}]" neither JSON stringified object nor object`)
        if (typeof opts.replace[i].from === "undefined")
            throw new Error(`configuration entry "replace[${i}].from" not defined`)
        if (!(typeof opts.replace[i].from === "object" && opts.replace[i].from instanceof RegExp))
            opts.replace[i].from = new RegExp(opts.replace[i].from)
        if (typeof opts.replace[i].to === "undefined")
            throw new Error(`configuration entry "replace[${i}].to" not defined`)
        if (!(typeof opts.replace[i].to === "string"))
            opts.replace[i].to = String(opts.replace[i].to)
    }

    /*  provide stream  */
    let code = ""
    return through.obj(function (buf, enc, next) {
        /*  accumulate the code chunks  */
        code += buf.toString("utf8")
        next()
    }, function (next) {
        /*  transform the code  */
        for (let i = 0; i < opts.replace.length; i++)
            code = code.replace(opts.replace[i].from, opts.replace[i].to)
        this.push(Buffer.from(code))
        next()
    })
}

