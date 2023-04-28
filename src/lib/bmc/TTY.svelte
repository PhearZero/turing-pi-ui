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

	// FAKING
	let firstUART = true;
	let firstFakeMessage = `root@fakehost:~$`;

	const handlePowerChange = (e) => {
		server.setPower({ [e.target.name]: e.target.checked ? 1 : 0 });
		if($nodes[nodeName].power){
			xterm.clear();
			xterm.write('\x1b[2K\r');
			if(!firstUART){
				xterm.write(firstFakeMessage)
			}
		} else {
			xterm.clear();
			xterm.write('\x1b[2K\r');
			xterm.write('Powered Off')
		}
		loop();
	};
	const handleClose = () => {
		open = false;
		// xterm.clear();
		console.log(interval);
		if (typeof interval !== 'undefined') {
			clearInterval(interval);
		}
	};
	const handleIntervalChange = () => {
		loop();
	};
	const loop = () => {
		console.debug('Running loop', { node: $nodes[nodeName] });
		if (typeof interval !== 'undefined') {
			console.debug('Clearing interval', { interval });
			clearInterval(interval);
		}
		if ($nodes[nodeName].power) {
			interval = setInterval(() => {
				console.debug('Running interval', { interval });
					server.getUART({ node: server.nodeMap[nodeName] }).then((r) => {
							if(server.isFaked && firstUART){
								xterm.write(firstFakeMessage)
							} else {
								xterm.write(r.response[0].uart);

							}
						xterm.focus()
						firstUART = false;
					});
			}, poll);
		} else {
			xterm.clear();
			xterm.write('\x1b[2K\r');
			xterm.write('Powered Off')
		}
	};
	let cmd = '';
	onMount(() => {
		xterm = new Terminal({
			convertEol: true,
			cursorBlink: true
		});
		window.hello = xterm
		xterm.open(term);

		loop();

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
				if(server.isFaked){
					xterm.write(`${key}\n`)
					xterm.write(server.firstFakeMessage)
					xterm.focus()
				} else {
					for (let i = 0; i < cmd.length; i++) {
						xterm.write('\b \b');
					}
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
		<div class="row">
			<div class="col-lg-10 col-9">
				<hgroup>
					<h1>Connected</h1>
					<h2>{`${nodeName}@${$server.ip}`}</h2>
				</hgroup>
			</div>

			<div class="col-lg-2 col-3">
				<button aria-label="Close" class="close error" on:click={handleClose}>X</button>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
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
		</div>
	</header>
	<div bind:this={term} class="container-fluid" />
	<footer>
		<label for="range">Interval: {poll / 1000} seconds</label>
		<input
			on:change={handleIntervalChange}
			type="range"
			min="1000"
			max="20000"
			id="range"
			name="range"
			bind:value={poll}
		/>
	</footer>
</dialog>

<style>
	footer {
		padding: var(--spacing);
		width: 100%;
		background-color: var(--background-color);
		border-radius: 0 0 20px 20px;
	}
	input {
		margin-bottom: 0;
	}
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
