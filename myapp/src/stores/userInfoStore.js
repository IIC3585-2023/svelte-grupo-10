import { writable } from 'svelte/store';

export const calories = writable(null);

export const caloriesLeft = writable(null);

export const typeOfMeal = writable([]);

export const diets = writable([]);

export const allergies = writable([]);

export const mealSelection = writable(null);