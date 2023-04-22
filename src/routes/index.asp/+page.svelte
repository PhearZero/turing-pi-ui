<script>
    import Nodes from "$lib/bmc/Nodes.svelte";
    import {watch, server} from "$lib/stores/server"
    import Server from "$lib/bmc/Server.svelte";
    import USB from "$lib/bmc/USB.svelte";

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
    <USB/>
    <Server/>

</article>

<style>
    hgroup, form, button {
        margin-bottom: 0;
    }
    article {
        margin: 0;
    }
    .watch-bmc {
        /*margin-bottom: 0;*/
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        justify-content: end;
    }
    h3, h2{
        margin-bottom: 0px;
    }
</style>
