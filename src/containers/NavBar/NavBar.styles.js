export default ({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.common.white,
  },
  toolbar: {
    paddingTop   : spacing(),
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
    padding       : `${spacing()}px 0px ${spacing(2)}px 0px`,
  },
});
