export default ({ breakpoints, spacing, palette, typography }) => ({
  root: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginLeft   : spacing(2),
      marginRight  : spacing(2),
    },
    margin     : spacing(3),
    marginLeft : spacing(5),
    marginRight: spacing(5),
    display    : 'flex',
    flexWrap   : 'nowrap',
    minHeight  : '80.75vh',
  },
  resultsContainer: {
    [breakpoints.down('sm')]: {
      margin: 0,
    },
    margin    : spacing(2),
    marginTop : 0,
    marginLeft: spacing(3),
  },
  category: {
    fontWeight: 'bold',
  },
  resultsHeader: {
    marginBottom: spacing(2.25),
  },
  resultsTotal: {
    color                   : palette.common.darkGrey,
    fontSize                : typography.pxToRem(14),
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  resultsCount: {
    fontSize: typography.pxToRem(14),
    color   : palette.common.darkGrey,
  },
  noResultsHeader: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
    fontSize  : typography.pxToRem(24),
    fontWeight: 'bold',
  },
  searchTipsHeader: {
    marginTop : spacing(3),
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
  searchTips: {
    margin     : 0,
    paddingLeft: spacing(3),
    '& li'     : {
      fontSize  : typography.pxToRem(16),
      fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    },
  },
  button: {
    fontSize     : typography.pxToRem(14),
    textTransform: 'none',
    color        : palette.common.blue,
    padding      : `${spacing()}px ${spacing()}px ${spacing()}px ${spacing(2)}px`,
  },
  buttonIcon: {
    fontSize  : typography.pxToRem(18),
    marginLeft: spacing(0.5),
  },
});
