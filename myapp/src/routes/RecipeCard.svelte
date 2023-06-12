<script>
    export let recipe;
    export let hideButtons = false;
    import { caloriesLeft, mealSelection } from '../stores/userInfoStore.js'
    import { likedRecipes } from '../stores/menuStore.js'
    const { label, image, calories, dietLabels, totalTime, ingredientLines } = recipe;
    
    let hasBeenAdded = $likedRecipes.findIndex((elem) => elem.label == label) !== -1

    $: showDeleteButton = hasBeenAdded && $likedRecipes.length > 0
    
    function addRecipe() {
        $caloriesLeft -= calories/recipe.yield
        const meal = {
            label,
            ingredientLines,
            calories,
            typeOfMeal: $mealSelection,
            image,
            totalTime,
            dietLabels,
            yield: recipe.yield
        }
        likedRecipes.update(items => [...items, meal]);
        hasBeenAdded = true
    }    

    function removeRecipe() {
        $caloriesLeft += calories/recipe.yield
        const index = $likedRecipes.findIndex((elem) => elem.label == label)
        $likedRecipes.splice(index, 1)
        hasBeenAdded = $likedRecipes.some(elem => elem.label == label)
    }
</script>

<div class="card lg:card-side bg-base-100 shadow-xl justify-evenly items-center mb-8 max-w-4xl md:grid grid-cols-2">
    <div class="flex flex-col justify-center items-center pl-5 pb-3">
        <h2 class="text-green-400 text-xl font-bold pb-2">{label}</h2>
        <figure class="max-h-68 max-w-68 w-68"><img src="{image}" alt="{label}"/></figure>
    </div>
    <div class="card-body max-w-md">
        <div class="flex">
            <p class="text-green-400 text-lg">Calorías totales: </p>
            <p class="text-slate-100 text-lg pl-1">{calories} kcal</p>
        </div>
        {#if dietLabels.length > 0}
            <div class="flex">
                <p class="text-green-400 text-lg">Etiquetas: </p>
                {#each dietLabels as diet}
                    <p class="text-slate-100 text-lg" key={diet}>{diet}</p>
                {/each}
            </div>
        {/if}
        <div class="flex">
            <p class="text-green-400 text-lg">Tiempo de preparación: </p>
            <p class="text-slate-100 text-lg pl-1">{totalTime} minutos</p>
        </div>
        <div class="flex">
            <p class="text-green-400 text-lg">Cantidad de porciones: </p>
            <p class="text-slate-100 text-lg pl-1">{recipe.yield}</p>
        </div>
        <div class="flex">
            <p class="text-green-400 text-lg">Calorías por porción: </p>
            <p class="text-slate-100 text-lg pl-1">{calories/recipe.yield} kcal</p>
        </div>
        <details class="flex flex-col justify-between collapse collapse-arrow bg-secondary-content">
            <summary class="text-green-400 text-lg collapse-title">Ingredientes:</summary>
            <div class="collapse-content">
            {#each ingredientLines as ingredient}
                <p class="text-slate-100 text-lg" key={ingredient}>{ingredient}</p>
            {/each}
            </div>
        </details>
        {#if !hideButtons}
            <div class="card-actions justify-end">
                {#if showDeleteButton}
                    <button on:click={removeRecipe} class="btn btn-error">Eliminar Receta</button>
                {/if}
                {#if $caloriesLeft - calories/recipe.yield > 0}
                    <button on:click={addRecipe} class="btn btn-primary">Agregar Receta</button>
                {:else}
                    <button class="btn btn-primary text-white py-2 px-4 rounded-3xl bg-gray-400 col-start-1" disabled>Agregar Receta</button>
                {/if}
            </div>
        {/if}
    </div>
</div>