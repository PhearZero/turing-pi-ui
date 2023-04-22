<script>
    import './styles.css'
    import './pico-bootstrap-grid.css'
    import Navigation from "$lib/layout/Navigation.svelte";
    import Footer from "$lib/layout/Footer.svelte";

    // localStorage.clear()
</script>
<div class="app">
    <Navigation/>
    <main class="container-fluid">
        <slot/>
    </main>
    <Footer/>
</div>
<style>
    /* Grid */
    .app>main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 7rem);
        padding: 0;
    }
</style>
