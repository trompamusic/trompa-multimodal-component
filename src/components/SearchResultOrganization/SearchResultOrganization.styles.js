export default ({ breakpoints, spacing }) => ({
  organizationResultsContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
    },
    '& $organizationContainer:nth-child(3n+3)': {
      marginRight: 0,
    },
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
  },
  organizationContainer: {
    [breakpoints.down('sm')]: {
      width       : '90%',
      marginRight : 0,
      marginTop   : spacing.unit,
      marginBottom: spacing.unit,
    },
    marginTop   : spacing.unit * 2,
    marginRight : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    width       : '33%',
    padding     : spacing.unit * 2,
  },
  organizationHeader: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    display: 'flex',
  },
  image: {
    [breakpoints.down('sm')]: {
      marginLeft  : 'auto',
      marginRight : 'auto',
      marginBottom: spacing.unit,
    },
    borderRadius: 4,
    width       : 100,
    height      : 100,
  },
  header: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
    },
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
