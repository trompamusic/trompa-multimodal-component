export default ({ breakpoints, spacing, typography }) => ({
  organizationResultsContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginTop    : spacing(),
      marginBottom : spacing(),
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
      marginTop   : spacing(),
      marginBottom: spacing(),
    },
    marginTop   : spacing(2),
    marginRight : spacing(2),
    marginBottom: spacing(2),
    display     : 'flex',
    width       : '33%',
    padding     : spacing(2),
  },
  organizationHeader: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
    },
    display: 'flex',
  },
  image: {
    [breakpoints.down('sm')]: {
      marginLeft  : 'auto',
      marginRight : 'auto',
      marginBottom: spacing(),
    },
    borderRadius: 4,
    objectFit   : 'cover',
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
    marginLeft: spacing(2),
  },
  links: {
    marginBottom: 0,
  },
  noResultsText: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
  },
});
