<script>
    export let text = 'Cargando'
</script>

<div class="max-w-fit flex flex-col justify-center items-center">
    <div
    class="inline-block h-32 w-32 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
    <br />
    <p class="text-3xl">{text}...</p>
</div>