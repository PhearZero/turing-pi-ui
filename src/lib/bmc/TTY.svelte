<script>
	import 'xterm/css/xterm.css';
	import { server } from '$lib/stores/server';
	import { onMount } from 'svelte';
	import { Terminal } from 'xterm';
	import { nodes } from '$lib/stores/nodes';

	export let open = false;
	export let nodeName;

	let term;
	let xterm;
	let interval;
	let poll = 2000;
	const handlePowerChange = (e) => {
		server.setPower({ [e.target.name]: e.target.checked ? 1 : 0 })
	};
	const handleClose = () => {
		open = false;
		xterm.clear();
		console.log(interval);
		if (typeof interval !== 'undefined') {
			clearInterval(interval);
		}
	};

	let cmd = '';
	onMount(() => {
		interval = setInterval(() => {
			server.getUART({ node: server.nodeMap[nodeName] }).then((r) => {
				xterm.write(r.response[0].uart);
			});
		}, poll);

		xterm = new Terminal({
			convertEol: true,
			cursorBlink: true
		});
		xterm.open(term);
		xterm.focus();
		xterm.onKey(function ({ key }) {
			const code = key.charCodeAt(0);
			// On Backspace
			if (code === 127) {
				xterm.write('\b \b');
				cmd = cmd.substring(0, cmd.length - 1);
			}
			// On enter
			else if (key === '\r') {
				server.setUART({ node: server.nodeMap[nodeName], cmd: cmd });
				for (let i = 0; i < cmd.length; i++) {
					xterm.write('\b \b');
				}
				cmd = '';
			}
			// Normal Keys
			else {
				xterm.write(key);
				cmd += key;
			}
		});
	});
</script>

<dialog {open}>
	<header>
		<!--            <div class="col-7">-->
		<!--                <form>-->
		<!--                <label for="command">-->
		<!--                    Command:-->
		<!--                    <input type="text" id="command" name="command" value={cmd}/>-->
		<!--                </label>-->
		<!--                </form>-->
		<!--            </div>-->

		<div class="row">
			<div class="col-lg-10 col-9">
				<hgroup>
					<h1>Connected</h1>
					<h2>{`${nodeName}@${$server.ip}`}</h2>
				</hgroup>
				<label>
					Power
					<input
						bind:checked={$nodes[nodeName].power}
						name={nodeName}
						on:change={handlePowerChange}
						role="switch"
						type="checkbox"
					/>
				</label>
			</div>

			<div class="col-lg-2 col-3">
				<button aria-label="Close" class="close error" on:click={handleClose}>X</button>
			</div>
		</div>
	</header>

	<div bind:this={term} class="container-fluid" ></div>
</dialog>

<style>
	.container-fluid {
		padding: 0;
	}

	dialog {
		flex-direction: column;
	}

	header {
		border-radius: 20px 20px 0 0;
		width: 100%;
		padding: var(--spacing);
		background-color: var(--background-color);
	}
</style>
