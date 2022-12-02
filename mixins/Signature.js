export default {
    beforeMount()  {
        let color = this.darkTheme ? 'white' : 'black'

        console.info(
            '%c ↘ Synchronized Studio', 
            `font-size: 30px;color: ${color}; text-align: center; font-family: sans-serif;`,'\n','\n', 
            'made by https://synchronized.studio')
    }
}