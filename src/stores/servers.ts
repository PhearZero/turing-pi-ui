import { writable } from 'svelte/store'

// Get the value out of storage on load.
const localServers = localStorage.servers
console.log(localServers)
export const servers = writable(localServers && localServers.split(',').map((s: string)=>new URL(s)) || [])
// Anytime the store changes, update the local storage value.
servers.subscribe((value) => localStorage.servers = value.map((url: URL)=>url.toString()))

const localServer = localStorage.server
export const server  = writable(localServer && new URL(localServer) || new URL("http://localhost:8080/api/bmc"))
server.subscribe((value) => localStorage.server = value.toString())
