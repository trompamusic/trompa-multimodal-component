export default ({ palette, typography, breakpoints, spacing }) => ({
  resultsTotal: {
    color                   : palette.text.secondary,
    fontSize                : typography.pxToRem(14),
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loading: {
    marginTop: spacing(2),
  },
  spinner: {
    color: palette.text.secondary,
  },
});
