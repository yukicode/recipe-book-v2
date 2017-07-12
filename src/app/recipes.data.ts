import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

var recipeData = [
    {
        title: "Dumplings",
        description: "Tasty omemade pork dumplings",
        prepTime: "30 minutes",
        cookTime: "30 minutes",
        serving: "4",
        tags: ["meat", "pork", "dumpling", "Asian"],
        ingredients: [
            new Ingredient("ground pork", 2, "lb"),
            new Ingredient("green garlic", 1, "bundle"),
            new Ingredient("egg", 1),
            new Ingredient("salt", 0 ,"to taste"),
            new Ingredient("dark soy sauce", 2, "tbsp"),
            new Ingredient("light soy sauce", 4, "tbsp"),
            new Ingredient("white wine/Vodka", 1, "tbsp"),
            new Ingredient("dumpling skin", 2, "packages"),
            new Ingredient("Olive oil", 3, "tbsp"),
            new Ingredient("Dumpling dipping sauce", 1, "bottle"),
        ],
        steps: [
            "Making dumplings: In a big mixing bowl, add ground pork and an egg. Dice green garlic and add it to the mixing bowl. Add 1-2 tbsp of dark soy sauce,  2-4 tbsp of light soy sauce, 1 tbsp of alcohol and add salt to taste. Mix everything in the bowl. Wrap the fillings in the dumpling skin.",
            "Boiling: In a medium pot, add half a pot of water and heat to boil. Add dumplings in and wait until it boils again. Add ¼ cup of water and wait for boiling again. Repeat the process one more time. When all the dumpling are floating, they are cooked. Drain the dumplings and serve with dipping sauce.",
            "Steaming: Put dumplings in the steamer for 15-20 mins. Server with dipping sauce.",
            "Frying: Spray a big frying pan with oil spray. Put dumplings in the frying pan, make sure that the dumplings are not touching each other. Add water till it reaches about half the height of the dumplings. Cover the pan and cook at medium-high heat until the water boils down. When the water is almost gone, add olive oil and turn the heat to medium-low. Fry and brown the dumplings then serve with dipping sauce."
        ],
        imagePaths: [
            "http://recipefreak.co.uk/wp-content/uploads/2014/03/chineseDumplings1.jpg"
        ]
    },
    {
        title: "Chia Pudding",
        description: "Serves 2-ish, maybe 1 if it’s Matt. Hard to know, since Tracy and Kainoa are the only currently known test subjects.",
        prepTime: "15 minutes",
        cookTime: "12 hours",
        serving: "2",
        tags: ["diary", "vegetarian"],
        ingredients: [
            new Ingredient("chia seed", 0.25, "cup"),
            new Ingredient("milk", 1, "cup"),
            new Ingredient("Honey/Taro flavor", 0,"to taste")
        ],
        steps: [
            "Put chia seeds and milk in a sealable container, stir or shake and let sit in the fridge overnight.",
            "Stir in flavoring and add fruit to servings as desired."
        ],
        imagePaths: [
            "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2013/12/19/0/FNM_010114-Chia-Seed-Pudding-Recipe_s4x3.jpg.rend.sniipadlarge.jpeg"
        ]
    }
]

var recipes = [];
for (var i = 0; i < recipeData.length; i++) {
    var temp = new Recipe(
        recipeData[i].title,
        recipeData[i].description,
        recipeData[i].prepTime,
        recipeData[i].cookTime,
        recipeData[i].serving,
        recipeData[i].tags,
        recipeData[i].ingredients,
        recipeData[i].steps,
        recipeData[i].imagePaths
    );
    recipes[i] = temp;
}

export const RECIPES: Recipe[] = recipes;