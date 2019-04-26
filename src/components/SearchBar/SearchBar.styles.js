export default ({ breakpoints, spacing }) => ({
  root: {
    [breakpoints.down('sm')]: {
      paddingLeft : spacing.unit * 2,
      paddingRight: spacing.unit * 2,
    },
    paddingLeft : spacing.unit * 5,
    paddingRight: spacing.unit * 5,
    marginTop   : spacing.unit * 2,
    boxSizing   : 'border-box',
  },
  textField: {
    width: '100%',
  },
});
