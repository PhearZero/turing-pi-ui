<script>
    import 'xterm/css/xterm.css';
    import {server} from '$lib/stores/server'
    import {onMount} from "svelte";
    import {Terminal} from 'xterm';
    import {nodes} from "$lib/stores/nodes";

    export let open = false;
    export let nodeName

    let term
    let xterm
    let interval
    let poll = 2000
    const handlePowerChange = (e) => {
        $server.client.set('power', {[e.target.name]: e.target.checked ? 1 : 0}, {mode: "no-cors"}).catch((_error) => {
            console.log(_error)
        })
    }
    const handleClose = () => {
        open = false
        xterm.clear()
        console.log(interval)
        if (typeof interval !== 'undefined') {
            clearInterval(interval)

        }
    }


    const nodeMap = {
        "node1": 0,
        "node2": 1,
        "node3": 2,
        "node4": 3,
    }

    let cmd = ""
    onMount(() => {
        console.log('Mounting', open)
        interval = setInterval(() => {
            console.log('interval')
            $server.client.get('uart', {node: nodeMap[nodeName]}).then((r) => {

                xterm.write(r.response[0].uart)
            })
        }, poll)

        xterm = new Terminal({
            convertEol: true,
            cursorBlink: true,
        });
        xterm.open(term);
        xterm.focus();
        xterm.onKey(function ({key}) {
            const code = key.charCodeAt(0);
            if (code === 127) {   //Backspace
                xterm.write("\b \b");
                cmd = cmd.substring(0, cmd.length - 1);
            } else if (key === '\r') {
                $server.client.set('uart', {node: nodeMap[nodeName], cmd: cmd}, {mode: 'no-cors'})
                for (let i = 0; i < cmd.length; i++) {
                    xterm.write("\b \b");
                }
                cmd = ""
            } else {
                xterm.write(key)
                cmd += key
            }

        })
    })
</script>
<dialog open={open}>

    <header>

        <!--            <div class="col-7">-->
        <!--                <form>-->
        <!--                <label for="command">-->
        <!--                    Command:-->
        <!--                    <input type="text" id="command" name="command" value={cmd}/>-->
        <!--                </label>-->
        <!--                </form>-->
        <!--            </div>-->

        <div class="row">
            <div class="col-lg-10 col-9">
                <hgroup >
                    <h1>Connected</h1>
                    <h2>{`${nodeName}@${$server.ip}`}</h2>

                </hgroup>
                <label>
                    Power
                    <input
                            on:change={handlePowerChange}
                            type="checkbox"
                            role="switch"
                            name={nodeName}
                            bind:checked={$nodes[nodeName].power}
                    />
                </label>
            </div>

            <div class="col-lg-2 col-3">

                <button aria-label="Close" class="close error" on:click={handleClose}>X</button>
            </div>
        </div>
    </header>

    <div bind:this={term} class="container-fluid"></div>

</dialog>

<style>
    hgroup, label, input {
        margin-bottom: 0;
        margin-top: 0;
    }

    .container-fluid {
        background-color: var(--muted-color);
        /*padding-bottom: var(--spacing);*/
        padding: 0;
    }

    dialog {
        flex-direction: column;
        height: 100%;
        max-height: 100vh;
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
