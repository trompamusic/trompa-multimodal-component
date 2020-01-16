export default ({ breakpoints, spacing, palette, typography }) => ({
  root: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginLeft   : spacing.unit * 2,
      marginRight  : spacing.unit * 2,
    },
    margin     : spacing.unit * 3,
    marginLeft : spacing.unit * 5,
    marginRight: spacing.unit * 5,
    display    : 'flex',
    flexWrap   : 'nowrap',
    minHeight  : '80.75vh'
  },
  resultsContainer: {
    [breakpoints.down('sm')]: {
      margin: 0,
    },
    margin    : spacing.unit * 2,
    marginTop : 0,
    marginLeft: spacing.unit * 3,
  },
  resultsHeader: {
    marginBottom: spacing.unit * 2.25,
  },
  resultsTotal: {
    color                   : palette.common.darkGrey,
    fontSize                : typography.pxToRem(14),
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  noResultsText: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
  },
});
