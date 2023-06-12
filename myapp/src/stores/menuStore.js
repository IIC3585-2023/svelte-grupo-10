import { writable } from 'svelte/store';

export const likedRecipes = writable([]);

// export const recipesGenerated = writable(false)

export const recipes = writable([
    { mealType: 'breakfast', recipes: []},
    { mealType: 'brunch', recipes: []},
    { mealType: 'lunch', recipes: []},
    { mealType: 'snack', recipes: []},
    { mealType: 'teatime', recipes: []},
    { mealType: 'dinner', recipes: []}
]);

export function updateRecipes(type, newRecipes) {
    recipes.update(items => {
        return items.map(item => {
            if (item.mealType === type) {
                return { ...item, recipes: newRecipes };
            }
            return item;
        });
    });
}
