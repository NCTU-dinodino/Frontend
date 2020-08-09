import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux'

import {
  setCPEStatus
} from '../../../../Redux/Assistants/Actions/Project/Status'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: '學號' },
  { id: 'calories', numeric: false, disablePadding: true, label: '姓名' },
];

class CPETableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    <span style={{ fontSize: '20px' }}>{row.label}</span>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

CPETableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto'
  },
  tooltip: {
    fontSize: '15px'
  }
});

let CPETableToolbar = props => {
  const { selected, classes, Status } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      <div className={classes.title}>
        {selected.length > 0 ? (
          <Typography color="inherit" variant="title">
            已選取 {selected.length} 個
          </Typography>
        ) : ''}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {selected.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          { Status.cpeStatus !== "1" &&
            <Tooltip title="通過" placement="top" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={ () => {
                this.props.setCPEStatus({
                  people: Status.people
                    .filter( person => selected.indexOf(person.id) !== -1)
                    .map( person => {
                      return {
                        "semester": Status.year + '-' + Status.semester,
                        "student_id": person.id,
                        "new_cpe_status": "1"
                      }
                    }),
                  refresh: {
                    "semester": Status.year + '-' + Status.semester,
                    "cpe_status": Status.cpeStatus
                  }
                })
              }}>
                <DoneIcon style = {{ color: 'green' }} />
              </IconButton>
            </Tooltip>
          }
          { Status.cpeStatus !== "2" &&
            <Tooltip title="不通過" placement="top" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={ () => {
                this.props.setCPEStatus({
                  people: Status.people
                    .filter( person => selected.indexOf(person.id) !== -1)
                    .map( person => {
                      return {
                        "semester": Status.year + '-' + Status.semester,
                        "student_id": person.id,
                        "new_cpe_status": "2"
                      }
                    }),
                  refresh: {
                    "semester": Status.year + '-' + Status.semester,
                    "cpe_status": Status.cpeStatus
                  }
                })
              }}>
                <ClearIcon style = {{ color: 'red' }} />
              </IconButton>
            </Tooltip>
          }
          </div>
        ) : ''}
      </div>
    </Toolbar>
  );
};

CPETableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
})

const mapDispatchToProps = (dispatch) => ({
  setCPEStatus: (payload) => dispatch(setCPEStatus(payload))
})

CPETableToolbar = connect(mapStateToProps, mapDispatchToProps)(withStyles(toolbarStyles)(CPETableToolbar));

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 600,
    minHeight: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  caption: {
    fontSize: "10px"
  },
});

class CPETable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 8,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.Status.people.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, Status } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Status.people.length - page * rowsPerPage);

    return (
      <React.Fragment>
        <CPETableToolbar selected={selected} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CPETableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={Status.people.length}
            />
            <TableBody>
              {Status.people
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <span style={{ fontSize: '18px'}}>{n.id}</span>
                      </TableCell>
                      <TableCell padding="none">
                        <span style={{ fontSize: '18px'}}>{n.name}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={Status.people.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[]}
          classes={{
            toolbar: classes.toolbar,
            caption: classes.caption
          }}
        />
      </React.Fragment>
    );
  }
}

CPETable.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CPETable))