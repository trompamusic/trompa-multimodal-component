export default ({ breakpoints, spacing, palette }) => ({
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
});
