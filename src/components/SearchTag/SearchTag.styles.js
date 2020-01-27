export default ({ palette, spacing }) => ({
  root: {
    display     : 'flex',
    alignItems  : 'center',
    background  : `linear-gradient(to right, ${palette.primary.transparentMain}, ${palette.primary.transparentDark})`,
    borderRadius: 4,
    padding     : '4px 12px',
  },
  term: {
    fontSize   : 16,
    fontWeight : 'bold',
    marginRight: spacing(1.5),
  },
  icon: {
    height: 18,
    width : 18,
    color : palette.primary.main,
    cursor: 'pointer',
  },
});
