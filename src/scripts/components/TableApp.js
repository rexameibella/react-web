import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";

import useStates from "../states";
import moment from "moment";
import configs from "../../../protected/configs/config";

import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const theme = createMuiTheme({
	overrides: {
		MuiSvgIcon: {
			root: {
				fontSize: '1.05rem'
			},
		},
		MuiTableCell: {
			root: {
				fontSize: '0.8rem'
			},
			paddingCheckbox: {
				width: '15px !important',
				padding: '6px 0px 6px 0px !important'
			},
			sizeSmall: {
				padding: '0px 12px 0px 0px'
			},
			head: {
				lineHeight: '1.2'
			}
		},
		MuiTablePagination: {
			selectIcon: {
				top: 4
			},
			toolbar: {
				height: '40px',
				minHeight: '40px'
			}
		},
		MuiOutlinedInput: {
			input : {
				padding: '2px 5px',
				fontSize: '0.75rem',
				minHeight: '20px'
			}
		},
		MuiMenuItem: {
			root: {
				minHeight: '0px',
				fontSize: '0.75rem'
			}
		},
		MuiSelect: {
			icon: {
				marginTop: '3px',
				marginRight: '3px'
			}
		},
		MuiInputBase: {
			input: {
				//font: '400 0.8rem Arial'
			}
		}
	},
});

function EnhancedTableHead(props) {
	const { config, leftActions, rightActions, classes, order, setSelected, orderBy, numSelected, rowCount, onRequestSort, headRows, dataName } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	const [state, actions] = useStates();

	function onFilterAction(event, row) {
	}

	function setDateReceived (row, date) {
		if(date === null) {
			actions.setState(dataName + row.id + 'Filter', null);
		} else {
			actions.setState(dataName + row.id + 'Filter', date.format('YYYY-MM-DD'));
		}

		actions.getData(config, true)
	}

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<TableHead>
				<TableRow>
					<TableCell key="noHead1" padding="checkbox">
					</TableCell>
					<TableCell key="checkboxHead1" padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount !== 0 && numSelected === rowCount ? true : false}
							inputProps={{ 'aria-label': 'select all desserts' }}
							disabled={configs.DisableSelectAllTable}
							style={{marginRight: leftActions.length > 0 ? '0px' : '10px'}}
							color="primary" 
							onChange={(event) => {
								if (event.target.checked) {
									let selected = []
									state[config.dataName].map(data => {
										selected.push(data[config.key]);
									})
									actions.setSelectedRecords(config.dataName, state[config.dataName]);
									setSelected(selected);
								} else {
									actions.setSelectedRecords(config.dataName, []);
									setSelected([]);
								}
							}}/>
					</TableCell>
					{leftActions.length > 0 ? <TableCell style={{width: '18px'}}> </TableCell> : null}
					{headRows.map((row, index) => (
						<TableCell
							key={row.id}
							align={row.numeric ? 'right' : 'left'}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={orderBy === row.id ? order : false}
							style={{fontWeight: 'bold', paddingLeft: '0px', width: (row.width ? row.width : 'auto'), textAlign: (row.centered ? 'center' : 'left')}}>
							{row.unSortable ? <span style={{color: '#333'}}>{row.label}</span>
								: <TableSortLabel
									active={orderBy === row.id || orderBy === row.sId}
									direction={order}
									onClick={createSortHandler(row.sId ? row.sId : row.id)}>
									<span style={orderBy === row.id || orderBy === row.sId ? {color: '#3367d6', fontWeight: 'bold'} : {color: '#333'}}>{row.label}</span>
									{orderBy === row.id || orderBy === row.sId ? (
										<span className={classes.visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</span>
									) : null}
								</TableSortLabel>}
						</TableCell>
					))}
					{rightActions.length > 0 ? <TableCell key="rightActions1"> </TableCell> : null}
				</TableRow>
				<TableRow>
					<TableCell key="noHead2" style={{textAlign: 'center'}}> </TableCell>
					<TableCell key="checkboxHead2" style={{textAlign: 'center'}}> </TableCell>
					{leftActions.length > 0 ? <TableCell style={{textAlign: 'center'}}> </TableCell> : null}
					{headRows.map((row, index) => (
						row.filter ? <TableCell key={'filter' + row.id} style={{paddingRight: '7px !important'}}>
							{row.filter.options ? <TextField
								select
								id="outlined-bare"
								style={{margin: '5px 0px 5px -4px', width: '100%'}}
								margin="normal"
								variant="outlined"
								value={state[dataName + row.id + 'Filter'] ? state[dataName + row.id + 'Filter'] : '##########'}
								onChange={(event) => {
									actions.handleInputChange(dataName + row.id + 'Filter', event);

									actions.getData(config, true);
								}}>
								<MenuItem style={{fontWeight: 'bold'}} key={'-'} value={'##########'}>
									All
								</MenuItem>
								{row.filter.options ? row.filter.options.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								)) : null}
							</TextField> : (row.filter.type === "DATE" ?
								<DatePicker
									autoOk
									clearable
									disableFuture
									style={{width: '100%'}}
									inputVariant="outlined"
									autoComplete={'off'}
									value={state[dataName + row.id + 'Filter'] ? state[dataName + row.id + 'Filter'] : null}
									format="DD/MM/YYYY"
									emptyLabel={'Choose Date'}
									onChange={date => {
										setDateReceived(row, date);
									}} /> : (row.filter.type === "DATE_RANGE" ?
									<TextField
										id="outlined-bare"
										style={{margin: '5px 0px 5px -4px', width: '100%', fontSize: '0.8rem'}}
										margin="normal"
										variant="outlined"
										inputProps={{
											readOnly: true
										}}
										autoComplete={'off'}
										value={state[dataName + row.id + 'Filter']}
										onClick={(event) => {
											let filterInitialDateRange = null;

											if(state[dataName + row.id + 'Filter'] && state[dataName + row.id + 'Filter'] !== '') {
												filterInitialDateRange = {
													startDate: moment(state[dataName + row.id + 'Filter'].split(' - ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
													endDate: moment(state[dataName + row.id + 'Filter'].split(' - ')[1], 'DD/MM/YYYY').format('YYYY-MM-DD')
												};
											}

											actions.setStateObject({
												isFilterDateRangeOpen: true,
												isClosingDateRangePicker: false,
												filterDateRangeDataKey: dataName + row.id + 'Filter',
												filterDateRangeDataKeyCallback: row.onSelected,
												filterInitialDateRange: filterInitialDateRange
											});
										}}
										placeholder='Choose Date Range' /> :
									<TextField
										id="outlined-bare"
										style={{margin: '5px 0px 5px -4px', width: '100%', fontSize: '0.8rem'}}
										margin="normal"
										variant="outlined"
										autoComplete={'off'}
										type={row.filter.type === 'NUMBER' ? 'number' : 'text'}
										onKeyDown={(event) => {
											if(event.keyCode === 13){
												actions.getData(config, true);
											}
										}}
										onChange={event => actions.setState(dataName + row.id + 'Filter', event.target.value)}
										value={state[dataName + row.id + 'Filter']}
										placeholder={row.filter.label} />))}
						</TableCell> : <TableCell key={'filter' + row.id} style={{borderTop: '1px solid #bbb', paddingRight: '7px !important'}}> </TableCell>
					))}
					{rightActions.length > 0 ? <TableCell key="rightActions2" padding="checkbox" style={{borderTop: '1px solid #bbb', textAlign: 'center'}}> </TableCell> : null}
				</TableRow>
			</TableHead>
			<Dialog
				open={state.isFilterDateRangeOpen}
				onClose={() => {
					actions.setState('isFilterDateRangeOpen', false);
				}}
				fullWidth={true}
				maxWidth={'md'}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">Select Date Range</DialogTitle>
				<DialogContent style={{padding: '0px 15px', height: 395}}>
					<DateRangePicker
						onChange={(ranges) => {
							const startDate = moment(ranges.selection.startDate);
							const endDate = moment(ranges.selection.endDate);

							actions.setState('filterDateRangeDaysCount', endDate.diff(startDate, 'days') + 1);

							actions.setStateObject({
								[state.filterDateRangeDataKey + 'StartSelection']: ranges.selection.startDate,
								[state.filterDateRangeDataKey + 'EndSelection']: ranges.selection.endDate,
								[state.filterDateRangeDataKey]: startDate.format('DD/MM/YYYY') + ' - ' + endDate.format('DD/MM/YYYY')
							});
						}}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						className={'PreviewArea'}
						ranges={[{
							startDate: state[state.filterDateRangeDataKey + 'StartSelection'] ? state[state.filterDateRangeDataKey + 'StartSelection'] : new Date(),
							endDate: state[state.filterDateRangeDataKey + 'EndSelection'] ? state[state.filterDateRangeDataKey + 'EndSelection'] : new Date(),
							key: 'selection',
						}]}
						months= {2}
						direction={'horizontal'}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={e => {
						actions.setStateObject({
							isFilterDateRangeOpen: false,
							isClosingDateRangePicker: true,
							[state.filterDateRangeDataKey]: '',
							[state.filterDateRangeDataKey + 'StartSelection']: new Date(),
							[state.filterDateRangeDataKey + 'EndSelection']: new Date(),
						});

						actions.getData(config, true);
					}} style={{marginLeft: '7px', marginBottom: '8px'}} size={'small'} variant={'outlined'}>
						Clear
					</Button>
					<div style={{flex: '1 0 0'}} />
					<Button onClick={e => {
						actions.setStateObject({
							isFilterDateRangeOpen: false,
							isClosingDateRangePicker: true
						});
					}} size={'small'} variant={'outlined'} style={{marginBottom: '8px'}}>
						Close
					</Button>
					<Button onClick={e => {
						if(state.filterDateRangeDaysCount && state.filterDateRangeDaysCount > 31) {
							actions.openAlert('Attention!', 'Maximum date range is 31 days.');
						} else {

							if(state.filterDateRangeDataKeyCallback) {
								state.filterDateRangeDataKeyCallback(state[state.filterDateRangeDataKey + 'StartSelection'], state[state.filterDateRangeDataKey + 'EndSelection']);
							}

							actions.setStateObject({
								isFilterDateRangeOpen: false,
								isClosingDateRangePicker: true
							});

							actions.getData(config, true);
						}
					}} style={{marginRight: '7px', marginBottom: '8px'}} size={'small'} color="primary" variant={'contained'} autoFocus>
						Do Filter
					</Button>
				</DialogActions>
			</Dialog>
		</MuiPickersUtilsProvider>
	);
}

EnhancedTableHead.propTypes = {
	config: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	headRows: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: '100%',
		maxHeight: '300px',
		//Checking Mozilla
		width : (typeof InstallTrigger !== 'undefined')? '-moz-max-content':'max-content'
	},
	tableWrapper: {
		overflowX: 'auto',
		overflowY: 'auto',
		scrollbarWidth: 'auto'
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	muiTableCell: {
		root: {
			fontSize: 0.8
		}
	}
}));

export function formatDate(value) {
	try {
		return moment(value.replace(/\.[0-9]{3}Z$/, '')).format("MM/DD/YYYY HH:mm:ss");
		
	} catch (error) {
		return '---';
	}
}

export function formatDateMoreReadable(value) {
	try {
		return (<div style={{textAlign: 'center'}}>{moment(value.replace(/\.[0-9]{3}Z$/, '')).format("DD MMM YYYY")}<br/>{moment(value.replace(/\.[0-9]{3}Z$/, '')).format("HH:mm")}</div>);
	} catch (error) {
		return '---';
	}
}

function useWindowDimensions() {

	const hasWindow = typeof window !== 'undefined';

	function getWindowDimensions() {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return {
			width,
			height,
		};
	}

	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		if (hasWindow) {
			window.addEventListener('resize', () => {
				setWindowDimensions(getWindowDimensions())
			});
			return () => window.removeEventListener('resize', () => {
				setWindowDimensions(getWindowDimensions())
			});
		}
	}, [hasWindow]);

	return windowDimensions;
}

export default function TableApp(config) {
	const [state, actions] = useStates();

	const classes = useStyles();
	const [order, setOrder] = React.useState(config.order);
	const [orderBy, setOrderBy] = React.useState(config.orderBy);
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(config.page ? config.page : (state[config.dataName + "Offset"] ? state[config.dataName + "Offset"] : 0));
	const [rowsPerPage, setRowsPerPage] = React.useState(config.rowsPerPage ? config.rowsPerPage : configs.rowPerPageTable[0]);

	const tableWrapper = useRef(null);

	if(tableWrapper && tableWrapper.current && (state[config.dataName] === undefined || state[config.dataName + 'IsLoading'])) {
		tableWrapper.current.scrollLeft = 0;
	}

	let dimension = useWindowDimensions();

	const defaultConfig = {
		columns: [],
		rowsPerPage: configs.rowPerPageTable[0],
		rowsPerPageOptions: configs.rowPerPageTable,
		page: 0,
		maxHeightReducer: 168,
		emptyCellPlaceholder: '---',
		cellRenderer: (row, column, data, value) => {
			return value
		},
		leftActions: [],
		rightActions: []
	};

	config = {...defaultConfig, ...config};

	if(!state[config.dataName + 'Loading']) {
		//actions.getData(config);
	}

	let visibleField = [];

	for(let i = 0; i < config.columns.length; i++) {
		visibleField[i] = config.columns[i].id;
	}

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);

		config.rowsPerPage = rowsPerPage;
		config.page = page;
		config.order = isDesc ? 'ASC' : 'DESC';
		config.orderBy = property;

		actions.getData(config, true);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
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

		const selectedData = [];

		let dataCount = 0;
		for(let i = 0; i < state[config.dataName].length; i++) {
			for (let j = 0; j < newSelected.length; j++) {
				if (state[config.dataName][i][config.key] === newSelected[j]) {
					selectedData[dataCount] = state[config.dataName][i];

					dataCount++;

					break;
				}
			}
		}

		actions.setSelectedRecords(config.dataName, selectedData);

		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);

		config.rowsPerPage = rowsPerPage;
		config.page = newPage;
		config.order = order;
		config.orderBy = orderBy;

		if(config.dataName === 'tripDetailOrders' && state['EDSFillPickup']) {
			const ids = filterSpaceMultiData(state['EDSFillPickup']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/pickup', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else if(config.dataName === 'outboundOrders' && state['EDSFillReceived']) {
			const ids = filterSpaceMultiData(state['EDSFillReceived']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/received', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else {
			actions.getData(config, true);
		}
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);

		config.rowsPerPage = event.target.value;
		config.order = order;
		config.orderBy = orderBy;

		if(config.dataName === 'tripDetailOrders' && state['EDSFillPickup']) {
			const ids = filterSpaceMultiData(state['EDSFillPickup']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/pickup', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else if(config.dataName === 'outboundOrders' && state['EDSFillReceived']) {
			const ids = filterSpaceMultiData(state['EDSFillReceived']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/received', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else {
			actions.getData(config, true);
		}
	}

	function replaceLinkValue(row, link) {
		Object.keys(row).forEach(function(key,index) {
			link = link.replace("::" + key + "::", row[key]);
		});

		return link;
	}

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows = state[config.dataName] !== undefined && state[config.dataName].length < 13 ? (state[config.dataName].length < 10 ? 13 : 10) - state[config.dataName].length : 0;

	if(state[config.dataName + 'ResetFilter']) {
		actions.setState(config.dataName + 'ResetFilter', false);

		let resetProperty = {};

		for(let i = 0; i < config.columns.length; i++) {
			let value = '';

			if(config.columns[i].filter && config.columns[i].filter.type && config.columns[i].filter.type === 'OPTIONS') {
				value = '##########';
			} else if(config.columns[i].filter && config.columns[i].filter.type && config.columns[i].filter.type === 'DATE') {
				value = null;
			}

			if(config.columns[i].filter && config.columns[i].filter.type && config.columns[i].filter.type === 'DATE_RANGE') {
				resetProperty[state.filterDateRangeDataKey + 'StartSelection'] = new Date();
				resetProperty[state.filterDateRangeDataKey + 'EndSelection'] = new Date();
			}

			resetProperty['ordersAllMultipleEDS'] = '';
			resetProperty['AWBMultipleFilterFilled'] = false;

			resetProperty[config.dataName + config.columns[i].id + 'Filter'] = value;
		}

		actions.setStateObject(resetProperty);

		setSelected([]);
		setPage(0);
		setRowsPerPage(config.rowsPerPage);

		actions.getData(config, true);
	}

	if(state[config.dataName + 'ResetCheckBox']) {
		actions.setState(config.dataName + 'ResetCheckBox', false);

		setSelected([]);
	}

	if(state[config.dataName + 'Refresh']) {
		actions.setState(config.dataName + 'Refresh', false);

		if(config.dataName === 'tripDetailOrders' && state['EDSFillPickup']) {
			const ids = filterSpaceMultiData(state['EDSFillPickup']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/pickup', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else if(config.dataName === 'outboundOrders' && state['EDSFillReceived']) {
			const ids = filterSpaceMultiData(state['EDSFillReceived']);

			if(ids.length <= 1000) {
				actions.getDataPOST('order/received', config, {
					orderIdentifiers: ids,
				});
			} else {
				actions.getData(config, true);
			}
		} else {
			actions.getData(config, true);
		}

		setPage(0);
		setRowsPerPage(config.rowsPerPage);
	}

	function filterSpaceMultiData(data) {
		let result = [];

		data = data.split('\n');

		for (let i in data) {
			data[i] = data[i].replace(/\s/g, "");
			if(data[i] || 0 !== data[i].length) {
				result.push(data[i]);
			}
		}

		return result;
	};
	
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<div ref={tableWrapper} className={classes.tableWrapper} style={{width: (typeof InstallTrigger !== 'undefined')? '100%':'100%', maxHeight: (dimension ? dimension.height - config.maxHeightReducer : 'auto')}}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={'small'}>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							setSelected={setSelected}
							orderBy={orderBy}
							config={config}
							dataName={config.dataName}
							leftActions={config.leftActions}
							actionPresentation={config.actionPresentation ? config.actionPresentation : 'IMPLICIT'}
							rightActions={config.rightActions}
							onRequestSort={handleRequestSort}
							rowCount={state[config.dataName] === undefined ? 0 : state[config.dataName].length}
							headRows={config.columns}/>
						<TableBody>
							{state[config.dataName] === undefined || state[config.dataName + 'IsLoading'] ? <TableRow style={{ height: 31 }}>
								<TableCell colSpan={config.columns.length + 4}>
									<CircularProgress style={{width: '16px', height: '16px', margin: '6px auto'}} />
								</TableCell>
							</TableRow> : (!state[config.dataName + 'IsLoading'] && parseInt(state[config.dataName + "Count"]) === 0 ? <TableCell key={'DataEmpty'} style={{fontSize: '0.85rem', color: '#AAAAAA'}} colspan={config.columns.length + 4} scope="row"><div style={{padding: '5px 15px 5px 0px'}}>There is no data found.</div></TableCell> : state[config.dataName]
								.map((row, index) => {
									const columns = [];
									let columnIndex = 0;

									visibleField.map((visibleFieldName, index) => {
										const content = config.cellRenderer(index, columnIndex, row, row[visibleFieldName]);

										columns.push(<TableCell key={visibleFieldName + index} style={{maxWidth: '200px', fontWeight: 0.8, padding: '6px 15px 6px 0px'}} id={labelId} scope="row">
											<span title={typeof content === 'object' ? '' : content}>{row[visibleFieldName] === undefined || row[visibleFieldName] === null || row[visibleFieldName] === '' ? config.emptyCellPlaceholder : content}</span>
										</TableCell>);

										columnIndex++;
									});

									const isItemSelected = isSelected(row[config.key]);
									const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row[config.key]}
											selected={isItemSelected}>
											<TableCell padding="checkbox" style={{fontWeight: 0.8, padding: '0px', textAlign: 'center'}} key={'number'} component="th" id={labelId} scope="row">
												{((page * rowsPerPage) + index + 1) + '. '}
											</TableCell>
											<TableCell padding="checkbox" style={{padding: '0px'}} onClick={event => handleClick(event, row[config.key])}>
												<Checkbox
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
													color="primary" />
											</TableCell>
											{config.leftActions.length > 0 ? <TableCell padding="checkbox" style={{textAlign: 'center', padding: '3px 5px 3px 0px !important'}}>
												{config.actionPresentation === 'EXPLICIT' ? 
													<div style={{marginLeft: '6px', marginRight: '6px'}}>
														{config.leftActions.map((action, indexAction) => (action.link ? <Link style={{textDecoration: 'none', color: '#333'}} key={"action" + index + indexAction} to={replaceLinkValue(row, action.link)}>
																	<Button key={"listAction" + index + indexAction} onClick={event => {
																		if(action.handler) {
																			action.handler(state[config.dataName][indexAction], event);
																		}
																	}}
																	style={{fontSize: '0.6rem', padding: '2px 2px',  minWidth: '20px', borderRadius: '1px', marginRight: '3px', marginBottom: '5px'}} variant="contained">
																		{action.name}
																	</Button></Link> :
																<Button key={"listAction" + index + indexAction} onClick={event => {
																	action.handler(state[config.dataName][index], event)
																}} style={{fontSize: '0.6rem', padding: '2px 2px',  minWidth: '20px', borderRadius: '1px', marginRight: '3px', marginBottom: '5px'}} variant="contained">
																	{action.name}
																</Button>
														))}
													</div> :
													<PopupState variant="popper" popupId="demo-popup-popper">
														{popupState => (
															<div style={{width: '20px', marginLeft: '6px', marginRight: '6px'}}>
																<Button style={{fontSize: '0.5rem', padding: '2px 2px', width: '20px', minWidth: '20px', borderRadius: '1px'}} variant="contained" {...bindToggle(popupState)}>
																	<MoreVertIcon />
																</Button>
																<Popper {...bindPopper(popupState)} transition>
																	{({TransitionProps, placement}) => (
																		<Grow {...TransitionProps} style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
																			<Paper>
																				<MenuList style={{paddingTop: '1px', paddingBottom: '1px'}}>
																					{config.leftActions.map((action, indexAction) => (action.link ? <Link style={{textDecoration: 'none', color: '#333'}} key={"action" + index + indexAction} to={replaceLinkValue(row, action.link)}>
																								<MenuItem key={"listAction" + index + indexAction} onClick={event => {
																									if(action.handler) {
																										action.handler(state[config.dataName][indexAction], event);
																									}
																									popupState.close();
																								}}
																													style={{fontSize: '0.75rem', padding: '5px 15px', minHeight: '20px'}}>
																									{action.name}
																								</MenuItem></Link> :
																							<MenuItem key={"listAction" + index + indexAction} onClick={event => {
																								popupState.close();
																								action.handler(state[config.dataName][index], event)
																							}} style={{fontSize: '0.75rem', padding: '5px 15px', minHeight: '20px'}}>
																								{action.name}
																							</MenuItem>
																					))}
																				</MenuList>
																			</Paper>
																		</Grow>
																	)}
																</Popper>
															</div>
														)}
													</PopupState>
												}
											</TableCell> : null}
											{columns}
											{config.rightActions.length > 0 ? <TableCell style={{padding: '5px 7px 4px 10px', width: '20px'}}></TableCell> : null}
											{config.rightActions.length > 0 ? <TableCell style={{backgroundColor: '#FFFFFF', borderBottom: 'none', textAlign: 'right', marginTop: '2px', padding: '3px 7px 4px 7px', width: '35px', position: 'absolute', right: '25px'}}>
												<PopupState variant="popper" popupId="demo-popup-popper">
													{popupState => (
														<div>
															<Button style={{fontSize: '0.5rem', padding: '2px 2px', width: '20px', minWidth: '20px', borderRadius: '1px'}} variant="contained" {...bindToggle(popupState)}>
																<MoreVertIcon />
															</Button>
															<Popper {...bindPopper(popupState)} transition>
																{({TransitionProps, placement}) => (
																	<Grow {...TransitionProps} style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
																		<Paper>
																			<MenuList style={{paddingTop: '1px', paddingBottom: '1px'}}>
																				{config.rightActions.map((action, indexAction) => (action.link ? <Link style={{textDecoration: 'none', color: '#333'}} key={"action" + indexAction} to={replaceLinkValue(row, action.link)}>
																							<MenuItem key={"listAction" + indexAction} onClick={event => {
																								if(action.handler) {
																									action.handler(state[config.dataName][indexAction], event);
																								}

																								popupState.close();
																							}} style={{fontSize: '0.75rem', padding: '5px 15px', minHeight: '20px'}}>
																								{action.name}
																							</MenuItem></Link> :
																						<MenuItem key={"listAction" + indexAction} onClick={event => {
																							popupState.close();
																							action.handler(state[config.dataName][index], event)
																						}} style={{fontSize: '0.75rem', padding: '5px 15px', minHeight: '20px'}}>
																							{action.name}
																						</MenuItem>
																				))}
																			</MenuList>
																		</Paper>
																	</Grow>
																)}
															</Popper>
														</div>
													)}
												</PopupState>
											</TableCell> : null}
										</TableRow>
									);
								}))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 31 * emptyRows }}>
									<TableCell colSpan={config.columns.length + 2} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination style={{width: (typeof InstallTrigger !== 'undefined')? '100%':'100%'}}
					// rowsPerPageOptions={[config.rowsPerPage, config.rowsPerPage * 2, config.rowsPerPage * 3, config.rowsPerPage * 4, config.rowsPerPage * 5]}
					rowsPerPageOptions={config.rowsPerPageOption ? config.rowsPerPageOption : configs.rowPerPageTable}
					component="div"
					count={state[config.dataName + "Count"] === undefined ? 0 : state[config.dataName + "Count"]}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'previous page',
					}}
					nextIconButtonProps={{
						'aria-label': 'next page',
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</ThemeProvider>
	);
}
