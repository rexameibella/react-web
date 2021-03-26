import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ThemeProvider} from '@material-ui/styles';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme({
	overrides: {
	}
});

export const Photo = (props) => {
	const [state, actions] = useStates();

	const handleImageChange = e =>{
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			actions.setStateObject({
				[props.dataName]: file,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(file)
	};

	useEffect(() => {
		// set UI initialization state (loading or not), edit id and reset form values
		actions.setStateObject({
			[props.dataName]: null,
			imagePreviewUrl: false
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<form>
					{<img style={{width: '150px', height: '150px', marginBottom: '5px'}} src={props.value && !state.imagePreviewUrl ? props.value : state.imagePreviewUrl} />}
					<input style={{marginBottom: '5px'}} type="file" onChange={e => handleImageChange(e)} />
				</form>
			</div>
		</ThemeProvider>
	);
};

export default Photo;
