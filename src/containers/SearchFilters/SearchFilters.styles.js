export default ({ breakpoints, spacing, typography, palette }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom: spacing.unit * 3,
    },
  },
  header: {
    fontSize    : typography.pxToRem(20),
    fontWeight  : 'bold',
    marginBottom: spacing.unit * 1.5,
  },
  categoryLabel: {
    paddingLeft: 0,
  },
  filterHeaderItem: {
    marginTop  : spacing.unit * 2,
    paddingLeft: 0,
  },
  filterCheckbox: {
    paddingRight: 0,
  },
  filterHeaderText: {
    fontWeight: 800,
  },
  filter: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderRadius  : 4,
    boxShadow     : '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding       : `${spacing.unit * 1.25}px ${spacing.unit * 2}px`,
    marginBottom  : spacing.unit,
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
    marginRight: spacing.unit,
  },
  icon: {
    fontSize: typography.pxToRem(18),
    color   : palette.secondary.contrastText,
  },
  label: {
    padding     : 0,
    paddingRight: spacing.unit * 0.5,
    '& span': {
      fontSize  : typography.pxToRem(14),
      fontWeight: 'bold',
    },
  },
  resultsNumber: { 
    fontSize: typography.pxToRem(12),
    color   : palette.common.darkGrey,
  },
});
