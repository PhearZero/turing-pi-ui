<script>
    import {server} from '$lib/stores/server'
    console.log($server)
</script>
<article>
    <header>
        <hgroup>
        <h4>Server</h4>
        <h5>Metadata for BMC Board</h5>
        </hgroup>
    </header>
    <div class="grid">
        <label>
            IP Address
            <input readonly value={$server.ip} />
        </label>
    </div>
    <label>
        MAC Address
        <input readonly value={$server.mac} />
    </label>
    <label>
        BMC Version
        <input readonly value={$server.version} />
    </label>
    <label>
        BMC Firmware Date
        <input readonly value={$server.buildtime} />
    </label>
</article>

<style>
    hgroup {
        margin-bottom: 0;
    }
    article {
        margin: 0
    }
</style>
