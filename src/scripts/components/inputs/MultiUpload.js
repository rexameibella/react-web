import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
	overrides: {
	}
});

export const MultiUpload = (props) => {
	const [state, actions] = useStates();

	const handleChange = e =>{
		e.preventDefault();

		actions.setStateObject({
			[props.dataName]: e.target.files
		});
	};

	useEffect(() => {
		// set UI initialization state (loading or not), edit id and reset form values
		actions.setStateObject({
			[props.dataName]: []
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<form>
					<input style={{marginBottom: '5px'}} type="file" onChange={e => handleChange(e)} multiple />
				</form>
			</div>
		</ThemeProvider>
	);
};

export default MultiUpload;
