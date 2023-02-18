/** @jsxImportSource solid-js */
import { Router } from '@solidjs/router';
import type { JSX } from 'solid-js';
import SolidSPA from '../components/App';
import { SSRContext } from '../components/docs/ssr';

export const App = (props: { url?: string; children?: JSX.Element }) => {
	return (
		<SSRContext.Provider value={{ ssrValue: props.children }}>
			<Router url={props.url}>
				<SolidSPA />
			</Router>
		</SSRContext.Provider>
	);
};
