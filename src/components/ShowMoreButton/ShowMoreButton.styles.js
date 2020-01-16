export default ({ breakpoints, spacing }) => ({
  button: {
    [breakpoints.down('sm')]: {
      margin      : spacing(),
      marginBottom: 0,
    },
    height         : '100%',
    backgroundColor: '#f5f5f5',
    textTransform  : 'none',
    paddingLeft    : spacing(2),
    borderRadius   : 32,
  },
});
