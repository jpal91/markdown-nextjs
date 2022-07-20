import colors from "./colors";

const { primary } = colors;

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
};

const typography = {
  ...baseProperties,
  h1: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: "32px"
  },
  h2: {
    fontWeight: baseProperties.fontWeightLight,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: "28px"
  },
  h3: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: "24px"
  },
  h4: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: "20px"
  },
  h5: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: baseProperties.color,
    fontSize: "16px"
  },
  h6: {
    fontWeight: baseProperties.fontWeightBold,
    fontFamily: fontFam.slab,
    color: primary.dOrange,
    fontSize: "14px"
  },
  heading: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: primary.dOrange,
    fontSize: 20,
    letterSpacing: "5px"
  },
  headingText: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: "white",
    fontSize: 15
  },
  sideNavHeading: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: primary.vlgray,
    fontSize: 15,
    letterSpacing: "2px"
  },
  sideNavText: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: primary.lOrange,
    fontSize: 13,
    letterSpacing: "2px"
  },
  sideNavSubText: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.regular,
    color: 'hsla(360, 100%, 100%, 1)',
    fontSize: 10,
    letterSpacing: "2px"
  },
  subBarText: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.slab,
    fontSize: 14,
    lineHeight: "24px",
    color: primary.lgray
  },
  body1: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.slab,
    fontSize: 14,
    lineHeight: "24px"
  },
  body2: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: baseProperties.fontFamily,
    color: baseProperties.color,
    fontSize: 12
  },
  editor: {
    fontWeight: baseProperties.fontWeightRegular,
    fontFamily: fontFam.mono,
    fontSize: 14
  }
};

export default typography;
