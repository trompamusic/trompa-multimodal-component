export default ({ breakpoints, spacing, palette, typography }) => ({
  root: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      margin       : spacing(2),
    },
    margin     : spacing(3),
    marginLeft : spacing(5),
    marginRight: spacing(5),
    display    : 'flex',
    flexWrap   : 'nowrap',
    minHeight  : '80.75vh',
  },
  resultsContainer: {
    position: 'relative',
    width   : '100%',
  },
  resultsTotal: {
    color                   : palette.text.secondary,
    fontSize                : typography.pxToRem(14),
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});
