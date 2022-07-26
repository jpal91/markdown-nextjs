import colors from '../base/colors'

const { primary } = colors

const fab = {
    variants: [
        {
            props: { variant: 'preview' },
            style: {
                position: "absolute",
                bottom: "15px",
                right: "10px",
                backgroundColor: primary.dOrange,
                "&:hover": {
                    backgroundColor: primary.dOrange,
                    opacity: "0.8",
                },
            }
        }
    ]
}

export default fab