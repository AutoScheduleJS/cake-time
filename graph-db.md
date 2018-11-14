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
link: ingredient -> #1 prop: factor: 0.3, arg:x (x = argument de l'instruction #3)
link: ingredient -> #2 prop: factor: 0.7, arg:y (y = argument de l'instruction #3)
link: ustensil -> #0 prop: size: 'S', arg:z (z = argument de l'instruction #3)
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

## Rules for recipes
- recipes can use generic product node to describe the property of one ingredient
- one ingredient has a family node, regrouping similar and variant products, linking to purchasable products or recipe for home-made
- no backward ref, causing issue when requesting paths
- local information like availability & price, priority in product choice are stored elsewhere
- the subrecipe problem. How to have one workflow for all edge cases
  - don't use ingredient choice, instead, create a new recipe (milk or water). It simplify the workflow.
  - how to manage group ? Black Chocolate, Chocolate, Chocolate with > 70% Cacao ?
    - store cypher search ?
      - Script running every night to update nodes matching cypher search
    - how to define default ? A default in one broad category could be not suitable for a smaller category
    - maintain node & relationships ? User responsibility ?
  - there is a generic requirement: (recipe) -> (requirement) *-> (subrecipe)
  - do we handle buyable choice like home-made choice ?
    - pros: same workflow
    - cons: UX have to design feature "change subrecipe" more accessible - could be visible at selection choice
    - keep a property 'merchandise' or 'home-made'
  - default choice come from user-land. It could be choosen by user, and the default choice could be made from original country (different culture -> different product)
- when searching, should first retrieve a subgraph after applying defaultOptions, then filter, then get 3 random
  - use custom procedure?

## Topology
- :Recipe // End recipe
  - relationships
    - :REQUIREMENTS { factor:x } // All required products, subrecipes, ustensil. Prefer products over direct merchandise or subrecipe as it is less flexible
  - properties
    - code
    - name
    - preparationTime // time for this recipe (excluding subrecipes)
    - restTime
    - bakeTime
    - cost // same as time - approximation of the cost per g (computed from ingredient cost & factor)
    - baseQuantity // quantity for one person
    - directions: ["json_of_direction"]
- :Product // Familly node for subrecipes or merchandise
  - relationships
    - :SATISFY // subrecipes or merchandise
  - properties
    - code
    - name
    - cypher request to match
- :Subrecipe & :Merchandise could have the same schema than :Recipe