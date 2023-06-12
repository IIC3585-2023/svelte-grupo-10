<script>
    import { afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';
    import { calories, typeOfMeal } from '../../stores/userInfoStore.js'
    import DailyCalories from './DailyCalories.svelte'
    import DietForm from './DietForm.svelte'
    import Loading from '../Loading.svelte'

    afterUpdate(() => {
        if (!$calories) {
            goto('/form')
        }
    });

</script>

{#if $calories}
    
    <div class="flex flex-col lg:flex-row items-center justify-evenly pt-5 w-full">
        <div>
            <DailyCalories />
        </div>
        <div>
            <DietForm />
        </div>
    </div>

{:else}
    <Loading text="Redireccionando"/>
    <!-- <div class="max-w-fit flex flex-col justify-center items-center">
        <span class="loading loading-spinner text-primary"></span>
        <p>Redireccionando...</p>
    </div> -->
{/if}
