<script>
	import Nodes from '$lib/bmc/Nodes.svelte';
	import Server from '$lib/bmc/Baseboard.svelte';
	import USB from '$lib/bmc/USB.svelte';
</script>

<article>
	<header>
		<hgroup>
			<h1>Dashboard</h1>
			<h2>Settings from the Baseboard Management Controller</h2>
		</hgroup>
	</header>
	<Nodes />
<!--	<USB />-->
	<Server />
</article>
