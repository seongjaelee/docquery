# docquery

Document query interface for plaintext documents stored in directories on a filesystem.

## Installation

```bash
~ $ npm install docquery
...
```

## Usage

Here's an example directory structure with some markdown documents in it.

```bash
~/Projects/docquery $ tree test/fixtures
test/fixtures
├── 2015-05-15.md
├── hello-world.md
└── top-5
    ├── burgers.md
    └── movies.md

1 directory, 4 files
```

Use the docquery command line tool `dq` to query those documents and get back json results.

```bash
~/Projects/docquery $ dq -r test/fixtures star
[
  {
    "filePath": "/Users/jonmagic/Projects/docquery/test/fixtures/top-5/movies.md",
    "fileName": "movies.md",
    "snippet": "# Top 5 Movies",
    "lineMatches": ["* [Star Wars IV-VI](http://en.wikipedia.org/wiki/Star_Wars)"],
    "modifiedAtEpoch": 1431710896,
    "modifiedAt": "2015-05-15T17:28:25.250Z"
  }
]
```

Return file paths only from the search results with [`jq`](http://stedolan.github.io/jq/).

```bash
~/Projects/docquery $ dq -r test/fixtures star | jq .[].filePath
"/Users/jonmagic/Projects/docquery/test/fixtures/top-5/movies.md"
```

## License

The MIT License (MIT)

Copyright (c) 2015 Jonathan Hoyt

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