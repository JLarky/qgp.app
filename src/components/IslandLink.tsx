import type { MouseEventHandler } from 'react';

const w = () => window as typeof window & { qgp_set_path: undefined | ((path: string) => void) };

export const setSetPath = (newSetPath: (path: string) => void) => {
	w().qgp_set_path = newSetPath;
};

const handleClick =
	(to: string): MouseEventHandler<HTMLAnchorElement> =>
	(e) => {
		const setPath = w().qgp_set_path;
		if (setPath) {
			e.preventDefault();
			setPath(to);
		}
	};

export const IslandLink = ({
	className,
	to,
	children,
}: {
	className?: string;
	to: string;
	children: string;
}) => {
	return (
		<a className={className} onClick={handleClick(to)} href={to}>
			{children}
		</a>
	);
};
