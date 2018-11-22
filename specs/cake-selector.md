How to present progress through selection?

## Epic: Cake Selection - Suggest me some cakes

1. confirm participants
2. confirm cake time (deadlines)
3. confirm filters
4. choose between cakes (could be > 1 if lots of participants)
5. add topping/dressing
6. confirm subrecipes

1) is a one time setup: it will unlikely change after first setup. 4) depends on 1)
2) same as 1)
3) likely to changer after viewing suggestions - to adjust them
4) depends on 4)
5) depends on 5)

groups:

- [1, 2] -> suggestion setup
- [3, 4] -> cake choice
- [5] -> plus extra
- [6] -> last options

## Stories

### Suggestion Setup

Goal: setup context: who will participate and when ?

User choose who will eat by adding profile or by giving the number of guest. If the profile is not
known by the app, it let the user create a new profile. User will want to access all the feature of
profile creation, especially tastes. Profile added can be easily edited.

To better suggest cake, user has to inform when cake has to be ready. Default to next saturday. User
is informed of day left.

### Cake Choice

Goal: Help user to quickly select a recipe that is likely to be enjoyed by everyone.

User will want to restrict possibilities to match his needs. User will want to keep these rules of
restrictions saved so he can reuse them without specifying them again.

When seeing a cake that he or one of the participant doesn't like, user will want to refine
profile's tastes. User might want additional information about suggested cake, like: more photos,
descriptions If user leaves the app as is, he will want to retrieve it when he'll go back.

User would want to be informed about participant satisfaction and might decide to do one or two cakes to cover a larger satisfaction.

### Plus Extra

Goal: help user to quickly select topping or dressing for this cake.

Each cake can suggest his own dressing. User will want to view available dressing for this kind of
cake. Additionally, sides can be suggested for this kind of cake. User might want to choose many of
them, or none.

### Last Options

Goal: Allow user to customize the recipe, by changing subrecipes

User will want to change subrecipes with his own. User might want appropriate information about
subrecipes, like time & ustensil required + comparison of composition with average

User might want to review total time used

## Epic: Cake Selection - I want THIS cake!

1. choose filters
2. select one or multiples cakes
3. add topping/dressing
4. confirm subrecipes

1) likely to changer after viewing suggestions - to adjust them
2) depends on 2)
3) depends on 3)

groups:

- [1, 2] -> cake choice
- [3] -> plus extra
- [4] -> last options

### Cake Choice

Categories are displayed:
- Recipe of the Week
- Trending
- Popular pie
- Popular cake
- Popular dessert
- Last added

Popular categories are dynamic: from popular recipes, regroup them. Display group within threshold of items.
Search Bar used to add filters -> same behavior as Tasty : suggest pre-made filters organized by category + let user filter on ingredients or recipe name
On desktop: having a side panel with all filters displayed and with same behavior as chip - with two states enabled/disabled + dropdown of current filter name with a save button. When modifying current filter, it switch the current filter to _current filter name - modified_, and a save button appear. When user click the save button, it opens a popup to change the name. If the name replace an existing filter's name, the confirm button label change from "save" to "overwrite"
On thin screen, it could be a top panel with only enabled filters, two columns (with/without), and an ADD button to pop up a complete filter screen. When scrolling, the top bar could disappear and  reappear apon scroll up.