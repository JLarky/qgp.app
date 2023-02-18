import { useRouteData } from '@solidjs/router';
import { Resource, Show, useContext } from 'solid-js';

import { SSRContext } from './docs/ssr';

export const Docs = () => {
	return (
		<Show
			keyed={true}
			when={(useRouteData() as unknown as Resource<string>)()}
			fallback={useContext(SSRContext).ssrValue}
		>
			{(value) => <div innerHTML={value} />}
		</Show>
	);
};
