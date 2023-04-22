import {writable, get} from "svelte/store";
import {tpi} from 'turing-pi-js'

// const DEFAULT_SERVER = new URL(`${window.location.origin}/api/bmc`)
const DEFAULT_SERVER = new URL(`http://localhost:8080/api/bmc`)

interface Server {
    url: URL
    version?: string
    buildtime?: string
    ip?: string
    mac?: string
    client: any
}

interface Other {
    version: string;
    buildtime: string;
    ip: string;
    mac: string;
}
function createServerStore(){
    const client = tpi(DEFAULT_SERVER)
    // console.log(client, DEFAULT_SERVER)
    const _server = writable<Server>({ url: DEFAULT_SERVER, client })
    return {
        ..._server,
        async init(){
            if(typeof get(_server).ip === 'undefined'){
                const {response} = await client.get('other')
                _server.set({
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
