<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import image from '$lib/images/logo_palta.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col lg:flex-row items-center justify-center pt-5 w-full">
  <div class="lg:w-1/2 px-4 lg:px-0">
    <div class="grid max-w-xl">
      <h4 class="text-2xl font-bold text-green-300 text-justify">CalorieFit es una plataforma en línea que te ayuda a alcanzar tus objetivos de peso y mantener un estilo de vida saludable.</h4>
      <br>
      <h4 class="text-2xl font-bold text-green-500 text-justify">Obtén una estimación precisa de tus necesidades calóricas diarias y descubre recetas deliciosas y nutritivas que se adapten a tus preferencias y requerimientos.</h4>
      <br>
      <h4 class="text-2xl font-bold text-lime-500 text-justify">¡Comienza tu viaje hacia una alimentación equilibrada y disfruta de una vida saludable con CalorieFit!</h4>
      <br>
    </div>
    <div class="flex justify-center">
      <a href="/form">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl text-lg">
          Calcula tu consumo diario de calorías
        </button>
      </a>
    </div>
  </div>
	<br>
  <img class="rounded-2xl w-full lg:w-1/2 max-w-xl" src={image} alt="Calorie Fit"/>
</div>