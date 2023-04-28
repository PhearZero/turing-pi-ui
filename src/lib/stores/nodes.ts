import type { Server } from '$lib/stores/server';
import { server, watch } from '$lib/stores/server';
import { get, writable } from 'svelte/store';
import type { NodeInfo, NodePower, USB } from 'turing-pi-js';

let client = get(server).client;
type NodeIndex = 0 | 1 | 2 | 3
type OnOff = 0 | 1
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
export const nodes = writable<Nodes>({
	node1: {
		power: false,
		usb: false,
		name: 'node1',
		info: 'unknown'
	},
	node2: {
		power: false,
		usb: false,
		name: 'node2',
		info: 'unknown'
	},
	node3: {
		power: false,
		usb: false,
		name: 'node3',
		info: 'unknown'
	},
	node4: {
		power: false,
		usb: false,
		name: 'node4',
		info: 'unknown'
	}
});

interface KeyUSB extends USB {
	[k: string]: NodeIndex | OnOff;
}

interface KeyNodeInfo extends NodeInfo {
	[k: string]: string;
}

interface KeyNodePower extends NodePower {
	[k: string]: OnOff;
}

const mergeData = (d: KeyUSB | KeyNodeInfo | KeyNodePower, type: string) => {
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
			const index = typeof d.node === 'string' ? parseInt(d.node) + 1 : d.node
			Object.keys(value).forEach((n) => {
				value[n] = {
					...value[n],
					usb: n.match(`node${index + 1}`) !== null
				};
			});
		}
		return value;
	});
};

const update = (_server: Server) => {
	if (typeof _server.ip !== 'undefined' && typeof _server.usb !== 'undefined') {
		console.log(`Running nodes update ${new Date()}`);

		client.get('nodeinfo').then((d) => {
			mergeData(d.response[0] as KeyNodeInfo, 'info');
		});
		client.get('power').then((d) => {
			mergeData(d.response[0] as KeyNodePower, 'power');
		});

		mergeData(_server.usb as KeyUSB, 'usb');
	}
};

let intervalIndex: unknown;


const handleInterval = () => {
	if (typeof intervalIndex !== 'undefined') {
		clearInterval(intervalIndex as number);
		intervalIndex = undefined;
	}

	if (get(watch)) {
		intervalIndex = setInterval(update, get(interval));
	}
}

server.subscribe((value) => {
	client = value.client;
	update(value);

	handleInterval()
});
watch.subscribe(() => {
	handleInterval()
});
