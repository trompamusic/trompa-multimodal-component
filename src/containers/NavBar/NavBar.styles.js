export default ({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.common.white,
  },
  toolbar: {
    paddingTop   : spacing.unit,
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'flex-start',
  },
  navLink: {
    '&:hover': {
      textDecoration: 'none',
    },
    color: palette.common.white,
  },
  logo: {
    height   : 29,
    width    : 'auto',
    marginTop: 10,
  },
  headerContainer: {
    display       : 'flex',
    width         : '100%',
    alignItems    : 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    justifyContent: 'center',
    width         : '100%',
    padding       : `${spacing.unit}px 0px ${spacing.unit * 2}px 0px`,
  },
});
