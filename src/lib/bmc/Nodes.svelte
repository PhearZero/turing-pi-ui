<script>
    import {watch} from '$lib/stores/servers'
    import {nodes} from '$lib/stores/nodes'
</script>
<article>
    <header>
        <hgroup>
            <h5>Nodes</h5>
            <h6>Configure your compute nodes</h6>
        </hgroup>
    </header>
    <figure>
    <table>
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Info</th>
            <th scope="col">USB 2.0</th>
            <th scope="col">Power</th>
        </tr>
        </thead>
        <tbody>
        {#each Object.keys($nodes) as nodeName, i}
            <tr>
                <td>{$nodes[nodeName].name}</td>
                <td>{$nodes[nodeName].info}</td>
                <td>

                            <input disabled type="checkbox" role="switch" id={`${$nodes[nodeName].usb}-i`} bind:checked={$nodes[nodeName].usb}/>

                </td>
                <td>

                        <input disabled type="checkbox" role="switch" id={`${$nodes[nodeName].power}-i`} bind:checked={$nodes[nodeName].power}/>

                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    </figure>
    <footer>
        {#if !$watch}
            <button disabled>Save</button>
        {/if}
        <button disabled class="error">Shutdown All</button>
    </footer>
</article>
<style>
    td, th {
        word-wrap: break-word;
        /*max-width: 150px;*/
    }
</style>
