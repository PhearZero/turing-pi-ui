<script>
    import {servers, server} from '../stores/servers'
    import AddServer from "./bmc/AddServer.svelte";
    let showServerPanel = false
    const handleAddServer = () => {
        showServerPanel=true
    }
</script>
<nav class="container-fluid">
    <ul>
        <li>
            <a href="./" class="contrast" onclick="event.preventDefault()"><strong>Turing Pi 2</strong></a> @ <a>{new URL($server).host}</a>
        </li>
    </ul>
    <ul>
        <li>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="secondary">Theme</summary>
                <ul role="listbox">
                    <li><a data-theme-switcher="auto">Auto</a></li>
                    <li><a data-theme-switcher="light">Light</a></li>
                    <li><a data-theme-switcher="dark">Dark</a></li>
                </ul>
            </details>
        </li>
        <li>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="secondary">Baseboards</summary>
                <ul role="listbox">
                    {#each $servers as server}
                        <li><a href="../v1-preview/">{server.host}</a></li>
                    {/each}
                    <li><button on:click={handleAddServer}>Add Server</button></li>
                </ul>
            </details>
        </li>
    </ul>
    <AddServer bind:open={showServerPanel}/>
</nav>
