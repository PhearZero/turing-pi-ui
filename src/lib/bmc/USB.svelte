<script>
    import {server} from '$lib/stores/server'
</script>

{#await server.init()}
    <!-- promise is pending -->
    <p>waiting for the promise to resolve...</p>
{:then value}
    <article>
        <header>
            <hgroup>
            <h4>USB Mode</h4>
                <h5>Set USB to host or device</h5>
            </hgroup>
        </header>
        <form>
            <select disabled></select>
        </form>
    </article>
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}

<style>
    hgroup, form {
        margin-bottom: 0;
    }
    article {
        /*margin: 0*/
    }
</style>
