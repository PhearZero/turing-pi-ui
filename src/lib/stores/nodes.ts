import { PUBLIC_FAKE_API } from '$env/static/public';
import type { Server } from '$lib/stores/server';
import { server, watch } from '$lib/stores/server';
import { get, writable } from 'svelte/store';
import type { NodeInfo, NodePower, USB } from 'turing-pi-js';

const FAKER = PUBLIC_FAKE_API === 'true';

let client = get(server).client;
type NodeIndex = 0 | 1 | 2 | 3;
type OnOff = 0 | 1;
interface Node {
	power: boolean;
	usb: boolean;
	name: string;
	info: string;
}

interface Nodes {
	[k: string]: Node;
}

export const interval = writable<number>(10000);

interface KeyUSB extends USB {
	[k: string]: NodeIndex | OnOff;
}

interface KeyNodeInfo extends NodeInfo {
	[k: string]: string;
}

interface KeyNodePower extends NodePower {
	[k: string]: OnOff;
}
const createNodesStore = () => {
	const nodes = writable<Nodes>({
		node1: {
			power: false,
			usb: false,
			name: 'node1',
			info: 'demo'
		},
		node2: {
			power: false,
			usb: false,
			name: 'node2',
			info: 'demo'
		},
		node3: {
			power: false,
			usb: false,
			name: 'node3',
			info: 'demo'
		},
		node4: {
			power: false,
			usb: false,
			name: 'node4',
			info: 'demo'
		}
	});
	const initialStore = get(server);

	return {
		...nodes,
		async update(_server: Server | undefined) {
			const _target = typeof _server === 'undefined' ? get<Server>(server) : _server;
			const isNotUSBChange = initialStore?.usb?.node === _target?.usb?.node && initialStore?.usb?.mode === _target?.usb?.mode

			// Merge server settings
			if(typeof _target.usb !== 'undefined'){
				this.merge(_target.usb as KeyUSB, 'usb');
			}

			if (typeof _target.client !== 'undefined' && isNotUSBChange) {
				console.log(`Server update, fetching nodes ${new Date()}`);
				const info = FAKER
					? {
							response: [
								{ node1: 'Demo Node', node2: 'Demo Node', node3: 'Demo Node', node4: 'Demo Node' }
							]
					  }
					: await client.get('nodeinfo');

				this.merge(info.response[0] as KeyNodeInfo, 'info');

				const power = FAKER
					? { response: [{ node1: 0, node2: 2, node3: 0, node4: 0 }] }
					: await client.get('power');
				this.merge(power.response[0] as KeyNodePower, 'power');
			}
		},
		merge(d: KeyUSB | KeyNodeInfo | KeyNodePower, type: string) {
			nodes.update((value) => {
				if (type === 'info') {
					Object.keys(d).forEach((n) => {
						value[n] = {
							...value[n],
							info: d[n] as string
						};
					});
				}
				if (type === 'power') {
					Object.keys(d).forEach((n) => {
						value[n] = {
							...value[n],
							power: d[n] !== 0
						};
					});
				}
				if (type === 'usb') {
					const index = typeof d.node === 'string' ? parseInt(d.node) + 1 : d.node;
					Object.keys(value).forEach((n) => {
						value[n] = {
							...value[n],
							usb: n.match(`node${index + 1}`) !== null
						};
					});
				}
				return value;
			});
		},

	};
};

export const nodes = createNodesStore();

let intervalIndex: unknown;

const handleInterval = () => {
	if (typeof intervalIndex !== 'undefined') {
		clearInterval(intervalIndex as number);
		intervalIndex = undefined;
	}

	if (get(watch)) {
		intervalIndex = setInterval(nodes.update, get(interval));
	}
};

server.subscribe((value) => {
	client = value.client;
	nodes.update(value).then(() => {
		handleInterval();
	});
});
watch.subscribe(() => {
	handleInterval();
});
