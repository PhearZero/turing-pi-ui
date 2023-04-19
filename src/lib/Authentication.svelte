<script>
    import {server, servers} from '../stores/servers'
    import AddServer from "$lib/bmc/AddServer.svelte";

    let advanced = false
    let open = false
    let error
    const checkCredentials = (redirect) => {
        let options = $server.toString().match('auth') ? {credentials: "include",} : {}
        fetch($server, options)
            .then(r => r.json())
            .then(d => {
                error = undefined
                if(redirect){
                    window.location = '/dashboard'
                }
            })
            .catch(e => {
                console.log({wow: e})
                error = e
                advanced = true
            })
    }
    checkCredentials()

    const handleAddServer = (e) => {
        e.preventDefault()
        open = true
    }

    const onSubmit = (e) => {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        checkCredentials(true)
    }
</script>

<div>
    <hgroup>
        <h1>Sign in</h1>
        <h2>Connect to the <a target="_blank"
                              href="https://help.turingpi.com/hc/en-us/articles/8686945524893-Baseboard-Management-Controller-BMC-">Baseboard
            Management Controller(BMC)</a></h2>
    </hgroup>
    <form on:submit|preventDefault={onSubmit}>
        <input
                type="text"
                id="login"
                name="login"
                placeholder="Login"
                aria-label="Login"
                autocomplete="nickname"
                disabled
                value="admin"
                required
        />
        <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                autocomplete="current-password"
                disabled
                value="admin"
                required
        />
        <fieldset>
            <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" checked/>
                Remember me
            </label>
            <label for="advanced">
                <input type="checkbox" role="switch" id="advanced" bind:checked={advanced}/>
                Advanced Settings
            </label>
        </fieldset>
        {#if advanced}
            <label for="server_url">
                Server URL
                <select id="server_url" bind:value={$server} on:change={checkCredentials} aria-errormessage="err1"
                        aria-invalid={typeof error !== 'undefined' ? true : false}>
                    <option value={$server} selected>{$server}</option>
                    {#each $servers as s, i}
                        {#if $server.toString() !== s.toString()}
                            <option value={s}>{s}</option>
                        {/if}
                    {/each}
                </select>
                {#if typeof error !== "undefined"}
                    <span id="err1" class="errormessage">Error: {error?.message}</span>
                {/if}
            </label>
            <button on:click={handleAddServer} class="secondary">Add Server</button>
            <AddServer bind:open/>
        {/if}
        <button type="submit">Login</button>
    </form>
</div>

<style>
    .errormessage {

    }

    fieldset {
        display: flex;
        /*flex-direction: row;*/
        justify-content: flex-end;

    }

    fieldset > label {
        flex-grow: 1;
        justify-content: flex-end;
    }

    #advanced-input {
        justify-content: flex-end;
    }
</style>
