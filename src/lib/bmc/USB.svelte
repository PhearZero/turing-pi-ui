<script>
	import { server } from '$lib/stores/server';

	let loading;
	let error;
	const setUSB = (mode) => {
		server.set({
			...$server,
			usb: {
				...$server.usb,
				mode
			}
		});
	};
	const onChange = async (e) => {
		loading = true;
		$server.client
			.set('usb', { mode: e.target.value, node: $server.usb.node }, { mode: 'no-cors' })
			.then(() => {
				setUSB(parseInt(e.target.value));
				loading = false;
			})
			.catch((e) => {
				error = e;
				setUSB($server.usb.mode);
				loading = false;
			});
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
