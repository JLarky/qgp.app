import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';

export const Docs = () => {
	const __html = useLoaderData() as string;
	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html }} />
		</div>
	);
};
