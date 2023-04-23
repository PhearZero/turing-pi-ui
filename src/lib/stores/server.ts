import { PUBLIC_SERVICE_API } from '$env/static/public'
import {writable, get} from "svelte/store";
import {tpi} from 'turing-pi-js'

const DEFAULT_SERVER = PUBLIC_SERVICE_API !== '' ?
    new URL(`${PUBLIC_SERVICE_API}/api/bmc`) :
    new URL(`${window.location.origin}/api/bmc`)

interface USB {
    mode: 0|1
    node: number
}
interface SDCard {
    total: number| string
    free: number | string
    use: number | string
}
interface Server {
    url: URL
    version?: string
    buildtime?: string
    ip?: string
    mac?: string
    usb?: USB
    sdcard? : SDCard
    client: any
}

interface Other {
    version: string;
    buildtime: string;
    ip: string;
    mac: string;
}
let initalized = false;
function createServerStore(){
    const client = tpi(DEFAULT_SERVER)
    // console.log(client, DEFAULT_SERVER)
    const _server = writable<Server>({ url: DEFAULT_SERVER, client })
    return {
        ..._server,
        async init(){
            if(typeof get(_server).ip === 'undefined' && !initalized){
                initalized = true
                const {response} = await client.get('other')
                const usb = await client.get('usb')
                const sdcard = await client.get('sdcard')
                _server.set({
                    usb: usb.response[0] as USB,
                    sdcard: sdcard.response[0] as SDCard,
                    url: DEFAULT_SERVER,
                    client,
                    ...response[0] as Other
                })
            }

        }
    }
}

export const server = createServerStore()


const localWatch = localStorage.watch
export const watch = writable(typeof localWatch === 'boolean' ? localWatch : false)
watch.subscribe((value)=>localStorage.watch = value)
