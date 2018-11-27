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
3) likely to changer after viewing suggestions - to adjust them -> using filter can prevent system to recommand relevant cake considering all participant's tastes. Better to only filter on event
3') user can filter on difficulty & price
4) depends on 4)
5) depends on 5)

groups:

- [1, 2, 3] -> suggestion setup
- [4] -> cake choice
- [5] -> plus extra
- [6] -> last options

## Stories

Cake selection occurs on one card, with each step completed collapsed, leaving only a summary. Works like expansion panel.

### Suggestion Setup

Goal: setup context: who will participate and when ?

User choose who will eat by adding profile or by giving the number of guest. If the profile is not
known by the app, it let the user create a new profile. User will want to access all the feature of
profile creation, especially tastes. Profile added can be easily edited.

To better suggest cake, user has to inform when cake has to be ready. Default to next saturday. User
is informed of day left.

Choose event 'none' or specific -> tag system; like Steam store page. How to handle difference of event with culture?
eg: UK & Korea haven't the same culinary requirements for Christmas.
Handle these difference in the same way than local info like price & ingredients availability.
How to handle when the event is not yet created, or the user want to add some modifications to the rules?
Same way to create new profile for participant

After this step is completed, participante remains visible through the whole process so user can easily edit their profile (to change tastes)

### Cake Choice

Goal: Help user to quickly select a recipe that is likely to be enjoyed by everyone.

When seeing a cake that he or one of the participant doesn't like, user will want to refine
profile's tastes. User might want additional information about suggested cake, like: more photos,
descriptions. If user leaves the app as is, he will want to retrieve it when he'll go back.

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

## Epic: Cake Selection - Let me choose

"I want THIS cake" title imply that we already know what we want. But as we let the user browse the whole recipes base, it may be better to name it "Let me choose". This suit the intention of choosing the recipe we had before browsing, and the intention to explore.

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

Popular categories are dynamic: Popular in [user's town]; Recent from friends; Recommandation; from popular recipes, regroup them (pie, frozen,...). Display group within threshold of items.
Search Bar used to add filters -> same behavior as Tasty : suggest pre-made filters organized by category + let user filter on ingredients or geographic area
On desktop: having a side panel with all filters displayed and with same behavior as chip - with two states enabled/disabled + dropdown of current filter name with a save button. When modifying current filter, it switch the current filter to _current filter name - modified_, and a save button appear. When user click the save button, it opens a popup to change the name. If the name replace an existing filter's name, the confirm button label change from "save" to "overwrite"
On thin screen, it could be a top panel with only enabled filters, an ADD button to pop up a complete filter screen. When scrolling, the top bar could disappear and reappear apon scroll up.

Cake info: when user tap on a cake suggestion, what are information that must be given ?
- ingredients ? Subrecipes + ingredients
- ustensils ? Should be filtered one time for all
- photos ? from social network
- instructions ? why ? Too early & depends on subrecipe choice
- available extra ? Yeah
- subrecipes ? Has to wait extra -> does subrecipes
Instead of tapping a cake to higlight it and then confirm, it could be a new page with all info related, with a back & choose button.
On cake page, a "I love it" & "I don't like it" buttons could shortcut profil's taste edition.

How to handle subrecipe already prepared ? Add an entry "ready to use [subrecipe name]" to the dropdown: it will not appear to shopping list nor instructions.
