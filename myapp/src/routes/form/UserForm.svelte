<script>
    import { calories, caloriesLeft } from '../../stores/userInfoStore.js'
    let age, weight, height;
    let genders = [
        { value: 'male', label: 'Masculino'},
        { value: 'female', label: 'Femenino'},
        { value: 'other', label: 'Otro'}
    ];
    let activityLevels = [
        { value: 'level_1', label: 'Sedentario: Poco o nada de ejercicio'},
        { value: 'level_2', label: 'Ejercicio 1-3 veces por semana'},
        { value: 'level_3', label: 'Ejercicio 4-5 veces por semana'},
        { value: 'level_4', label: 'Ejercicio diario o ejercicio intenso 3-4 veces por semana'},
        { value: 'level_5', label: 'Ejercicio intenso 6-7 veces por semana'},
        { value: 'level_6', label: 'Ejercicio diario muy intenso, o trabajo físico'}
    ];
    let fitnessPlans = [
        { value: 'maintain weight', label: 'Mantener peso'},
        { value: 'Mild weight loss', label: 'Pérdida de peso leve'},
        { value: 'Weight loss', label: 'Pérdida de peso'},
        { value: 'Extreme weight loss', label: 'Pérdida de peso extrema'},
        { value: 'Mild weight gain', label: 'Aumento de peso leve'},
        { value: 'Weight gain', label: 'Aumento de peso'},
        { value: 'Extreme weight gain', label: 'Aumento de peso extremo'}
    ];
    let selectedGender, selectedActivityLevel, selectedFitnessPlan;

    function handleSubmit() {
        let url = import.meta.env.VITE_CALORIES_URL
        url += `?age=${age}&gender=${selectedGender}&height=${height}&weight=${weight}&activitylevel=${selectedActivityLevel}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST
            }
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const filteredData = data.data.goals[selectedFitnessPlan]
            if (typeof filteredData == "number") {
                updateCalories(filteredData)
            } else {
                updateCalories(filteredData.calory)
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    function updateCalories(new_calories){
        calories.update(calories => new_calories)
        caloriesLeft.update(caloriesLeft => new_calories)
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="max-w-fit flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-green-300">Ingresa tus datos</h1>
    <br />
    Edad
    <input bind:value={age} required min=0 max=80 type="number" class="input input-bordered input-primary w-full max-w-xs bg-slate-200 text-primary-content"/>
    Género
    <select bind:value={selectedGender} required class="select select-primary w-full max-w-xs bg-slate-200 text-primary-content">
        {#each genders as gender}
            <option value={gender.value}>{gender.label}</option>
        {/each}
    </select>
    Peso (en kg)
    <input bind:value={weight} required min=40 max=160 type="number" class="input input-bordered input-primary w-full max-w-xs bg-slate-200 text-primary-content"/>
    Altura (en cm)
    <input bind:value={height} required min=130 max=230 type="number" class="input input-bordered input-primary w-full max-w-xs bg-slate-200 text-primary-content"/>
    Nivel de Actividad
    <select bind:value={selectedActivityLevel} required class="select select-primary w-full max-w-xs bg-slate-200 text-primary-content">
        {#each activityLevels as activityLevel}
            <option value={activityLevel.value}>{activityLevel.label}</option>
        {/each}
    </select>
    ¿Cuál es tu objetivo?
    <select bind:value={selectedFitnessPlan} required class="select select-primary w-full max-w-xs bg-slate-200 text-primary-content">
        {#each fitnessPlans as fitnessPlan}
            <option value={fitnessPlan.value}>{fitnessPlan.label}</option>
        {/each}
    </select>
    <br />
    <button class="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl text-lg" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pr-1 w-5 h-5">
            <path fill-rule="evenodd" d="M10 1c-1.716 0-3.408.106-5.07.31C3.806 1.45 3 2.414 3 3.517V16.75A2.25 2.25 0 005.25 19h9.5A2.25 2.25 0 0017 16.75V3.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 1zM5.99 8.75A.75.75 0 016.74 8h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm-.75 2.916a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm1.417-5.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm-.75 2.916a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm1.42-5.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm-.75 2.916a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zM12.5 8.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm.75 1.417a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zm0 2.166a.75.75 0 01.75.75v2.167a.75.75 0 11-1.5 0v-2.167a.75.75 0 01.75-.75zM6.75 4a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75h6.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75h-6.5z" clip-rule="evenodd" />
        </svg>
        Calcular Calorías
    </button>
</form>