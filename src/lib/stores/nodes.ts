import {server, watch} from '$lib/stores/servers'
import {writable, get} from "svelte/store";
import {tpi} from 'turing-pi-js'
let client = tpi(get(server).url)

interface Node {
    power: boolean
    usb: boolean
    name: string
    info: string
}

interface Nodes {
    [k: string]: Node
}

// TODO: inject server state
export const nodes = writable<Nodes>({
    node1: {
        power: false,
        usb: false,
        name: "node1",
        info: "unknown",
    },
    node2: {
        power: false,
        usb: false,
        name: "node2",
        info: "unknown",
    },
    node3: {
        power: false,
        usb: false,
        name: "node3",
        info: "unknown",
    },
    node4: {
        power: false,
        usb: false,
        name: "node4",
        info: "unknown",
    }
})

const mergeData = (d: any, type: string, server) => {
    nodes.update((value) => {
        if (type === 'nodeinfo') {
            Object.keys(d).forEach(n => {
                value[n] = {
                    ...value[n],
                    name: `${value[n].name}@${server.ip}`,
                    info: d[n],
                }
            })
        }
        if (type === 'power') {
            Object.keys(d).forEach(n => {
                value[n] = {
                    ...value[n],
                    power: d[n] !== 0,
                }
            })
        }
        if (type === 'usb') {
            Object.keys(value).forEach(n => {
                value[n] = {
                    ...value[n],
                    usb: n.match(d.node + 1) !== null,
                }
            })
        }

        return value
    })

}

const update = (server) => {
    const keys = ['nodeinfo', 'power', 'usb']

    keys.map((k)=>{
        client.get(k as 'nodeinfo'| 'power' | 'usb')
            .then(d=>{
                mergeData(d.response[0], k, server)
            })
    })
    console.log(`Running update ${new Date()}`)
}


let interval: unknown

// Anytime the store changes, update the local storage value.
server.subscribe((value) => {
    console.log(value)
    client = value.client
    if(typeof value.ip !== 'undefined'){
        update(value)
    }

    if (typeof interval !== 'undefined') {
        clearInterval(interval as number)
        interval = undefined
    }

    if (get(watch)) {
        interval = setInterval(update, 10000)
    }
})
watch.subscribe((value) => {
    if (typeof interval !== 'undefined') {
        clearInterval(interval as number)
        interval = undefined
    }
    if (value) {
        interval = setInterval(update, 10000)
    }
})

