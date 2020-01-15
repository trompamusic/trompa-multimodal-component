export default ({ breakpoints, palette, spacing, typography }) => ({
  header: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
    },
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  videoResultsContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
    },
  },
  videoContainer: {
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      width        : 328,
      height       : 400,
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
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
    borderRadius: '4px 0px 0px 4px'
  },
  name: {
    borderBottom: 0,
  },
  playArrow: {
    [breakpoints.down('sm')]: {
      transform: 'translate(120%, 40%)',
      fontSize : '600%',
    },
    position : 'absolute',
    transform: 'translate(100%, 40%)',
    fontSize : '400%',
    color    : palette.common.white,
  },
  contentContainer: {
    padding  : spacing.unit * 2,
    wordBreak: 'break-all',
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
