# Plot

Cooking and eating cake is cool. But it requires organisation:

- You may have not have all the necessary ingredients
- It may requires more time than you thought or it needs upward preparation
- You have no idea of which cake you want, which everyone enjoy
- You may have to compute quantities to match the size you want

We want the pastry to be accessible, fun to cook with your friends and without headache!

# How to do that ?

- Onboarding
  - present how the app work
    - Pick the date and choose the cake with your friends
    - Find the best products
    - When it's time, cook the cake
  - sign in with Google/FB/Twitter or email (optional)
  - creation of profiles - Me & people who will likely eat my cakes
  - creation of the first filter - The cakes I like
- cake selection: user choose between "Suggest me some cakes" & "I want THIS cake!"
- Suggest user 3 differents cake to be cooked for the next week-end
  - Confirm the date: date should have a slight influance on suggestion (confection time)
  - How to make relevant suggestion ?
    - Two discovery, one already ate (could be configured)
    - Ensure that a certain distance between suggestions is respected
  - One image per cake with a short description, naming the main ingredients
    - description could be generated from ingredient list and a list of random adjectives
    - photos could be fetched from social media, from specific tags/mention - the one with the most star would be used.
  - get the suggestion from a live collection of recipes that can be filtered. Don't use With or Without, rather, order by relevance
    - by ingredients (dropdown list with autocomplete)
    - by only easy-to-find ingredients (category: difficulty)
    - by cost
    - by occasion (christmas, thanksgiving, halloween, etc...) (category)
    - by confection time / rest time / bake time (category: difficulty)
    - by kind (pie, frozen cream, cake, pastry, individual cake) (category)
    - by original country / province / area (eg: East Asia, Latina) (dropdown list with autocomplete)
    - by confidence of enjoyement: Adventurous (exploration, masochistic, enjoy!) (category)
    - by texture (crunchy, soft, creamy, frothy) (category)
    - by utensil / equipement (oven, cooler, siphon) (category)
  - choose button (ignore the suggestions)
    - grid of cakes
    - accessible filters
    - button to create your own cake -> recipe editor
  - suggested cake are specific (not generic). There is a pre-made list of default choice for subrecipes. When user select a cake, it list all the default choices for this cake. User can then change subrecipe (home-made or merchandise). If subrecipe contains other subrecipes, place them by-side.
  - have a list of participant: cooker and eater
    - participant doesn't need the app to give their tastes
    - generic "guest" input number. One wouldn't want to enumerate all identities
    - share a link to friends to ask them about their tastes
    - don't allow participants to vote: some will be disappointed, and it may be below their expectation. Let surprise them!
- Allow user to force suggestion
- After suggestion, for compatible cake, suggest decoration and dressing (for cooker only)
  - same way of working than for cake suggestion
  - should follow basic rule of taste/color harmony
  - suggestion that are never choose (globally) have less chance to appear with this cake
- After suggestion: let user confirm that he owns the required equipement (only first time seen). --> Or do it on onboarding
- After suggestion: let user confirm the confection time (with eventually upward preparation, and rest time), to be ready for tea time (default, could be changed)
- After confirming time: Dialog: You can review the shopping list and instructions or leave the app - you will be notified when it's Cake Time!
- After confirming time or when launching the app: shopping list for the next event,
  - user can still modify quantities
    - user can match quantities with specific pan size
    - user can ask additional "slice" to the cake (default match eaters)
    - when it makes sense, user can choose the size of one slice
  - user can cross items already owned (=> user has at least the quantity required. If slice are added the item is uncrossed ; displaying only the difference could be confusing).
  - allow user to indicate that he already own a product of one sub-recipe (eg: the dough. Could be done elsewhere: when choosing subrecipes): this will remove from the shopping list items from this sub-recipe + remove the instructions of this sub-recipe.
  - user can long press to set the quantity owned (slider from 0 to +20% required)
  - when user lack a little of one ingredient that need to be proportional to other, it can suggest the user to optimize the slice size to match user's ingredient quantities
  - user can touch an item to get more information or request one (maker name, retailer)
    - when user request information, it notify users who made this cake to ask where they bought it, or the name of the branded product
    - notion of quality ? discount (red) - basic (white) - premium (blue) - premium+ (violet): too excentric
  - user can export / share the list in other product - Google Keep ; email ; sms ; clipboard
  - the export feature should be configured in another screen - to automatically export in other app.
- In the same hierarchy of Shopping List: Instructions
  - all instructions visible, bundled by cooker box (cooker A: 1. 2. 3. ; cooker B: 1. 2. 3.)
  - start button: when multiple cooker: popup to explain that each cooker can be on his device
    - start button launch the timer, cooker instructions are kept in sync
    - a quit button is displayed (with confirmation popup), reseting the progress
    - only one instruction is displayed, with possibility to go for the next or previous
    - a 'roadmap' is displayed to indicate the progress.
    - integrate a timer for baking (not mandatory ; suggest it with a button 'start timer')
    - when finished: congrats ! display cooking time - suggest share with appropriate #tag
      - if cooking time is less than the average, show it
- After completing the cake, display the cutting map of the cake
- Recipe editor
  - can use base recipe to customize them
  - could be shared & approved by other users
- Subrecipes Default Settings
  - list all subrecipes choice (eg: 4 recipes for "pate brisée")
  - control with cursor: sugar, rich, time & filters: oven, blender

# Recipe System

Try to create generic recipes. But suggest specific cake.

Why ?

- Easy to customize cake, or to create a new cake using base recipe
- Easier to manage when recipes use base recipe (factorisation)
- Easier to filter

How ?

- fractale organisation ? With a graph of dependency for tasks, it could detect a new sub-recipe at each merging point
- sub-recipe are saved once, with variables over actual quantities
- quantities that must remain proportional have to be bound. Other could vary (eg: till 20%)

# Design

- Imagery of Alice in the wonderland
- Design like Mario Party
