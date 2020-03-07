
const styles = theme => ({
  navbar: {
    backgroundColor: '#eee',
    color: '#7b7b7b'
  },
  navBrand: {
    height: 28,
    display: 'inline-block',
    marginTop: 12,
    marginLeft: 7,
    marginRight: 25,
    verticalAlign: 'top',
    transition: 'background-color 0.5s ease'
  },
  logoutButtonLabel: {
    fontFamily: 'Noto Sans CJK TC',
    fontSize: 14,
    color: '#7B7B7B'
  },
  cssLabel: {
    fontSize: 15,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    }
  },
  logoutBox: {
    padding: '6px 12px 6px 0px',
    minWidth: 233,
    [theme.breakpoints.up('md')]: {
      '&>a': {
        padding: '0 !important'
      }
    }
  },
  idCard: {
    marginRight: 20,
    display: 'inline-block',
    zoom: 0.85
  },
  idCardText: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 9
  },
  idCardPhoto: {
    margin: 0,
    height: 40,
    width: 40,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  // bellow for NavButton
  navButton: {
    [theme.breakpoints.up('md')]: {
      fontSize: 12,
      padding: '8px 12px 10px',
      textAlign: 'center',
      width: 80,
      '&>a': {
        padding: '0 !important'
      }
    },
  },
  icon: {
    width: '100%',
    fontSize: 19,
    height: 24,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  iconSelected: {
    color: '#68BB66'
  },
  label: {
    lineHeight: '15px',
    transition: 'color 0.3s, font-size 0.3s'
  },
  labelSelected: {
    fontSize: 14,
    color: '#68BB66'
  }
})

export default styles
