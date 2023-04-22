<script>
    import {urls, servers} from "$lib/stores/refactor/servers";
    import {tpi} from "turing-pi-js";
    // import {servers, server} from "$lib/stores/servers";

    export let open = true;
    let error;

    let inputUrl

    let _servers

    $: _servers = $servers
    console.log(_servers, $servers)
    const handleClose = () => {
        open = false
    }
    const deleteServer = (url) => {
        console.log(url)
        urls.set($urls.filter((x)=>{
            console.log({url, x})
            return x!=url
        }))
    }
    const addServer = (e) => {
        e.preventDefault()
        if ($urls.map(url=>url.toString()).includes(inputUrl)) {
            error = true
        } else {
            try {
                const url = new URL(inputUrl)
                const client = tpi(url)
                client.get('other').then(()=>{
                    urls.set([
                        url,
                        ...$urls,
                    ])
                    error = false
                }).catch(e=>{
                    error = true
                })

            } catch(e){
                error = true
            }


        }
    }
</script>
<dialog open={open}>
    <article>
        <header>
            <a href="#close" aria-label="Close" class="close" on:click={handleClose}></a>
            Baseboard Management Controller
        </header>

        <label for="url">
            Server URL
            <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="http://localhost/api/bmc"
                    aria-label="Server URL"
                    bind:value={inputUrl}
                    aria-invalid={error}
                    required
            />
        </label>
        <details>
            <summary>Available Servers</summary>
            <figure>
            <table>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Protocol</th>
                    <th scope="col">Host</th>
                    <th scope="col">Port</th>
                    <th scope="col">Path</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {#each $urls as s, i}
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{s.protocol}</td>
                        <td>{s.hostname}</td>
                        <td>{s.port | s.protocol === 'http:' ? 80 : 443}</td>
                        <td>{s.pathname}</td>
                        <td>
                            <button on:click|preventDefault={(e)=>deleteServer(s)} class="compact">{window.location.origin === s.origin ? '✔️' : '❌'}</button>
<!--                            <button>{window.location.origin === s.origin ? '✔️' : '❌'}</button>-->
<!--                            <button>{window.location.origin === s.origin ? '✔️' : '❌'}</button>-->
                        </td>
                    </tr>
                {/each}
                </tbody>
                <!--                <tfoot>-->
                <!--                <tr>-->
                <!--                    <th scope="col">#</th>-->
                <!--                    <td scope="col">Total</td>-->
                <!--                    <td scope="col">Total</td>-->
                <!--                    <td scope="col">Total</td>-->
                <!--                    <td scope="col">Total</td>-->
                <!--                    <td scope="col">Total</td>-->
                <!--                </tr>-->
                <!--                </tfoot>-->
            </table>
            </figure>
        </details>

        <footer>
            <button type="submit" on:click={addServer}>Add</button>
        </footer>
    </article>
</dialog>
