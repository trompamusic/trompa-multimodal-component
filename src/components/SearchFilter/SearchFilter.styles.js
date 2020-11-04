export default ({ spacing, typography, palette }) => ({
  root: {
    marginBottom: spacing(2),
  },
  type: {
    fontWeight: typography.fontWeightBold,
  },
  formControl: {
    whiteSpace: 'nowrap',
    overflow  : 'hidden',
    maxWidth  : '100%',
  },
  formControlLabel: {
    fontSize  : typography.pxToRem(12),
    fontWeight: typography.fontWeightLight,
  },
  filterTextField: {
    marginBottom: 8,
  },
  filterInput: {
    padding : 4,
    fontSize: typography.pxToRem(12),
  },
  filterInputAdornedEnd: {
    paddingRight: 4,
  },
  checkbox: {
    paddingTop   : 2,
    paddingBottom: 2,
  },
});
