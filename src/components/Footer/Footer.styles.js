export default ({ breakpoints, palette, typography, spacing, mixins }) => ({
  root: {
    backgroundColor: palette.primary.light,
    color          : palette.common.white,
  },
  footer: {
    [breakpoints.only('xs')]: {
      flexDirection: 'column',
      textAlign    : 'center',
    },
    display: 'flex',
    paddingTop     : spacing(),
    paddingBottom  : spacing(),
    color          : palette.common.white,
    fontFamily     : typography.fontFamily,
    fontWeight     : typography.fontWeightRegular,
    fontSize       : typography.pxToRem(14),
    backgroundColor: palette.common.faintBlack,
    ...mixins.gutters(),
  },
  footerCopyright: {
    [breakpoints.only('xs')]: {
      padding: `${spacing(0.5)}px 0`,
    },
    flex    : 1,
    fontSize: '1em',
  },
});
