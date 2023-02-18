/** @jsxImportSource solid-js */
import { Router } from '@solidjs/router';
import SolidSPA from '../components/App';

export const App = (props: { url?: string }) => {
	return (
		<Router url={props.url}>
			<SolidSPA />
		</Router>
	);
};
