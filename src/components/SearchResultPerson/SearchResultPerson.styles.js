export default ({ spacing }) => ({
  personContainer: {
    marginTop: spacing.unit * 2, 
    marginBottom: spacing.unit * 2, 
    padding: spacing.unit * 2,
  },
  personHeader: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 32,
  },
  personInfo: {
    marginLeft: spacing.unit * 2,
  },
  links: {
    marginBottom: 0,
  },
});
