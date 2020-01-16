export default ({ breakpoints, spacing, typography, palette }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom: spacing(3),
    },
  },
  header: {
    fontSize    : typography.pxToRem(24),
    fontWeight  : 'bold',
    marginBottom: spacing(1.5),
  },
  filter: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderRadius  : 4,
    boxShadow     : '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding       : `${spacing(1.25)}px ${spacing(2)}px`,
    marginBottom  : spacing(),
  },
  selected: {
    background: `linear-gradient(to right, ${palette.common.selectedLight}, ${palette.common.selectedDark})`,
    '& span': {
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
    '& span': {
      fontSize  : typography.pxToRem(14),
      fontWeight: 'bold',
    },
  },
  resultsNumber: {
    fontSize: typography.pxToRem(12),
    color   : palette.common.darkGrey,
  },
  type: {
    fontSize    : typography.pxToRem(16),
    marginBottom: spacing(1.25),
  },
  button: {
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
    padding       : `${spacing(2.5)}px ${spacing(2)}px`
  },
  drawerHeader: {
    display       : 'flex',
    justifyContent: 'space-between',
  },
});
