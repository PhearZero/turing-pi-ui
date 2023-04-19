<script>
    import Authentication from "../lib/Authentication.svelte";
    import {servers, server} from '../stores/servers'
</script>

<svelte:head>
    <title>Turing Pi 2</title>
    <meta name="description" content="Turing Pi 2 Web Interface"/>
</svelte:head>

<article class="grid">
        <Authentication/>
</article>
