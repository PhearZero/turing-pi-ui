<script>
    import './styles.css'
    import './pico-bootstrap-grid.css'
    import Navigation from "../lib/Navigation.svelte";
    import Footer from "../lib/Footer.svelte";
</script>
<div class="app">
    <Navigation/>
    <main class="container-fluid">
        <slot/>
    </main>
    <Footer/>
</div>
<style>
    .app>main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 7rem);
        padding: 0;
    }
</style>
