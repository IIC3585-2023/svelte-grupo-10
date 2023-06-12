<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import { typeOfMeal, diets, mealSelection, calories, caloriesLeft } from '../../stores/userInfoStore.js'
    import { likedRecipes } from '../../stores/menuStore.js'

    let mealTypesOptions = [
        { value: 'breakfast', label: 'Desayuno'},
        { value: 'brunch', label: 'Brunch'},
        { value: 'lunch', label: 'Almuerzo'},
        { value: 'snack', label: 'Colación'},
        { value: 'teatime', label: 'Once'},
        { value: 'dinner', label: 'Cena'}
    ];
    let healthLabelsOptions = [
        { value: 'dairy-free', label: 'Sin productos lácteos'},
        { value: 'gluten-free', label: 'Sin gluten'},
        { value: 'kosher', label: 'Kosher'},
        { value: 'low-sugar', label: 'Bajo en azúcar'},
        { value: 'pescatarian', label: 'Pescetariana'},
        { value: 'vegetarian', label: 'Vegetariana'},
        { value: 'vegan', label: 'Vegana'}
    ];
    let selectedMealTypes = [];
    let selectedDiets = [];

    onMount(() => {
        $caloriesLeft = $calories
        $typeOfMeal = []
        $diets = []
        $mealSelection = null
        $likedRecipes = []
    })

    function handleSubmit() {
        $typeOfMeal = selectedMealTypes
        $diets = selectedDiets
        $mealSelection = selectedMealTypes[0]
        console.log(selectedMealTypes)
        goto('/recipes')
    }
</script>

<!-- <form on:submit|preventDefault={handleSubmit} class="max-w-full flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-green-300">Ingresa tus preferencias alimentarias</h1>
    <br />
    <div class="grid grid-cols-2 w-full">
        <div class="col-start-1">
            <label class="text-xl font-bold">Comidas diarias(obligatorio):</label>
            <div class="flex-col">
            {#each mealTypesOptions as mealType}
                <label class="input-group py-1">
                    <span class="bg-secondary-content">{mealType.label}</span>
                    <input type=checkbox bind:group={selectedMealTypes} name="selectedMealTypes" value={mealType.value} class="checkbox checkbox-primary">
                </label>
            {/each}
            </div>
        </div>
        <br />
        <div class="col-start-2">
            <label class="text-xl font-bold">Dieta alimentaria(opcional):</label>
            <div class="flex flex-col">
            {#each healthLabelsOptions as healthLabel}
                <label class="input-group py-1">
                    <span class="bg-secondary-content">{healthLabel.label}</span>
                    <input type=checkbox bind:group={selectedDiets} name="selectedDiets" value={healthLabel.value} class="checkbox checkbox-primary">
                </label>
            {/each}
            </div>
        </div>
    </div>
    <br />
    {#if selectedMealTypes.length > 0}
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl text-lg" type="submit">Seleccionar Recetas</button>
    {:else}
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl text-lg" type="submit" disabled="disabled">Seleccionar Recetas</button>
    {/if}
</form> -->
<form on:submit|preventDefault={handleSubmit} class="max-w-full flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-green-300">Ingresa tus preferencias alimentarias</h1>
    <br />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="text-xl font-bold">Comidas diarias (obligatorio):</label>
        <div class="flex-col">
          {#each mealTypesOptions as mealType}
          <label class="input-group py-1">
            <span class="bg-secondary-content max-w-md w-full">{mealType.label}</span>
            <input type=checkbox bind:group={selectedMealTypes} name="selectedMealTypes" value={mealType.value} class="checkbox checkbox-primary">
          </label>
          {/each}
        </div>
      </div>
      <div>
        <label class="text-xl font-bold">Dieta alimentaria (opcional):</label>
        <div class="flex flex-col">
          {#each healthLabelsOptions as healthLabel}
          <label class="input-group py-1">
            <span class="bg-secondary-content max-w-md w-full">{healthLabel.label}</span>
            <input type=checkbox bind:group={selectedDiets} name="selectedDiets" value={healthLabel.value} class="checkbox checkbox-primary">
          </label>
          {/each}
        </div>
      </div>
    </div>
    <br />
    {#if selectedMealTypes.length > 0}
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl text-lg" type="submit">Seleccionar Recetas</button>
    {:else}
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl text-lg" type="submit" disabled="disabled">Seleccionar Recetas</button>
    {/if}
  </form>
  