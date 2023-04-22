<script>
    let example = {
        name: 'node1',
        power: true,
        usb: false,
        info: "unknown"

    }
    export let node
    export let watch = false

    if(typeof node === 'undefined'){
        throw new Error('Must have a valid node!')
    }
</script>
<article>
    <header>
        <div class="row align-items-center no-gutters">
            <div class="col-7 node-header-col">
                <h3>{node.name}</h3>
            </div>
            <div class="col-5 align-items-end node-power-col">
                <button class={`${node.power ? "success" : "error"} icon-button`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                </button>
            </div>
        </div>
    </header>
    {node.info}
    <footer>
        <button class={node.usb ? "success" : "error"}>USB</button>
    </footer>
</article>
<style>
    .node-header-col, .node-header-col>h3 {
        margin: 0px;
        padding: 0px;
    }
    .node-power-col {
        overflow: hidden;
    }
    .icon-button {
        float: right;
    }
    /*header {*/
    /*    margin-bottom: 0px;*/
    /*}*/
</style>
