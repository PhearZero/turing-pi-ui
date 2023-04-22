import {server, watch} from './server'
import {writable, get} from "svelte/store";

let client = get(server).client

interface Node {
    power: boolean
    usb: boolean
    name: string
    info: string
}

interface Nodes {
    [k: string]: Node
}

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

const mergeData = (d: any, type: string) => {
    nodes.update((value) => {
        if (type === 'info') {
            Object.keys(d).forEach(n => {
                value[n] = {
                    ...value[n],
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

const update = () => {
    console.log(`Running update ${new Date()}`)
    client.get('nodeinfo')
        .then(d => {
            mergeData(d.response[0], 'info')
        })
    client.get('power')
        .then(d => {
            mergeData(d.response[0], 'power')
        })
    client.get('usb')
        .then(d => {
            mergeData(d.response[0], "usb")
        })

}


let interval: unknown

// Anytime the store changes, update the local storage value.
server.subscribe((value) => {
    client = value.client
    update()
    if (typeof interval !== 'undefined') {
        clearInterval(interval as number)
        interval = undefined
    }

    if (get(watch)) {
        interval = setInterval(update, 1000)
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

