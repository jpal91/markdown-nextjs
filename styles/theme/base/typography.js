import colors from './colors'

const { primary } = colors

const baseProperties = {
  fontWeightBold: 800,
  fontWeightMedium: 600,
  fontWeightRegular: 400,
  fontWeightLight: 300,
  color: primary.text,
  fontFamily: '"Lato", sans-serif'
};

const fontFam = {
  regular: "'Roboto', sans-serif;",
  mono: "'Roboto mono', monospace",
  slab: "'Roboto Slab', serif"
}


const typography = {
  ...baseProperties,
  h1: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: '32px',
  },
  h2: {
    fontWeight: baseProperties.fontWeightLight,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: '28px',
  },
  h3: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: '24px',
  },
  h4: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: '20px',
  },
  h5: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: '16px',
  },
  h6: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: primary.dOrange,
    fontSize: '14px',
  },
  heading: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: 'white',
    fontSize: 14,
    letterSpacing: '2px'
  },
  body1: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: baseProperties.fontFamily,
    color: baseProperties.color,
    fontSize: 16
  },
  body2: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: baseProperties.fontFamily,
    color: baseProperties.color,
    fontSize: 12
  }
}

export default typography;