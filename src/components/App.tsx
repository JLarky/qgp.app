import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SPA, Nested, Layout, Index, NotFound, SPAIndex, Counter } from './SPA';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Index />} />
				<Route path="SPA" element={<SPA />}>
					<Route index element={<SPAIndex />} />
					<Route path="nested" element={<Nested />}>
						<Route path=":id" element={<Nested />} />
					</Route>
					<Route path="counter" element={<Counter />} />
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
);
