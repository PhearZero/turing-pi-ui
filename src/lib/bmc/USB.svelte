<script>
    import {server} from '$lib/stores/server'

    let loading
    let error
    const setUSB = (mode) => {
        server.set({
            ...$server,
            usb: {
                ...$server.usb,
                mode,
            }
        })
    }
    const handleUsbChange = async (e) => {
        loading = true
        $server.client.set('usb', {mode: e.target.value, node: $server.usb.node}, {mode: "no-cors"})
            .then(() => {
                setUSB(parseInt(e.target.value))
                loading = false
            })
            .catch(e => {
                error = e
                setUSB($server.usb.mode)
                loading = false
            })
    }
</script>

{#await server.init()}
    <!-- promise is pending -->
    <p>waiting for the promise to resolve...</p>
{:then value}
    <article>
        <header>
            <hgroup>
                <h4>USB Mode</h4>
                <h5>Set USB to host or device</h5>
            </hgroup>
        </header>
        {#if typeof $server.usb !== 'undefined'}
            <select on:change={handleUsbChange} id="usb" required bind:value={$server.usb.mode}>
                <option value={0}>Host</option>
                <option value={1}>Device</option>
            </select>
        {:else }
            <select id="usb-preview">
                <option value={0}>Host</option>
                <option value={1}>Device</option>
            </select>
        {/if}
        <footer>
        </footer>
    </article>
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}

<style>
    hgroup, form {
        margin-bottom: 0;
    }

    article {
        /*margin: 0*/
    }
</style>
