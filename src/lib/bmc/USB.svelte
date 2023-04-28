<script>
	import { server } from '$lib/stores/server';
	const onChange = async (e) => {
		server.setUSB({ mode: parseInt(e.target.value), node: $server.usb.node })
	};
</script>

<article>
	<header>
		<hgroup>
			<h4>USB Mode</h4>
			<h5>Set USB to host or device</h5>
		</hgroup>
	</header>
	<select on:change={onChange} id="usb" required bind:value={$server.usb.mode}>
		<option value={0}>Host</option>
		<option value={1}>Device</option>
	</select>
	<footer ></footer>
</article>
