export const themeSwitcher = {
    // Config
    _scheme: "auto" as string | null,
    menuTarget: "details[role='list']",
    buttonsTarget: "a[data-theme-switcher]",
    buttonAttribute: "data-theme-switcher",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",

    // Init
    init() {
        this.scheme = this.schemeFromLocalStorage;
        this.initSwitchers();
    },

    // Get color scheme from local storage
    get schemeFromLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
            if (window.localStorage.getItem(this.localStorageKey) !== null) {
                return window.localStorage.getItem(this.localStorageKey);
            }
        }
        return this._scheme;
    },

    // Preferred color scheme
    get preferredColorScheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    },

    // Init switchers
    async initSwitchers() {
        const buttons = document.querySelectorAll(this.buttonsTarget)
        buttons.forEach((button) => {
            button.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                    // Set scheme
                    this.scheme = button.getAttribute(this.buttonAttribute);
                    // Close dropdown
                    const dd = document.querySelector(this.menuTarget)
                    if(dd){
                        dd.removeAttribute("open");
                    }
                },
                false
            );
        });
    },

    // Set scheme
    set scheme(scheme) {
        if (scheme == "auto") {
            this.preferredColorScheme == "dark" ? (this._scheme = "dark") : (this._scheme = "light");
        } else if (scheme == "dark" || scheme == "light") {
            this._scheme = scheme;
        }
        this.applyScheme();
        this.schemeToLocalStorage();
    },

    // Get scheme
    get scheme() {
        return this._scheme;
    },

    // Apply scheme
    applyScheme() {
        const html = document.querySelector("html")
            if(html && this.scheme){
                html.setAttribute(this.rootAttribute, this.scheme);
            }

    },

    // Store scheme to local storage
    schemeToLocalStorage() {
        if (typeof window.localStorage !== "undefined" && this.scheme) {
            window.localStorage.setItem(this.localStorageKey, this.scheme);
        }
    },
};
