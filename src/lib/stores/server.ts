import {writable, get} from "svelte/store";
import {tpi} from 'turing-pi-js'

// const DEFAULT_SERVER = new URL(`${window.location.origin}/api/bmc`)
const DEFAULT_SERVER = new URL(`http://localhost:8080/api/bmc`)
interface USB {
    mode: 0|1
    node: number
}
interface Server {
    url: URL
    version?: string
    buildtime?: string
    ip?: string
    mac?: string
    usb?: USB
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
                _server.set({
                    usb: usb.response[0] as USB,
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
