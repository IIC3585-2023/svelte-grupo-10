<script>
    import { onMount } from 'svelte';
    import { diets, calories, mealSelection } from '../../stores/userInfoStore.js'
    import { recipes, updateRecipes } from '../../stores/menuStore.js'
    import RecipeCard from '../RecipeCard.svelte'
    import Loading from '../Loading.svelte'

    let loading = true

    function getSelectedRecipes() {
        return $recipes.filter(item => item.mealType == $mealSelection)[0].recipes
    }

    onMount(() => {
        if (!$recipes.some(item => item.recipes.length > 0 && item.mealType == $mealSelection)) {
            let url = import.meta.env.VITE_RECIPES_URL
            const app_id = import.meta.env.VITE_ID
            const app_key = import.meta.env.VITE_KEY
            url += `?type=any&app_id=${app_id}&app_key=${app_key}&mealType=${$mealSelection}&calories=0-${$calories}&random=true&time=1-`
            $diets.forEach((diet) => {
                url += `&health=${diet}`
            })
            const options = {
                method: 'GET'
            }
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                updateRecipes($mealSelection, data.hits)
                loading = false
            })
        }
        loading = false;
    })
</script>

<div>
    {#if !loading}
        {#each getSelectedRecipes() as recipe}
            <RecipeCard recipe={recipe.recipe} />
        {/each}
    {:else}
        <Loading text="Generando Recetas"/> 
        <!-- <div class="max-w-fit flex flex-col justify-center items-center">
            <span class="loading loading-spinner text-primary"></span>
            <p>Generando Recetas...</p>
        </div> -->
    {/if}

</div>