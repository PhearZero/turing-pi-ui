import {get, writable, derived} from 'svelte/store'
import {tpi} from 'turing-pi-js'

interface Server {
    url: URL
    version?: string
    buildtime?: Date
    ip?: string
    mac?: string
    timestamp: number
    client: any
}

const DEFAULT_SERVER = 'http://localhost:8080/api/bmc'

// const fetchOtherData = (idList){
//     const p = idList.map((s)=>{
//         if(typeof s.ip === 'undefined' || s.timestamp < Date.now() - 2419200000) {
//             return s.client.get('other').then((r)=>{
//                 return {...s, ...r.response[0]}
//             })
//         }
//         return s
//     })
//     Promise.all(p)
//         .then(async (responses)=>{
//             const index = responses.map((s:Server)=>{
//                 console.log(s)
//                 return s.url
//             })
//             console.log(index)
//             // await servers.update((prev) => {
//             //    return prev.map((s)=>{
//             //        return {
//             //            ...s,
//             //            ...responses[index.indexOf(s.url)]
//             //        }
//             //    })
//             // })
//         })
// }
const storez = (stores, callback, initial_value) => {
    let previous = 0

    return derived(stores, ($stores, set) => {
        const start = Date.now()
        Promise.resolve(callback($stores)).then(value => {
            if (start > previous) {
                previous = start
                set(value)
            }
        })
    }, initial_value)
}


const createIdList = () => {
    const localServers = localStorage.servers
    const initialValue = localServers ?
        JSON.parse(localServers) :
        [
            {
                url: new URL(DEFAULT_SERVER),
                timestamp: Date.now()
            }
        ]

    return writable<Server[]>(
        initialValue.map((s: Server)=>{
            return {
                ...s,
                client: tpi(s.url)
            }
        })
    )
}

export const servers = createIdList()
// Anytime the store changes, update the local storage value.
servers.subscribe((_servers) => {
    // const p = _servers.map((s)=>{
    //     if(typeof s.ip === 'undefined' || s.timestamp < Date.now() - 2419200000) {
    //         return s.client.get('other').then((r)=>{
    //             return {...s, ...r.response[0]}
    //         })
    //     }
    //     return s
    // })
    // Promise.all(p)
    //     .then(async (responses)=>{
    //         const index = responses.map((s:Server)=>{
    //             console.log(s)
    //             return s.url
    //         })
    //         console.log(index)
    //         // await servers.update((prev) => {
    //         //    return prev.map((s)=>{
    //         //        return {
    //         //            ...s,
    //         //            ...responses[index.indexOf(s.url)]
    //         //        }
    //         //    })
    //         // })
    //     })
    // const sanitized = [
    //     ..._servers
    // ].map(({client, ...rest})=>{
    //     return rest
    // })
    // localStorage.servers = JSON.stringify(sanitized)
})


export const server = writable( get(servers)[0])

export const watch = writable(typeof localStorage.watch === 'boolean' ? localStorage.watch : false)
watch.subscribe((value) => localStorage.watch = value)
