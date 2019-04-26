export default ({ breakpoints, spacing }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom: spacing.unit * 3,
    },
  },
  allCategorySelected: {
    height: 36,
  },
  categoryLabel: {
    paddingLeft: 0,
  },
  filterHeaderItem: {
    marginTop: spacing.unit * 2,
    paddingLeft: 0,
  },
  filterCheckbox: {
    paddingRight: 0,
  },
  filterHeaderText: {
    fontWeight: 800,
  },
});
