# Bars

[![GitHub release](https://img.shields.io/github/release/Mike96angelo/Bars.svg?maxAge=21600)](https://github.com/Mike96Angelo/Bars/releases)
[![npm version](https://img.shields.io/npm/v/bars.svg?maxAge=21600)](https://www.npmjs.com/package/bars)
[![npm downloads](https://img.shields.io/npm/dm/bars.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=bars&from=2015-08-13)
[![npm downloads](https://img.shields.io/npm/dt/bars.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=bars&from=2015-08-13)

Bars is a lightweight high performance HTML aware templating engine.  Bars emits DOM rather than DOM-strings, this means the DOM state is preserved even if data updates happen.

# Make Bars Better

Bars is still in early development, please share any suggestions and report any bugs to the [GitHub issues](https://github.com/Mike96Angelo/Bars/issues) page, so we can continue to improve Bars.  If you want to contribute to Bars, [fork Bars on GitHub](https://github.com/Mike96Angelo/Bars) and send in a pull request.  For ways to contribute check out the [issues](https://github.com/Mike96Angelo/Bars/issues) page on GitHub.

### Install:
```
$ npm install bars
```

# What Bars Looks Like

### Bars:
```handlebars
<ul>
{{#each persons}}
   <li>{{@index + 1}} - {{name}}</li>
{{/each}}
</ul>

{{#if x < 5}}
   <span>x is less then 5</span>
{{else if x > 5}}
    <span>x is greater then 5</span>
{{else}}
   <span>x is equal to 5</span>
{{/if}}

{{@upperCase(title)}}
```
### Object:
```javascript
{
   persons: [
      { name: 'John' },
      { name: 'Jane' },
      { name: 'Jim' },
   ],
   x: 2,
   title: 'The Cat in the Hat'
}
```

### Output:
##### *text representation*
```handlebars
<ul>
   <li>1 - John</li>
   <li>2 - Jane</li>
   <li>3 - Jim</li>
</ul>


   x is less then 5


THE CAT IN THE HAT
```

For docs and examples [Bars Language Docs](docs/docs.md).
* [Try Bars](https://jsfiddle.net/bba4kk3d/5/).
* [Benchmark](http://jsfiddle.net/yE9Z9/97/)

## Table of Contents

* [Bars](#bars)
    * [Bars.compile(template)](#compile)
    * [Bars.preCompile(template)](#pre-compile)
    * [Bars.build(compiledTemplate)](#build)
    * [Bars.registerBlock(name, func)](#register-block)
    * [Bars.registerPartial(name, builtTemplate)](#register-partial)
    * [Bars.registerTransform(name, func)](#register-transform)
    * [Class: Renderer](#class-renderer)
        * [Renderer.update(data)](#renderer-update)
        * [Renderer.appendTo(element)](#renderer-append-to)

<a name="bars"></a>


<a name="compile"></a>
## Bars.compile(template)
#### *not available in the runtime only package.*

Also see [bars-browserify](https://github.com/Mike96Angelo/Bars-Browserify).

* *template* `String` A Bars template string.
* *return*: `Renderer` A new [Renderer](#class-renderer) created from the `template`.

Returns a new [Renderer](#class-renderer).

Example:
```javascript
var bars = new Bars();

var renderer = bars.compile('<h1>Hello, {{name}}.</h1>');

//Note: bars.compile(template) is equivalent to bars.build(bars.preCompile(template))

```

<a name="pre-compile"></a>
## Bars.preCompile(template)
#### *not available in the runtime only package.*

Also see [bars-browserify](https://github.com/Mike96Angelo/Bars-Browserify).

* *template* `String` A Bars template string.
* *return*: `Object` A object structure representing the `template`.

Returns a object structure representing the `template`.

Example:
```javascript
var bars = new Bars();

var myCompiledTemplate = bars.preCompile('<h1>Hello, {{name}}.</h1>');

```

<a name="build"></a>
## Bars.build(compiledTemplate)

* *compiledTemplate* `Object` A Bars compiled template.
* *return*: `Renderer` A new [Renderer](#class-renderer) created from the `template`.

Returns a new [Renderer](#class-renderer).

Example:
```javascript
var bars = new Bars();

var renderer = bars.build(myComiledTemplate);

```

<a name="register-block"></a>
## Bars.registerBlock(name, func)

* *name* `String` The name of the block helper.
* *func* `Function` The block helper function.
* *return*: `Bars` *This* [Bars](#bars).

Returns *this* [Bars](#bars).

Example:
```javascript
bars.registerBlock('unless',
    function unlessBlock(data, consequent, alternate, context) {
        if (data) {
            alternate();
        } else {
            consequent();
        }
    }
);

/**
 * To use the `unless` block in a template
 * use this {{#unless <expression> <context-map>?}} {{else}} {{/unless}}.
 */
```

<a name="register-partial"></a>
## Bars.registerPartial(name, builtTemplate)

* *name* `String` The name of the partial.
* *builtTemplate* `Renderer` The partial Renderer returned from [Bars.build(parsedTemplate)](#build).
* *return*: `Bars` *This* [Bars](#bars).

Returns *this* [Bars](#bars).

Example:
```javascript
bars.registerPartial('person', builtTemplate);

/**
 * To use the `person` partial in another
 * template use this {{>person <expression|context-map>?}}.
 */
```

<a name="register-transform"></a>
## Bars.registerTransform(name, func)

* *name* `String` The name of the transform helper.
* *func* `Function` The transform helper function.
* *return*: `Bars` *This* [Bars](#bars).

Returns *this* [Bars](#bars).

Example:
```javascript
bars.registerTransform('upperCase', function upperCase(a) {
    return String(a).toUpperCase();
});

/**
 * To use the `upperCase` transform in a
 * template use this {{@upperCase(<expression>)}}.
 */
```

<a name="class-renderer"></a>
## Class: Renderer

A Renderer that is built using the [Bars.build(compiledTemplatemplate)](#bars-compile) method.
<a name="renderer-update"></a>
## Renderer.update(data)

* *data* `Object` Object context for rendering update.
* *return*: `Renderer` *This* [Renderer](#class-renderer).

Updates and renders *This* [Renderer](#class-renderer).

Example:
```javascript
renderer.update({name: 'Bob'});
```

<a name="renderer-append-to"></a>
## Renderer.appendTo(element)

* *element*: `Element` The DOM Element to append *This* [Renderer](#class-renderer) to.
* *return*: `Renderer` *This* [Renderer](#class-renderer).

Returns *this* [Renderer](#class-renderer).

Example:
```javascript
renderer.appendTo(document.body);
```

## Author:
    Michaelangelo Jong
    Dallas Read

## License:
    The MIT License (MIT)

    Copyright (c) 2015-2016 Michaelangelo Jong

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
