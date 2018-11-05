# How to present recipes in a graph DB ?

## Properties of Graph DB
Graph DB have:
- node with key-value props
- node can be labelled
- named & directed link between node
- links can have props

## Implementation example
### Schema 1
```
node: "bol"
prop: id: 0
label: ustensil


node: "beurre battu"
prop: id: 1

node: "farine tamisee"
prop: id: 2

node: "ajouter x dans y"
prop: id: 3
label: instruction

node: "pate brisee"
link: ingredient -> #1 prop: factor: 0.3
link: ingredient -> #2 prop: factor: 0.7
link: ustensil -> #0 prop: size: 'S'
link: instruction -> #3 prop: x: 'link1', y: 'link2' ?
```
### Schema 2
```
node: "bol"
prop: id: 0
label: ustensil


node: "beurre battu"
prop: id: 1

node: "farine tamisee"
prop: id: 2

node: "ajouter x dans y"
prop: id: 3
label: instruction

node: "pate brisee - instruction1"
prop: id: 4
link: instruction -> #3
link: ingredient -> #1 prop: factor: 0.3, arg:x
link: ingredient -> #2 prop: factor: 0.7, arg:y
link: ustensil -> #0 prop: size: 'S', arg:z
link: next_instruction -> #4

node: "pate brisee"
label: "subrecipe"
link: instruction -> #3 prop: pos:'1'
link: instruction -> #4 prop: pos:'2'
```

## Requirements
- possiblity of referencing a link from property of another link (ingredient from instruction property) ? Could use an intermediate node to link ustensils & ingredients or previous
- how to handle internal sub recipe ? -> always externalize them, so we end up with a linear path of instructions
- how to handle multiple choice for ingredient ? intermediate node