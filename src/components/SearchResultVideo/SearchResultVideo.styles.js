export default ({ breakpoints, palette, spacing }) => ({
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
      display      : 'flex',
      flexDirection: 'column',
      height       : 'auto',
      marginTop    : spacing.unit,
      marginBottom : spacing.unit,
    },
    marginTop   : spacing.unit * 2,
    marginBottom: spacing.unit * 2,
    display     : 'flex',
    height      : 110,
  },
  image: {
    [breakpoints.down('sm')]: {
      width: '100%',
      height: 180,
    },
    width       : 175,
    height      : 'auto',
    borderRadius: '4px 0px 0px 4px'
  },
  playArrow: {
    [breakpoints.down('sm')]: {
      transform: 'translate(120%, 40%)',
      fontSize: '600%',
    },
    position : 'absolute',
    transform: 'translate(80%, 35%)',
    fontSize : '400%',
    color    : palette.common.white,
  },
  contentContainer: {
    padding: spacing.unit * 2,
    wordBreak: 'break-all',
  },
  links: {
    marginBottom: 0,
  },
});
