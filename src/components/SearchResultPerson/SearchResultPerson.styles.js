export default ({ breakpoints, spacing, typography }) => ({
  personContainer: {
    marginTop: spacing.unit * 2, 
    marginBottom: spacing.unit * 2, 
    padding: spacing.unit * 2,
  },
  personHeader: {
    display: 'flex',
  },
  image: {
    height   : 50,
    width    : 50,
    objectFit: 'cover',
  },
  header: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
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
  noResultsText: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
  },
});
