<script>
    import {servers} from '$lib/stores/refactor/servers'
    import TTY from "$lib/bmc/modal/TTY.svelte";
    let modalServer = 'ws://192.168.1.37:8000/s/local/ws'
    let ttyServer = $servers[0]
    let ttyOpen = false
    const handleServerTTY = (_server) =>{
        ttyServer = _server
        if(!ttyOpen){
            ttyOpen = true
        }
    }
</script>
{#if typeof ttyServer !== 'undefined'}
    <TTY bind:server={ttyServer} bind:open={ttyOpen}/>
{/if}
<article>

    <header>
        <details>
            <summary>
                <hgroup>
                    <h5>Servers</h5>
                    <h6>Connected Basbeboards</h6>
                </hgroup>
            </summary>
            <p class="primary">
            <figure>

                <table>
                    <thead>
                    <tr>
                        <th scope="col">Build</th>
                        <th scope="col">IP</th>
                        <th scope="col">MAC</th>
                        <th scope="col">USB</th>
                        <th scope="col">TTY</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $servers as server, i}
                        <tr>
                            <td>{server.version}-{server.buildtime}</td>
                            <td>{server.ip}</td>
                            <td>{server.mac}</td>
                            <td><select></select></td>
                            <td><button on:click={()=>handleServerTTY(server)}>🖥️</button></td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </figure>
        </details>


    </header>


</article>
<style>
    .terminal {
        width: 100%;
    }
</style>
