export default ({ spacing, palette }) => ({
  root: {
    
  },
  select: {
    width       : 150,
    borderRadius: 4,
    boxShadow   : '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding     : '10px 16px',
  },
  flagIcon: {
    marginRight: spacing.unit,
  },
  dropDownIcon: {
    marginRight: 0,
    color      : palette.common.darkBlack,
  },
  selectText: {
    padding : 0,
    '& span': {
      fontSize  : 14,
      fontWeight: 'bold',
    },
  },
});
