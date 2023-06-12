<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo_palta_sin_texto.png';
	import github from '$lib/images/github.svg';
</script>

<div id="navbar" class="navbar bg-primary fixed top-0 left-0 right-0 z-20">
  <div class="flex-1 flex items-center">
    <a href="/">
      <img class="max-h-24" src={logo} alt="CalorieFit" />
    </a>
    <a href="/" class="logoName btn btn-ghost normal-case text-4xl text-white font-medium hover:no-underline">CalorieFit</a>
  </div>
  <div class="flex-none">
    <input type="checkbox" id="menu-toggle" class="hidden">
    <label for="menu-toggle" class="menu-toggle-label">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <ul class="menu menu-horizontal px-1 hidden md:flex">
      <li><a href="/" class="logoName text-2xl text-white font-light hover:no-underline">Home</a></li>
      <li><a href="/form" class="logoName text-2xl text-white font-light hover:no-underline">Form</a></li>
    </ul>
  </div>
</div>

<style>
  .logoName {
    font-family: 'Alfa Slab One';
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .flex-1 {
      flex-basis: 100%;
      text-align: center;
    }
    .menu-toggle-label {
      display: inline-block;
      cursor: pointer;
      padding: 10px;
      margin-right: 10px;
    }
    .menu-toggle-label span {
      display: block;
      width: 25px;
      height: 3px;
      background-color: #fff;
      margin-bottom: 5px;
    }
    .menu {
      display: none;
    }
    #menu-toggle:checked ~ .menu {
      display: block;
    }
  }
</style>
