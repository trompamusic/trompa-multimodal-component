export default ({ spacing }) => ({
  header: {
    display       : 'flex',
    justifyContent: 'space-between',
    minHeight     : 32,
  },
  productResultsContainer: {
    '& $productContainer:nth-child(3n+3)': {
      marginRight: 0,
    },
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
  },
  productContainer: {
    marginTop    : spacing.unit * 2,
    marginRight  : spacing.unit * 2,
    marginBottom : spacing.unit * 2,
    display      : 'flex',
    flexDirection: 'column',
    width        : '33%',
  },
  image: {
    width       : 'auto',
    height      : 140,
    borderRadius: '4px 4px 0px 0px'
  },
  contentContainer: {
    padding  : spacing.unit * 2,
    wordBreak: 'break-all',
  },
  links: {
    marginBottom: 0,
  },
});
