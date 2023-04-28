<script>
    import './styles.css'
    import './pico-bootstrap-grid.css'
    import Navigation from "../lib/Navigation.svelte";
    import Footer from "../lib/Footer.svelte";
</script>

<Navigation/>
<main class="container-fluid">
    <slot/>
</main>
<Footer/>
<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 7rem);
        padding: 0;
    }
</style>
