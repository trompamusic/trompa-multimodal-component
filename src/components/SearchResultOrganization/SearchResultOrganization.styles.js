export default ({ spacing }) => ({
  organizationResultsContainer: {
    '& $organizationContainer:nth-child(3n+3)': {
      marginRight: 0,
    },
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
  },
  organizationContainer: {
    marginTop   : spacing.unit * 2,
    marginRight : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    width       : '33%',
    padding     : spacing.unit * 2,
  },
  organizationHeader: {
    display: 'flex',
  },
  image: {
    borderRadius: 4,
    width       : 100,
    height      : 100,
  },
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  organizationInfo: {
    marginLeft: spacing.unit * 2,
  },
  links: {
    marginBottom: 0,
  },
});
