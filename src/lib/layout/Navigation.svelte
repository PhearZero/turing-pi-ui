<script>
    import {urls} from '$lib/stores/refactor/servers'
</script>
<nav class="container-fluid">
    <ul>
        <li>
            <a href="./" class="contrast" onclick="event.preventDefault()"><strong>Turing Pi 2</strong></a> @ <a>{new URL($urls[0]).host}</a>
        </li>
    </ul>
    <ul>
        <li>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="secondary">Theme</summary>
                <ul role="listbox">
                    <li><a data-theme-switcher="auto">Auto</a></li>
                    <li><a data-theme-switcher="light">Light</a></li>
                    <li><a data-theme-switcher="dark">Dark</a></li>
                </ul>
            </details>
        </li>
    </ul>
</nav>
