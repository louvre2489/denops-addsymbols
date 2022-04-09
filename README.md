# denops-addsymbols
Enclose the word at the cursor position with symbols.

## Requirements
This requires [Deno](https://deno.land) and [denops.vim](https://github.com/vim-denops/denops.vim).

## Usage
### Enclose with ''
```
:DSQ

word is converted to 'word'
```

### Enclose with ""
```
:DDQ

word is converted to "word"
```

### Enclose with {}
```
:DB

word is converted to {word}
```

### Enclose with [] 
```
:DS

word is converted to [word]
```

### Enclose with <>
```
:DA

word is converted to <word>
```

### Enclose with ()
```
:DP

word is converted to (word)
```
