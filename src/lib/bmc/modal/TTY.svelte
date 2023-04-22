<script>
    import 'xterm/css/xterm.css';
    import {TTYReceiver} from "tty-receiver";
    import {onMount} from "svelte";

    export let open = false;
    export let server
    const handleClose = ()=>{
        open = false
    }
    let term
    onMount(()=>{
        new TTYReceiver(`ws://${server.ip}:8000/s/local/ws`, term, {fontSize: 24});
    })
</script>
<dialog open={open}>
    <header>
        <hgroup>
        <h1>Connected</h1>
        <h2>{`ws://${server.ip}:8000/s/local/ws`}</h2>
        </hgroup>
        <button href="#close" aria-label="Close" class="close" on:click={handleClose}></button>
    </header>
<!--    <article>-->
<!--    <div class="row">-->
<!--                <input type="text" disabled value={server.ip}>-->
<!--                <a href="#close" aria-label="Close" class="close" on:click={handleClose}></a>-->
<!--    </div>-->
<!--    <div class="row">-->
        <div bind:this={term} class="container-fluid"></div>
<!--    </div>-->

</dialog>

<style>
    .container-fluid {
        background-color: var(--muted-color);
        /*padding-bottom: var(--spacing);*/
        padding: 0;
    }
    dialog {
        flex-direction: column;
        /*background-color: #c62828;*/
    }
    header {
        border-radius: 20px 20px 0 0;
        width: 100%;
        padding: var(--spacing);
        flex-direction: row;
        /*margin-bottom: 0;*/
        background-color: var(--background-color);
    }
    input {
        max-width: 100px;
    }
</style>
