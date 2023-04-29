<script>
	import { server } from '$lib/stores/server';
	import { nodes } from '$lib/stores/nodes';
	import TTY from '$lib/bmc/UART.svelte';

	let selectedNode = 'node1';

	let ttyOpen = false;
	const handleUsbChange = async (e) => {
		let query = $server.usb
		if(e.target.name === 'mode'){
			query.mode = e.target.checked ? 1 : 0
		} else {
			query.node = server.nodeMap[e.target.value]
		}
		server.setUSB(query);
	};
	const handlePowerChange = (e) => {
		server.setPower({ [e.target.name]: e.target.checked ? 1 : 0 });
	};
</script>

<article>
	<header>
		<div class="row">
			<div class="col-lg-10 col-9">
				<hgroup>
					<h1>Nodes</h1>
					<h2>Configure your compute nodes</h2>
				</hgroup>
			</div>
			<div class='col-4 otg-toggle'>
				<label for='usb_otg' id='usb_otg_label'>
						<h6>OTG Host/Device</h6>

				<input
					on:change={handleUsbChange}
					id='usb_otg'
					type="checkbox"
					role="switch"
					name='mode'
					checked={$server.usb.mode === 1}
				/>
				</label>
			</div>
		</div>
	</header>
	<figure>
		<table>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Info</th>
					<th scope="col">USB OTG</th>
					<th scope="col">Power</th>
					<th scope="col">UART</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys($nodes) as nodeName, i}
					<tr>
						<td>{$nodes[nodeName].name}</td>
						<td>{$nodes[nodeName].info}</td>
						<td>
							{#if typeof $server.usb !== 'undefined'}
								<input
									on:change={handleUsbChange}
									type="radio"
									name="usb"
									bind:value={nodeName}
									checked={$server.usb.node === i}
								/>
							{:else}
								<input type="radio" name="usb" />
							{/if}
						</td>
						<td>
							<input
								on:change={handlePowerChange}
								type="checkbox"
								role="switch"
								name={nodeName}
								bind:checked={$nodes[nodeName].power}
							/>
						</td>
						<td>
							<button
								on:click={() => {
									selectedNode = nodeName;
									ttyOpen = true;
								}}
								>🖥️
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</figure>
	<footer>

	</footer>
</article>
{#if ttyOpen}
	<TTY bind:open={ttyOpen} bind:nodeName={selectedNode} />
{/if}
<style>
		.otg-toggle{
				width: auto;
		}
		h6 {
				margin-bottom: 0;
		}
#usb_otg_label {
		display: flex;
}
</style>
