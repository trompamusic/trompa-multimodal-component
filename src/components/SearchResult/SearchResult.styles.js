export default ({ spacing, typography, palette, breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom  : spacing(),
      '&:last-child': {
        marginBottom: 0,
      },
    },
    display       : 'flex',
    flexDirection : 'column',
    width         : '100%',
    maxWidth      : '100%',
    marginRight   : spacing(),
    '&:last-child': {
      marginRight: 0,
    },
  },
  variantDefault: {
    flexDirection: 'row',
    '& $type'    : {
      width: 75,
    },
  },
  variantCard: {
    flexDirection: 'column',
    '& $type'    : {
      width: '100%',
    },
  },
  header: {
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
  resultsCount: {
    fontSize  : typography.pxToRem(14),
    color     : palette.common.darkGrey,
    marginLeft: spacing(0.5),
  },
  results: {
    [breakpoints.down('sm')]: {
      marginTop    : spacing(),
      flexDirection: 'column',
    },
    display     : 'flex',
    marginTop   : spacing(1.5),
    marginBottom: spacing(),
  },
  type: {
    borderRadius : '4px 4px 0px 0px',
    minHeight    : 75,
    height       : 'auto',
    width        : '100%',
    display      : 'flex',
    flexDirection: 'column',
  },
  typeIcon: {
    color   : palette.common.darkBlack,
    fontSize: typography.pxToRem(24),
  },
  typeText: {
    color   : palette.common.darkBlack,
    fontSize: typography.pxToRem(12),
  },
  infoContainer: {
    [breakpoints.down('sm')]: {
      display      : 'flex',
      flexDirection: 'column',
    },
    width  : '100%',
    padding: `${spacing(2)}px ${spacing(2)}px ${spacing(1.5)}px ${spacing(2)}px`,
  },
  info: {
    display      : 'flex',
    flexDirection: 'row',
  },
  infoMeta: {
    flex: 1,
  },
  sourceIcon: {
    color      : palette.common.darkBlack,
    fontSize   : typography.pxToRem(18),
    marginRight: spacing(0.5),
  },
  resultSource: {
    [breakpoints.down('sm')]: {
      marginTop: spacing(2),
    },
    display   : 'flex',
    alignItems: 'center',
    alignSelf : 'flex-start',
  },
  source: {
    fontSize: typography.pxToRem(16),
  },
  resultRole: {
    fontSize  : typography.pxToRem(16),
    fontWeight: 'bold',
  },
  resultName: {
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
  button: {
    fontSize     : typography.pxToRem(14),
    textTransform: 'none',
    color        : palette.common.blue,
    padding      : `${spacing()}px ${spacing()}px ${spacing()}px ${spacing(2)}px`,
  },
  buttonIcon: {
    fontSize  : typography.pxToRem(18),
    marginLeft: spacing(0.5),
  },
});
