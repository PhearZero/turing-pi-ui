<script>
    import Nodes from "$lib/bmc/Nodes.svelte";
    import Server from "$lib/bmc/Server.svelte";
    import USB from "$lib/bmc/USB.svelte";

</script>

<article>
    <header>
        <div class="row">
            <hgroup class="col-8">
                <h1>Dashboard</h1>
                <h2>Settings from the Baseboard Management Controller</h2>
            </hgroup>
        </div>
    </header>
    <Nodes/>
    <USB/>
    <Server/>

</article>

<style>
    article {
        background-color: var(--background-color);
    }
    hgroup,
    article {
        margin: 0;
    }
</style>
