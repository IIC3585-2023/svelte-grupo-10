<script>
    import RecipeCard from '../RecipeCard.svelte'
    import { likedRecipes } from '../../stores/menuStore.js'

    function getLikedRecipesByType() {
        const nameDict = {
            "breakfast": "Desayuno",
            "lunch": "Almuerzo",
            "dinner": "Cena",
            "snack": "Colación",
            "brunch": "Brunch",
            "teatime": "Once"
        }
        const likedTypes = $likedRecipes.map((recipe) => recipe.typeOfMeal)
        const uniqueTypes = [...new Set(likedTypes)]
        const likedRecipesByType = uniqueTypes.map((mealType) => {
            return {
                mealType: mealType,
                name: nameDict[mealType],
                recipes: $likedRecipes.filter((recipe) => recipe.typeOfMeal === mealType)
            }
        })
        return likedRecipesByType;
    }
</script>

<div class="flex flex-col items-center justify-center">
    {#if $likedRecipes.length > 0}

        {#each getLikedRecipesByType() as group}
            <h1 class="text-3xl font-bold text-green-300">{group.name}</h1>
            {#each group.recipes as recipe}
                <RecipeCard recipe={recipe} hideButtons={true}/>
            {/each}
        {/each}
    {:else}
        <p class="text-center text-primary text-2xl">No tienes recetas favoritas</p>
    {/if}
</div>