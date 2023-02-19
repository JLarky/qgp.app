/** @jsxImportSource solid-js */

import type { Location } from '@solidjs/router';
import { createSignal, JSX } from 'solid-js';

const w = () => window as typeof window & { qgp_set_path: undefined | ((path: string) => void) };

export const setSetPath = (newSetPath: (path: string) => void) => {
	w().qgp_set_path = newSetPath;
};

export const locationSignal = createSignal<Location>();

export const IslandLink = (props: { className?: string; to: string; children: JSX.Element }) => {
	return (
		<a
			class={props.className}
			onClick={(e) => {
				const setPath = w().qgp_set_path;
				if (setPath) {
					e.preventDefault();
					setPath(props.to);
				}
			}}
			href={props.to}
			children={props.children}
		/>
	);
};
