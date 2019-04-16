export default ({ spacing, palette }) => ({
  toolbar: {
    paddingTop    : spacing.unit,
    display       : 'flex',
    justifyContent: 'space-between',
  },
  navLink: {
    '&:hover': {
      textDecoration: 'none',
    },
    color: palette.common.white,
  },
});
