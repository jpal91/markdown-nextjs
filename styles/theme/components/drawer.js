import colors from "../base/colors"

const { background } = colors

const drawer = {
    styleOverrides: {
        docked: {
            width: 240,
            flexShrink: 0,
            anchor: 'left'
        },
        paper: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: background.navLight,
            padding: 16,
            maxHeight: '100vh'
        }
    }
}

export default drawer