<script>
    import { afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';
    import { calories } from '../../stores/userInfoStore.js'

    // $: calories = userInfoStore.calories;

    function restoreCalories() {
        // $userInfo.calories = null
        // calories.set(null)
        console.log($calories)
        // calories.update(n => n + 1);
        calories.set(null);
        console.log($calories)
        // calories = calories
        // window.location.reload();
    }

    afterUpdate(() => {
        if (!$calories) {
            goto('/form')
        }
    });

</script>

<div class="max-w-fit flex flex-col justify-center items-center">
    <h2 class="text-3xl font-bold text-green-300">Consumo diario de</h2>
    <h2 class="text-3xl font-bold text-green-300">calorías recomendado</h2>
    <br />
    {#if $calories}
        <h1 class="text-2xl font-bold">{$calories} kcal</h1>
    {:else}
        <div class="max-w-fit flex flex-col justify-center items-center">
            <span class="loading loading-spinner text-primary"></span>
            <p>Redireccionando...</p>
        </div>
    {/if}
    <br />
    <button on:click={restoreCalories} class="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pr-1 w-5 h-5">
            <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
        </svg>
        Volver
    </button>
    <br />
</div>