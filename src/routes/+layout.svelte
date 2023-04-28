<script>
	import './styles.css';
	import './pico-bootstrap-grid.css';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import {server} from '$lib/stores/server'
</script>
{#await server.init()}
	<div aria-busy='true' class='container-fluid loading'></div>
{:then s}
	<Navigation />
	<main class="container-fluid">
		<slot />
	</main>
	<Footer />
{:catch error}
<div class='container-fluid error-message'>
	<hgroup>
		<h1>Error</h1>
		<h2>{error.message}</h2>
	</hgroup>
</div>
{/await}


<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100vh - 7rem);
		padding: 0;
	}
	.loading, .error-message {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
	}
	.loading {
      font-size: 10rem;
	}
</style>
