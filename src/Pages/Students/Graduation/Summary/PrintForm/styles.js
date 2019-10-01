
const styles = theme => ({
  table: {
    width: '100%',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Times New Roman, BiauKai, DFKai-SB, MingLiU',
    fontSize: 12,
    borderSpacing: 0,
    borderCollapse: 'collapse',
    '& tr': {
      height: 15
    },
    '& td': {
      border: '1px solid black',
      borderSpacing: 0,
      borderCollapse: 'collapse'
    }
  },
  program: {
    height: '1.5em',
    fontSize: 22,
    fontWeight: 'bold',
    border: '0 !important'
  },
  infoRow: {
    height: '2.5em',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    border: '0 !important'
  },
  sid: {
    marginRight: 20
  },
  title1: {
    height: '2em',
    textAlign: 'left',
    backgroundColor: '#ccffcc',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  title2: {
    height: '2em',
    textAlign: 'left',
    backgroundColor: '#ffff99',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  left: {
    textAlign: 'left',
    padding: '0 3px'
  },
  english: {
    textAlign: 'left',
    padding: '2px 5px',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
    backgroundColor: '#ffcc99'
  },
  red: {
    color: 'red'
  },
  col0: { width: '7%' },
  col1: { width: '34%' },
  col2: { width: '4%' },
  col3: { width: '3%' },
  col4: { width: '3%' },
  col5: { width: '3%' },
  col6: { width: '3%' },
  col7: { width: '3%' },
  col8: { width: '3%' },
  col9: { width: '3%' },
  col10: { width: '3%' },
  col11: { width: '3%' },
  col12: { width: '3%' },
  col13: { width: '3%' },
  col14: { width: '4%' },
  col15: { width: '4%' },
  col16: { width: '14%' }
})

export default styles
