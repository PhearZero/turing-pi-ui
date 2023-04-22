import {writable, derived} from "svelte/store";
import type {Writable} from "svelte/store"
import {tpi} from "turing-pi-js";

// Default server to show
const DEFAULT_SERVER = 'http://localhost:8080/api/bmc'

interface Server {
    url: URL
    version?: string
    buildtime?: Date
    ip?: string
    mac?: string
    client: any
}

const createURLList = () => {
    const localServers = localStorage.ids
    const initialValue = localServers ?
        JSON.parse(localServers) :
        [
            DEFAULT_SERVER
        ]

    return writable<URL[]>(
        initialValue.map((url: string) => new URL(url))
    )
}

export const urls = createURLList()
urls.subscribe((urls) => {
    localStorage.ids = JSON.stringify(urls)
})

const fetchServers = ($_urls: URL[]): Promise<Server[]> =>  {
    return Promise.all($_urls.map((url: URL)=>{
        const s = {
            url,
            client: tpi(url)
        }
        return s.client.get('other').then((r)=>{
            return {...s, ...r.response[0]} as Server
        })
    }))
}


const createServers = (
    _urls: Writable<URL[]>,
    callback: ($_urls: URL[])=>Promise<Server[]>,
    initial_value: Server[] =[]
) => {
    // let guard: unknown
    return derived(_urls, ($urls, set) => {
        // const inner = guard = {}

        set(initial_value)
        Promise.resolve(callback($urls)).then(value => {
            // if (guard === inner) {
                set(value)
            // }
        })
    }, initial_value)
}


export const servers = createServers(urls, fetchServers, [])
