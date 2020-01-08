export default ({ palette, spacing }) => ({
  root: {
    boxSizing   : 'border-box',
  },
  textField: {
    width: '100%',
    borderColor: 'green',
  },
  searchIcon: {
    color: `palette.secondary.contrastText`,
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `linear-gradient: to right, ${palette.primary.main}, ${palette.primary.dark}`,
    },
  },
  cssFocused: {},
  notchedOutline: {},
});
