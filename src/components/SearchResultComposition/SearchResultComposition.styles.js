export default ({ spacing }) => ({
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  compositionContainer: {
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 110,
  },
  image: {
    width       : 175,
    height      : 'auto',
    borderRadius: '4px 0px 0px 4px',
  },
  contentContainer: {
    padding: spacing.unit * 2,
  },
  links: {
    marginBottom: 0,
  },
});
