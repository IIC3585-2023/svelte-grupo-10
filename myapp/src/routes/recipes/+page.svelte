<script>
    import { afterUpdate } from 'svelte';
    import { typeOfMeal, mealSelection, calories, caloriesLeft } from '../../stores/userInfoStore.js'
    import { likedRecipes } from '../../stores/menuStore.js'
    import { goto } from '$app/navigation';
    import SelectRecipes from './SelectRecipes.svelte'
    import Loading from '../Loading.svelte'

    afterUpdate(() => {
        if (!$calories) {
            goto('/form')
        }
        const navbar = document.getElementById('navbar')
        const navbarHeight = navbar.offsetHeight
        const calorybar = document.getElementById('calorybar')
        const calorybarHeight = calorybar.offsetHeight
        const allrecipes = document.getElementById('allrecipes')
        allrecipes.style.marginTop = `${(navbarHeight+calorybarHeight)/2}px`
        missingRecipes()
    });

    let activeTab = 1;
    let missingTypes = [];

    function handleClick(idx, type) {
        activeTab = idx + 1;
        $mealSelection = type
    }

    function getRoundness(index) {
        if (index + 1 === 1){
            return 'rounded-l-md'
        } else if (index + 1  === $typeOfMeal.length) {
            return 'rounded-r-md'
        } else {
            return 'rounded-none'
        }
    }

    function getTranslation(title) {
        const translations = [
            ['breakfast', 'Desayuno'],
            ['brunch', 'Brunch'],
            ['lunch', 'Almuerzo'],
            ['snack', 'Colación'],
            ['teatime', 'Once'],
            ['dinner', 'Cena']
        ]
        return translations.find(item => item[0] === title)[1]
    }
    
    function missingRecipes() {
        missingTypes = []
        let hasMissingRecipes = false
        $typeOfMeal.forEach((type) => {
            let typeIsMissing = false
            if ($likedRecipes.filter(elem => elem.typeOfMeal === type).length == 0) {
                typeIsMissing = true
            }
            if (typeIsMissing) {
                missingTypes.push(getTranslation(type))
                hasMissingRecipes = true
            }
        })
        return hasMissingRecipes
    }

    let menuShowing = false
    function showMenu() {
        menuShowing = $likedRecipes.length > 0
    }
    function hideMenu() {
        menuShowing = false
    }
    function deleteAll() {
        $caloriesLeft = $calories
        $likedRecipes = []
    }
    let missingShowing = false
    function showMissing() {
        missingShowing = true
    }
    function hideMissing() {
        missingShowing = false
    }

    // function getVisibility(index) {
    //     if (activeTab == index + 1) {
    //         return 'visible'
    //     } else {
    //         return 'hidden'
    //     }
    // }

    function handleFinish() {
        goto('/menu')
    }
</script>


{#if $calories}
    <div class="flex flex-col items-center justify-center">
        <div id="calorybar" class="flex flex-col lg:flex-row items-center justify-evenly w-full fixed top-28 z-10 info pb-2 pt-4">
            <div class="button-group">
                {#each $typeOfMeal as type, index}
                    <button
                        class="
                            py-2 px-4 text-sm font-medium focus:outline-none
                            {activeTab === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}
                            {getRoundness(index)}
                        "
                        on:click={() => handleClick(index, type)}
                    >
                    {getTranslation(type)}
                    </button>
                {/each}
            </div>
            <div class="text-lg text-white">Calorías totales por día: {$calories} kcal</div>
            <div class="text-lg text-white">Calorías restantes: {$caloriesLeft} kcal</div>
            <div on:mouseover={showMenu} on:mouseleave={hideMenu} class="tooltip rounded-md bg-gray-200 text-gray-700 py-2 px-4 text-sm font-medium focus:outline-none">
                Menú del día hasta ahora
                {#if menuShowing}
                    <div class="tooltiptext">
                        {#each $likedRecipes as recipe}
                            <p>{recipe.label}</p>
                        {/each}
                        <button on:click={deleteAll} class="rounded-md bg-red-500 text-white my-2 py-1 px-4 text-sm font-medium focus:outline-none">Eliminar todas</button>
                    </div>
                {/if}
            </div>
            {#if missingTypes.length > 0}
                <div on:mouseover={showMissing} on:mouseleave={hideMissing} class="tooltip rounded-md bg-red-500 text-white py-2 px-4 text-sm font-medium focus:outline-none">
                    Terminar Menú
                    {#if missingShowing}
                        <div class="tooltiptext-finish">
                            Te falta agregar una receta para:
                            {#each missingTypes as mealType}
                                <p>{mealType}</p>
                            {/each}
                        </div>
                    {/if}
                </div>
            {:else}
                <button class="rounded-md bg-green-500 text-white py-2 px-4 text-sm font-medium focus:outline-none" on:click={handleFinish}>
                    Terminar Menú
                </button>
            {/if}
        </div>
        <br>
        <div id="allrecipes" class="z-0">
            {#each $typeOfMeal as type, index}
                {#if activeTab === index + 1}
                    <div class="grid">
                        <SelectRecipes />
                    </div>
                {/if}
                <!-- <div class="grid" style="visibility: ">
                    <SelectRecipes />
                </div> -->
            {/each}
        </div>
    </div>
{:else}
    <Loading text="Redireccionando" />
{/if}

<style>
    .info {
        background-color: #263126;
    }
    .tooltip {
        position: relative;
        display: inline-block;
        z-index: 1;
    }
    .tooltip .tooltiptext {
        width: 200%;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        position: absolute;
        z-index: -1;
        top: 100%;
        right: 0;
        transform: translateX(-50%);
        left: 50%;
    }
    .tooltip .tooltiptext-finish {
        width: 200%;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        position: absolute;
        z-index: -1;
        top: 100%;
        right: 0;
        /* transform: translateX(-50%);
        left: 50%; */
    }
</style>