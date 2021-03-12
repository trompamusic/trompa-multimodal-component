export default ({ breakpoints, spacing, palette, typography }) => ({
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
});
