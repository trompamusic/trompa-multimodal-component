export default ({ palette, spacing }) => ({
  root: {
    boxSizing: 'border-box',
  },
  textField: {
    width: '100%',
  },
  searchIcon: {
    color: palette.secondary.contrastText,
  },
  tagsContainer: {
    display: 'flex',
    '& > *': {
      margin: `0px ${spacing(0.5)}px`,
    },
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `linear-gradient: to right, ${palette.primary.main}, ${palette.primary.dark}`,
    },
  },
  cssFocused    : {},
  notchedOutline: {},
});
