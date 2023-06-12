<script>
    import { afterUpdate, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { calories } from '../../stores/userInfoStore.js'
    import UserForm from './UserForm.svelte'
    import Loading from '../Loading.svelte'
    
    onMount(() => {
        $calories = null
    })

    afterUpdate(() => {
        if ($calories) {
            goto('/diet-calculator')
        }
    });

</script>

{#if !$calories}
    <UserForm />
{:else}
    <!-- <div class="max-w-fit flex flex-col justify-center items-center">
        <span class="loading loading-spinner text-primary"></span>
        <p>Calculando calorías...</p>
    </div> -->
    <Loading text="Calculando Calorías"/>
{/if}