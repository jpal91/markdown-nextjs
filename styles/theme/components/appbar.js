import colors from "../base/colors";

const { background } = colors

const appbar = {
    styleOverrides: {
		root: {
			backgroundColor: background.navLight,
			position: "sticky",
			maxWidth: "100%",
			height: "72px",
			display: 'flex',
			alignItems: "center",
			justifyContent: "center",
		}
	},
};

export default appbar;
