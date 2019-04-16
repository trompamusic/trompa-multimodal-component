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
    paddingTop     : spacing.unit,
    paddingBottom  : spacing.unit,
    color          : palette.common.white,
    fontFamily     : typography.fontFamily,
    fontWeight     : typography.fontWeightRegular,
    fontSize       : typography.pxToRem(14),
    backgroundColor: palette.common.faintBlack,
    ...mixins.gutters(),
  },
  footerCopyright: {
    [breakpoints.only('xs')]: {
      padding: `${spacing.unit / 2}px 0`,
    },
    flex    : 1,
    fontSize: '1em',
  },
});
