export default ({ spacing }) => ({
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  articleContainer: {
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 145,
  },
  image: {
    width       : 120,
    height      : 'auto',
    borderRadius: '4px 0px 0px 4px'
  },
  contentContainer: {
    padding: spacing.unit * 2,
  },
  links: {
    marginBottom: 0,
  },
});
