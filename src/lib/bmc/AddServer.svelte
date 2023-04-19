<script>
    import {servers, server} from "../../stores/servers";

    export let open = true;
    let error = false;
    const handleClose = () => {
        open = false
    }
    const addServer = (e) => {
        e.preventDefault()
        if ($servers.includes($server)) {
            error = true
        } else {
            $servers = [
                ...$servers,
                $server
            ]
            open = false

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
                    bind:value={$server}
                    required
            />
        </label>
        <details>
            <summary>Available Servers</summary>
            <table>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Protocol</th>
                    <th scope="col">Host</th>
                    <th scope="col">Port</th>
                    <th scope="col">Path</th>
                    <th scope="col">Default</th>
                </tr>
                </thead>
                <tbody>
                {#each $servers as s, i}
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{s.protocol}</td>
                        <td>{s.hostname}</td>
                        <td>{s.port | s.protocol === 'http:' ? 80 : 443}</td>
                        <td>{s.pathname}</td>
                        <td>{$server.toString() === s.toString() ? '✔️' : '❌'}</td>
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
        </details>

        <footer>
            <button type="submit" on:click={addServer}>Add</button>
        </footer>
    </article>
</dialog>
