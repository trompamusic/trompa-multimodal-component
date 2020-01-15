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
  resultsTotal: {
    color: palette.common.faintBlack,
  },
  noResultsHeader: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
    fontSize  : typography.pxToRem(24),
    fontWeight: 'bold',
  },
  searchTipsHeader: {
    marginTop : spacing.unit * 3,
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
  searchTips: {
    margin : 0,
    paddingLeft: spacing.unit * 3,
    '& li': {
      fontSize:typography.pxToRem(16),
      fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    },
  },
});
