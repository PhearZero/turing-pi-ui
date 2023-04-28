import { PUBLIC_SERVICE_API, PUBLIC_FAKE_API } from '$env/static/public';
import { writable } from 'svelte/store';
import { tpi } from 'turing-pi-js';
import type {TuringPiInterface, USB, SDCard, Other} from 'turing-pi-js';

const FAKER = PUBLIC_FAKE_API === 'true'
const DEFAULT_SERVER =
	PUBLIC_SERVICE_API !== ''
		? new URL(`${PUBLIC_SERVICE_API}/api/bmc`)
		: new URL(`${window.location.origin}/api/bmc`);

export interface Server {
	url: URL;
	version?: string;
	buildtime?: string;
	ip?: string;
	mac?: string;
	usb?: USB;
	sdcard?: SDCard;
	client: TuringPiInterface;
}

let initialized = false;

function createServerStore() {
	console.log(`Creating server store ${new Date()}`);
	const client = tpi(DEFAULT_SERVER);
	const _server = writable<Server>({ url: DEFAULT_SERVER, client });
	return {
		..._server,
		async init() {
			if (!initialized) {
				console.log(`Running server init ${new Date()}`);

				const other = FAKER ?
						// Fake data for build previews
						{response:[{ip:window.location.hostname, version: "X.X.X", buildtime: new Date(), mac: "FF:FF:FF:FF:FF"}]} :
						await client.get('other');

					const usb = FAKER ?
						// Fake data for build previews
						{response:[{node: 0, mode: 0}]} :
						await client.get('usb');

					const sdcard = FAKER ?
						// Fake data for build previews
						{response:[{total: 10, free: 2, use: 8}]} :
						await client.get('sdcard');

				_server.set({
					usb: usb.response[0] as USB,
					sdcard: sdcard.response[0] as SDCard,
					url: DEFAULT_SERVER,
					client,
					...(other.response[0] as Other)
				});
				initialized = true;
			}
		}
	};
}

export const server = createServerStore();

const localWatch = localStorage.watch;
export const watch = writable(typeof localWatch === 'boolean' ? localWatch : false);
watch.subscribe((value) => (localStorage.watch = value));
