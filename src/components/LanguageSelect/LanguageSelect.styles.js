export default ({ spacing, palette, typography, breakpoints }) => ({
  select: {
    [breakpoints.down('sm')]: {
      width: 80,
    },
    width       : 175,
    borderRadius: 4,
    boxShadow   : '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding     : `${spacing(0.5)}px ${spacing(2)}px`,
  },
  flagIcon: {
    marginRight: spacing(),
    minWidth   : typography.pxToRem(18),
  },
  dropDownIcon: {
    marginRight: 0,
    minWidth   : typography.pxToRem(18),
    color      : palette.text.primary,
  },
  selectText: {
    [breakpoints.down('sm')]: {
      width: 80,
    },
    padding : 0,
    color   : palette.text.primary,
    width   : 175,
    '& span': {
      fontSize  : 14,
      fontWeight: 'bold',
    },
  },
});
