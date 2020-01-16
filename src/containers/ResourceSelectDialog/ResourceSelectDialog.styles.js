export default ({ palette, spacing }) => ({
  paper: {
    width    : '95vw',
    height   : '95vh',
    margin   : 0,
    maxHeight: 'none',
    maxWidth : '100%',
  },
  header: {
    borderBottom: `1px solid ${palette.common.faintBlack}`,
    padding     : spacing(6),
  },
  inputWrapper: {
    display     : 'flex',
    border      : `1px solid ${palette.common.faintBlack}`,
    borderRadius: 24,
    paddingLeft : 24,
    marginBottom: spacing(2),
  },
  inputBase: {
    flex: 1,
  },
  inputAdornment: {

  },
  content: {
    padding: `0 0 ${spacing(2)}px 0`,
  },
  result: {
    '&:not($resultSelected)': {
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      cursor: 'pointer',
    },
    padding: `${spacing(3)}px ${spacing(6)}px`,
    cursor : 'pointer',
  },
  resultSelected: {
    backgroundColor: '#e3e3e3',
  },
});
