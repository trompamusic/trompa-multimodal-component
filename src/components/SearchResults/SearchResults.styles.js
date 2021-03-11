export default ({ palette, typography, breakpoints, spacing }) => ({
  resultsTotal: {
    color                   : palette.text.secondary,
    fontSize                : typography.pxToRem(14),
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loading: {
    position      : 'absolute',
    top           : 0,
    left          : 0,
    width         : '100%',
    height        : 400,
    marginTop     : spacing(2),
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
  },
  spinner: {
    color: palette.text.secondary,
  },
});
