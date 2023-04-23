<script>
    import {server} from '$lib/stores/server'
</script>
<article>
    <header class="title-header">
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
    <article class="upload-card">
        <header class="upload-header">
    <form disabled action="/action_page.php">
        <label for="file">
            Upload Firmware
        <input disabled type="file" id="file" name="filename">
        </label>
        <input disabled type="submit">
    </form>
        </header>
    </article>
    <footer>
    </footer>
</article>

<style>
    .upload-card {
        padding-bottom: 0;
    }
    hgroup, form, .upload-header {
        margin-bottom: 0;
    }
    article {
        margin: 0
    }
</style>
