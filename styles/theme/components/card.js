const card = {
    variants: [
        {
            props: { variant: 'modal' },
            style: {
                position: "absolute",
                minHeight: 250,
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "normal",
            }
        },
        {
            props: { variant: 'alert' },
            style: {
                justifyContent: "center",
                maxWidth: "350px",
                gap: "10px",
                flexDirection: "column",
                minWidth: "200px",
                minHeight: "50px",
                display: "flex",
                alignItems: "center",
            }
        }
    ]
}

export default card