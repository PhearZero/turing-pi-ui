<script>
	import { onMount } from 'svelte';
	import { server } from '$lib/stores/server';
	import { themeSwitcher } from '$lib/theme-switcher';

	onMount(() => {
		themeSwitcher.init();
	});
</script>

<header>
	<nav class="container-fluid">
		<ul>
			<li>
				<a class="contrast" href="/"><strong>Turing Pi 2</strong></a> @
				{$server.url.host}
			</li>
			<li>
				{#await server.init()}
					vX.X.X
				{:then value}
					v{$server.version}
				{/await}
			</li>
		</ul>
		<ul>
			<li>
				<details dir="rtl" role="list">
					<summary aria-haspopup="listbox" class="secondary" role="link">Theme</summary>
					<ul role="listbox">
						<li><a data-theme-switcher="auto">Auto</a></li>
						<li><a data-theme-switcher="light">Light</a></li>
						<li><a data-theme-switcher="dark">Dark</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</nav>
</header>
