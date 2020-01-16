export default ({ spacing }) => ({
  root: {
    padding: spacing(2),
  },
  paragraph: {
    marginBottom: spacing(2),
  },
  status: {
    display   : 'flex',
    alignItems: 'center',
  },
  propertyValue: {
    marginBottom: spacing(),
    padding     : spacing(),
    border      : '1px solid #ccc',
  },
});
