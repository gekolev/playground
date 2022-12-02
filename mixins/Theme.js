
export default {
    data: () => ({
        darkTheme: false
    }),

    beforeMount()  {
        this.darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
}