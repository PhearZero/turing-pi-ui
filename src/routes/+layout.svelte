<script>
    import './styles.css'
    import './pico-bootstrap-grid.css'
    import Navigation from "../lib/Navigation.svelte";
    import Footer from "../lib/Footer.svelte";
</script>
<div class="app">
    <Navigation/>
    <main class="container">
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
        padding: 1rem 0;
    }

    article {
        padding: 0;
        overflow: hidden;
    }

    article div {
        padding: 1rem;
    }

    @media (min-width: 576px) {
        .app>main {
            padding: 1.25rem 0;
        }

        article div {
            padding: 1.25rem;
        }
    }

    @media (min-width: 768px) {
        .app>main {
            padding: 1.5rem 0;
        }

        article div {
            padding: 1.5rem;
        }
    }

    @media (min-width: 992px) {
        .app>main {
            padding: 1.75rem 0;
        }

        article div {
            padding: 1.75rem;
        }
    }

    @media (min-width: 1200px) {
        .app>main {
            padding: 2rem 0;
        }

        article div {
            padding: 2rem;
        }
    }

    /* Nav */
    summary[role="link"].secondary:is([aria-current], :hover, :active, :focus) {
        background-color: transparent;
        color: var(--secondary-hover);
    }



    @media (min-width: 992px) {
        .grid>div:nth-of-type(2) {
            display: block;
        }
    }

    /* Footer */
    .app>footer {
        padding: 1rem 0;
    }

</style>
