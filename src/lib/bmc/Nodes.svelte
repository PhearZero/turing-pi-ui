<script>
    import {server} from '$lib/stores/server'
    import {nodes} from '$lib/stores/nodes'

    let loading
    let error
    const setUSB = (id) => {
        let _nodes = $nodes
        Object.keys(_nodes).forEach((n, i)=>{
            _nodes[n] = {
                ..._nodes[n],
                usb: i === id,
            }
        })
        server.set({
            ...$server,
            usb: {
                ...$server.usb,
                node: id,
            }
        })
        nodes.set(_nodes)
    }
    const handleUsbChange = async (e) => {
        loading = true
        // get the previous state, in case of it changing or to revert to it during failure
        const nodeMap = {
            "node1": 0,
            "node2": 1,
            "node3": 2,
            "node4": 3,
        }
        $server.client.set('usb', {mode: $server.usb.mode, node: nodeMap[e.target.value]}, {mode: "no-cors"})
            .then(() => {
                setUSB(nodeMap[e.target.value])
                loading = false
            })
            .catch(_error => {
                if(_error.name !== 'SyntaxError'){
                    error = _error
                }
                setUSB(
                    _error.name === 'SyntaxError' ? nodeMap[e.target.value] : $server.usb.node
                )
                loading = false
            })
    }
    const handlePowerChange = (e) =>{
        loading = true
        $server.client.set('power', {[e.target.name]: e.target.checked ? 1:0}, {mode: "no-cors"}).catch((_error)=>{
            console.log(_error)
        })
    }
</script>
<article>
    <header>
        <hgroup>
            <h1>Nodes</h1>
            <h2>Configure your compute nodes</h2>
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
                        {#if typeof $server.usb !== 'undefined'}
                            <input
                                    on:change={handleUsbChange}

                                    type="radio"
                                    name="usb"
                                    bind:value={nodeName}
                                    checked={$server.usb.node === i}
                            />
                            {:else }
                            <input
                                    type="radio"
                                    name="usb"
                            />
                        {/if}


                    </td>
                    <td>

                        <input
                                on:change={handlePowerChange}
                                type="checkbox"
                                role="switch"
                                name={nodeName}
                               bind:checked={$nodes[nodeName].power}
                        />

                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </figure>
    <footer>
    </footer>
</article>
<style>
    hgroup, header, figure {
        margin-bottom: 0;
    }

    footer {
        margin-top: 0;
    }
</style>
