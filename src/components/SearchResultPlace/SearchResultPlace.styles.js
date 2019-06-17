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
  placeResultsContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
    },
    '& $placeContainer:nth-child(3n+3)': {
      marginRight: 0,
    },
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
  },
  placeContainer: {
    [breakpoints.down('sm')]: {
      width       : '100%',
      marginRight : 0,
      marginTop   : spacing.unit,
      marginBottom: spacing.unit,
    },
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
    objectFit   : 'cover',
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
  noResultsText: {
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(22),
    },
  },
});
