export default ({ spacing, palette }) => ({
  root: {
    margin     : spacing.unit * 3,
    marginLeft : spacing.unit * 5,
    marginRight: spacing.unit * 5,
    display    : 'flex',
    flexWrap   : 'nowrap',
    minHeight  : '80.75vh'
  },
  resultsContainer: {
    margin    : spacing.unit * 2,
    marginTop : 0,
    marginLeft: spacing.unit * 3,
  },
  resultsTotal: {
    color: palette.common.faintBlack,
  },
});
