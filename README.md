## 🌰 Walnut - DSL for generating chess problem cards

[![Build Status](https://travis-ci.com/Walnut-Sys/walnut.svg?branch=main)](https://travis-ci.com/Walnut-Sys/walnut)
[![codecov](https://codecov.io/gh/Walnut-Sys/walnut/branch/main/graph/badge.svg?token=YueOCxQelG)](https://codecov.io/gh/Walnut-Sys/walnut)

**Walnut** is a DSL (domain specific language) for generating chess problem cards. Walnut supports algebraic chess notation, so the language is intuitively understandable. You can generate cards in different formats whether graphic or html.

### DSL

Cards are generated via creating `.walnut` source code file. Currently DSL contains 3 parts:

- `LOCALIZATION` localization configuration. You can choose english - latin letters(`EN`) or russian(`RU`) - Cyrillic
- `COLORS` colors configuration with standard hex string colors (squares, pieces, border, symbols)
- `WHITE POS`, `BLACK POS` declaration of pieces on board via algebraic notaion

```
LOCALIZATION: EN
COLORS:
  white squares: #f9c48d
  black squares: #84271d
  white pieces: #c38748
  black pieces: #150503
  border: #a73a2f
  symbols: #efefef

WHITE POS: Ra1,Nb1,Bc1,Qd1,Ke1,Bf1,Ng1,Rh1,a2,b2,c4,d2,e2,f2,g2,h2
BLACK POS: Ra8,Nb8,Bc8,Qd8,Ke8,Bf8,Ng8,Rh8,a7,b7,c7,d7,e7,f7,g7,h7
```

You can skip specification of `LOCALIZATION`, it will default to `EN`.
Also you can skip specification of `COLORS`, walnut default theme will be used.
So at minimum you source file would look as following:

```
WHITE POS: Ra1,Nb1,Bc1,Qd1,Ke1,Bf1,Ng1,Rh1,a2,b2,c4,d2,e2,f2,g2,h2
BLACK POS: Ra8,Nb8,Bc8,Qd8,Ke8,Bf8,Ng8,Rh8,a7,b7,c7,d7,e7,f7,g7,h7
```

### CLI

To generate cards you can use our command line interface, it does not require you to write any additional code.
Basic command is `walnut-chess`, you can run it straight from terminal if you use unix os, if you use Windows you can add `npx walnut-chess` to run it from terminal. Or you can also create npm script with the command:

```json
"scripts": {
  "walnut:start": "walnut-chess"
}
```

**Arguments:**

- `--help` - see all avavilable attributes and their purpose.
- `--source or -s` - specify path to source code `.walnut` file
- `--out or -o` - specify path and file name of output file
- `--size` - specify the size of a card in pixels (for image outputs only)
- `--html` - generate into html file
- `--jpeg` - generate into jpeg file
- `--png` - generate into png file
- `--tiff` - generate into tiff file
- `--webp` - generate into webp file
- `--xml` - generate into xml file
- `--json` - generate into json file
- `--version` - check package version

**Note:** json and xml output files contain output from our parser and could be used for development or other transformations, all other output options create ready visual chess cards.

### Examples

<br>

- **Let's look in the default example from above:**

```
LOCALIZATION: EN
COLORS:
  white squares: #f9c48d
  black squares: #84271d
  white pieces: #c38748
  black pieces: #150503
  border: #a73a2f
  symbols: #efefef

WHITE POS: Ra1,Nb1,Bc1,Qd1,Ke1,Bf1,Ng1,Rh1,a2,b2,c4,d2,e2,f2,g2,h2
BLACK POS: Ra8,Nb8,Bc8,Qd8,Ke8,Bf8,Ng8,Rh8,a7,b7,c7,d7,e7,f7,g7,h7

```

<img src="https://walnut-chess.s3.eu-central-1.amazonaws.com/output.png" alt="drawing" width="370"/>

<br>
<br>

- **Now we can change some colors:**

```
LOCALIZATION: EN
COLORS:
  white squares: #f1f1f1
  black squares: #403b35
  white pieces: #b9b9b9
  black pieces: #c78a00
  border: #131313
  symbols: #7d691e

WHITE POS: Ra1,Nb1,Bc1,Qd1,Ke1,Bf1,Ng1,Rh1,a2,b2,c4,d2,e2,f2,g2,h2
BLACK POS: Ra8,Nb8,Bc8,Qd8,Ke8,Bf8,Ng8,Rh8,a7,b7,c7,d7,e7,f7,g7,h7

```

<img src="https://walnut-chess.s3.eu-central-1.amazonaws.com/output-color.png" alt="drawing" width="370"/>

<br>
<br>

- **Here is an example with Russian localization and four knights game**

```
LOCALIZATION: RU
COLORS:
  white squares: #f9c48d
  black squares: #84271d
  white pieces: #c38748
  black pieces: #150503
  border: #a73a2f
  symbols: #efefef

WHITE POS: Ла1,Кв3,Св1,Фг1,Крд1,Се1,Ке3,Лз1,а2,б2,в2,г4,д2,е2,ж2,з2
BLACK POS: Ла8,Кв6,Св8,Фг8,Крд8,Се8,Ке6,Лз8,а7,б7,в7,г5,д7,е7,ж7,з7
```

<img src="https://walnut-chess.s3.eu-central-1.amazonaws.com/output-localization.png" alt="drawing" width="370"/>
