<script>
    import Authentication from "../lib/Authentication.svelte";
    import {servers, server} from '$lib/stores/servers'

</script>

<svelte:head>
    <title>Turing Pi 2</title>
    <meta name="description" content="Turing Pi 2 Web Interface"/>
</svelte:head>
<div class="container">
<article class="grid">
        <Authentication/>
</article>
</div>
