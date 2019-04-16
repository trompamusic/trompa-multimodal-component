export default ({ spacing }) => ({
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  placeResultsContainer: {
    '& $placeContainer:nth-child(3n+3)': {
      marginRight: 0,
    },
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
  },
  placeContainer: {
    marginTop   : spacing.unit * 2,
    marginRight : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    width       : '33%',
    height      : 300,
  },
  image: {
    width       : 100,
    height      : 'auto',
    borderRadius: '4px 0px 0px 4px'
  },
  contentContainer: {
    display      : 'flex',
    flexDirection: 'column',
    padding      : spacing.unit * 2,
    wordBreak    : 'break-all',
  },
  locationLinks: {
    marginBottom: 0,
  },
  links: {
    justifySelf : 'flex-end',
    marginBottom: 0,
  },
});
