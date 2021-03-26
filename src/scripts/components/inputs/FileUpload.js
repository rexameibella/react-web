import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
	overrides: {
	}
});

export const FileUpload = (props) => {
	const [state, actions] = useStates();

	const handleChange = e =>{
		e.preventDefault();

		let file = e.target.files[0];

		actions.setStateObject({
			[props.dataName]: file
		});
	};

	useEffect(() => {
		// set UI initialization state (loading or not), edit id and reset form values
		actions.setStateObject({
			[props.dataName]: null
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<form>
					<input style={{marginBottom: '5px'}} type="file" onChange={e => handleChange(e)} />
				</form>
			</div>
		</ThemeProvider>
	);
};

export default FileUpload;
