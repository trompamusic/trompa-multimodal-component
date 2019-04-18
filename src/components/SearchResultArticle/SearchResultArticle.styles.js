export default ({ breakpoints, spacing }) => ({
  header: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  articleResultsContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
    },
  },
  articleHeader: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    display: 'flex',
  },
  articleContainer: {
    [breakpoints.down('sm')]: {
      height      : 'auto',
      marginTop   : spacing.unit,
      marginBottom: spacing.unit,
    },
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 145,
  },
  image: {
    [breakpoints.down('sm')]: {
      height     : 145,
      marginLeft : 'auto',
      marginRight: 'auto',
      marginTop  : spacing.unit * 2,
    },
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
