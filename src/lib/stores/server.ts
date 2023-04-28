import { PUBLIC_SERVICE_API, PUBLIC_FAKE_API } from '$env/static/public';
import { get, writable } from 'svelte/store';
import { tpi } from 'turing-pi-js';
import type {TuringPiInterface, USB, SDCard, Other, PowerQuery, USBQuery, UARTQuery, UARTGetQuery} from 'turing-pi-js';

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
	const client = tpi(DEFAULT_SERVER);
	const _server = writable<Server>({ url: DEFAULT_SERVER, client });
	return {
		..._server,
		isFaked: FAKER,
		async init() {
			if (!initialized) {
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
		},
		nodeMap: {
			node1: 0,
			node2: 1,
			node3: 2,
			node4: 3
		},
		setPower(query: PowerQuery){
			FAKER
				? console.debug('Node Power', query)
				: client
					.set('power', query, { mode: 'no-cors' })
					.catch(e=>{
						if(e.name === "SyntaxError"){
							console.error('TODO: Fix BMC API HEADERS - BMC API returns text/plain, Recovering from error')
						} else {
							throw e;
						}
					})
		},
		setUSB(query: USBQuery){
			function _setServerUSB(_query: USBQuery){
				_server.set({
					...get(_server),
					usb: _query
				});
			}
			FAKER
				? (()=>{
					console.debug('USB Device', {mode: query.mode, node: query.node})
					_setServerUSB(query)
				})()
				: client
					.set(
						'usb',
						query,
						{ mode: 'no-cors' }
					)
					.then(() => {
						_setServerUSB(query)
					}).catch(e=>{
					if(e.name === "SyntaxError"){
						console.error('TODO: Fix BMC API HEADERS - BMC API returns text/plain, Recovering from error')
					} else {
						throw e;
					}
					});
		},
		async getUART(query: UARTGetQuery){
			return FAKER ? {response: [{uart: ""}]} :
				client.get('uart', query)
		},
		async setUART(query: UARTQuery){
			return FAKER ? console.debug('UART', query) : client.set('uart', query, {mode: 'no-cors'})
		}
	};
}

export const server = createServerStore();

const localWatch = localStorage.watch;
export const watch = writable(typeof localWatch === 'boolean' ? localWatch : false);
watch.subscribe((value) => (localStorage.watch = value));
