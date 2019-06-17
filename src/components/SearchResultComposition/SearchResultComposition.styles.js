export default ({ breakpoints, spacing, typography }) => ({
  header: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  compositionContainer: {
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      width        : 328,
      height       : 300,
    },
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 112.50,
  },
  image: {
    [breakpoints.down('sm')]: {
      width : 328,
      height: 184.50,
      borderRadius: '4px 4px 0px 0px',
    },
    width       : 200,
    height      : 112.50,
    objectFit   : 'cover',
    borderRadius: '4px 0px 0px 4px',
  },
  contentContainer: {
    padding: spacing.unit * 2,
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
