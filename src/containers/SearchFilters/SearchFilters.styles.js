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
  filter: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderRadius  : 4,
    boxShadow     : '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding       : `${spacing()}px ${spacing(2)}px`,
    marginBottom  : spacing(),
  },
  selected: {
    background: `linear-gradient(to right, ${palette.common.selectedLight}, ${palette.common.selectedDark})`,
    '& span'  : {
      color: palette.common.white,
    },
    '& svg': {
      color: palette.common.white,
    },
    '& p': {
      color: palette.common.darkWhite,
    },
  },
  filterContainer: {
    display   : 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    minWidth   : typography.pxToRem(18),
    marginRight: spacing(),
  },
  icon: {
    fontSize: typography.pxToRem(18),
    color   : palette.secondary.contrastText,
  },
  label: {
    padding     : 0,
    paddingRight: spacing(0.5),
    '& span'    : {
      fontSize  : typography.pxToRem(14),
      fontWeight: 'bold',
    },
  },
  resultsNumber: {
    fontSize: typography.pxToRem(12),
    color   : palette.common.darkGrey,
  },
  typeHeader: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
  },
  type: {
    fontSize    : typography.pxToRem(16),
    marginBottom: spacing(),
  },
  button: {
    marginBottom : spacing(2),
    width        : '100%',
    height       : 36,
    fontSize     : typography.pxToRem(14),
    background   : `linear-gradient(to right, ${palette.common.selectedLight}, ${palette.common.selectedDark})`,
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
