<script>

    import Nodes from "$lib/bmc/Nodes.svelte";
    import {watch, servers} from "$lib/stores/servers"
    import Servers from "$lib/bmc/Servers.svelte";

    const onWatchClicked = () => {
        $watch = !$watch;
    }

</script>

<article>
    <header>
        <div class="row">
        <hgroup class="col-8">
            <h1>Dashboard</h1>
            <h2>Settings from the Baseboard Management Controller</h2>
        </hgroup>
        <div class="col-4 watch-bmc">
<!--        <label for="watch" class="col-4 watch-bmc">-->
            <button on:click={onWatchClicked} class={!$watch ? "success" : "error"}>
                {$watch? "Stop Watching" : "Start Watching"}
            </button>
<!--            <input type="checkbox" role="switch" id="watch" bind:checked={watch}/>-->
<!--        </label>-->
        </div>
        </div>
    </header>

    <Nodes/>
    <Servers/>
    <article>
        <header>
            <h3>USB Mode</h3>
        </header>
        <form>
            <select disabled></select>
        </form>
    </article>
</article>

<style>
    article {
        margin: 0;
    }
    .watch-bmc {
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        justify-content: end;
    }
    h3, h2{
        margin-bottom: 0;
    }
</style>
