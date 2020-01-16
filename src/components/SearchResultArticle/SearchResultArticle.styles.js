export default ({ breakpoints, spacing, typography }) => ({
  header: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
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
      marginTop    : spacing(),
      marginBottom : spacing(),
    },
  },
  articleHeader: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
    },
    display: 'flex',
  },
  articleContainer: {
    [breakpoints.down('sm')]: {
      height      : 'auto',
      marginTop   : spacing(),
      marginBottom: spacing(),
    },
    marginTop   : spacing(2),
    marginBottom: spacing(2),
    display     : 'flex',
    height      : 145,
  },
  image: {
    [breakpoints.down('sm')]: {
      height     : 145,
      marginLeft : 'auto',
      marginRight: 'auto',
      marginTop  : spacing(2),
    },
    width       : 120,
    height      : 'auto',
    objectFit   : 'cover',
    borderRadius: 4,
  },
  contentContainer: {
    padding: spacing(2),
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
