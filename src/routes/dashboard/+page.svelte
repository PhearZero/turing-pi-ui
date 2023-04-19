<script>
    import {server} from '../../stores/servers'

    let error
    let nodeinfo
    let usb
    let power

    const getNodeinfo = () => {
        const data = new URLSearchParams();
        data.set('opt', 'get')
        data.set('type', 'nodeinfo')
        let options = $server.toString().match('auth') ? {credentials: "include"} : {}
        fetch(`${$server}?${data}`, options)
            .then(r => r.json())
            .then(d => {
                console.log(d)
                nodeinfo = d;
            })
            .catch(e => {
                console.log({wow: e})
                error = e
            })
    }
    const getUsb = () => {
        const data = new URLSearchParams();
        data.set('opt', 'get')
        data.set('type', 'usb')
        let options = $server.toString().match('auth') ? {credentials: "include"} : {}
        fetch(`${$server}?${data}`, options)
            .then(r => r.json())
            .then(d => {
                console.log(d)
                usb = d;
            })
            .catch(e => {
                console.log({wow: e})
                error = e
            })
    }
    const getPower = () => {
        const data = new URLSearchParams();
        data.set('opt', 'get')
        data.set('type', 'power')
        let options = $server.toString().match('auth') ? {credentials: "include"} : {}
        fetch(`${$server}?${data}`, options)
            .then(r => r.json())
            .then(d => {
                console.log(d)
                power = d;
            })
            .catch(e => {
                console.log({wow: e})
                error = e
            })
    }
    getNodeinfo()
    getUsb()
    getPower()
</script>

<article>
    <header>
        <h2>Dashboard</h2>
    </header>
    <div class="grid">
    <article>
        <header>
            <h3>Node Info</h3>
        </header>
        {JSON.stringify(nodeinfo)}
    </article>
    <article>
        <header>
            <h3>USB</h3>
        </header>
        {JSON.stringify(usb)}
    </article>
    <article>
        <header>
            <h3>Power</h3>
        </header>
        {JSON.stringify(power)}
    </article>
    </div>
</article>

<style>
    h3, h2{
        margin-bottom: 0px;
    }
</style>
