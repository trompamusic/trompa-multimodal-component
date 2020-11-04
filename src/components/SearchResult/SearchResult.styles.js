import { fade } from '@material-ui/core';

export default ({ spacing, typography, palette, breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginBottom  : spacing(),
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '&:hover': {
      backgroundColor: fade(palette.common.black, 0.04),
    },
    display      : 'flex',
    flexDirection: 'column',
    width        : '100%',
    maxWidth     : '100%',
    cursor       : 'pointer',
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
      width       : '100%',
      borderRadius: '4px 4px 0px 0px',
    },
    '& $info': {
      flexDirection: 'column',
    },
  },
  header: {
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
  resultsCount: {
    fontSize  : typography.pxToRem(14),
    color     : fade(palette.common.black, 0.6),
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
    borderRadius : '4px 0px 0px 4px',
    minHeight    : 75,
    height       : 'auto',
    width        : '100%',
    display      : 'flex',
    flexDirection: 'column',
  },
  typeIcon: {
    color   : fade(palette.common.black, 0.7),
    fontSize: typography.pxToRem(24),
  },
  typeText: {
    color   : fade(palette.common.black, 0.7),
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
    color      : fade(palette.common.black, 0.7),
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
    color     : palette.text.primary,
  },
  source: {
    fontSize: typography.pxToRem(16),
  },
  heading: {
    fontSize  : typography.pxToRem(16),
    fontWeight: 'bold',
  },
  title: {
    fontSize  : typography.pxToRem(20),
    fontWeight: 'bold',
  },
});
