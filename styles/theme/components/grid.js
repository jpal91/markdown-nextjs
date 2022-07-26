const grid = {
    styleOverrides: {
        root: {
            display: "flex",
            justifyContent: "center",
        },
    },
	variants: [
		{
			props: { variant: 'preview' },
			style: {
				width: "100%",
				height: "100%",
				flex: "1 1 auto",
                typography: "body1",
			},
		}
	]
};

export default grid;
