export default ({ palette, spacing }) => ({
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  videoContainer: {
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 110,
  },
  image: {
    width       : 175,
    height      : 'auto',
    borderRadius: '4px 0px 0px 4px'
  },
  playArrow: {
    position : 'absolute',
    transform: 'translate(80%, 35%)',
    fontSize : '400%',
    color    : palette.common.white,
  },
  contentContainer: {
    padding: spacing.unit * 2,
  },
  links: {
    marginBottom: 0,
  },
});
