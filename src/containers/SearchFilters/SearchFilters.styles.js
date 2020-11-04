export default ({ breakpoints, spacing, typography, palette, transitions }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom: spacing(3),
    },
  },
  header: {
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(20),
    },
    fontSize  : typography.pxToRem(24),
    fontWeight: 'bold',
  },
  button: {
    marginBottom : spacing(2),
    width        : '100%',
    height       : 36,
    fontSize     : typography.pxToRem(14),
    background   : `linear-gradient(to right, ${palette.primary.light}, ${palette.primary.dark})`,
    color        : palette.common.white,
    textTransform: 'none',
  },
  buttonIcon: {
    fontSize   : typography.pxToRem(24),
    marginRight: spacing(1.5),
  },
  drawer: {
    width         : '75vw',
    height        : '100%',
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    padding       : `${spacing(2.5)}px ${spacing(2)}px`,
  },
  drawerHeader: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    marginBottom  : spacing(1.5),
  },
  close: {
    '& svg': {
      color: palette.primary.main,
    },
    padding: 0,
  },
  expand: {
    '&:hover': {
      cursor: 'pointer',
    },
    transform : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expanded: {
    transform: 'rotate(180deg)',
  },
});
