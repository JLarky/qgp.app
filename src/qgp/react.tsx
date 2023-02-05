import ReactSPA from '../components/App';
import type { StaticHandlerContext } from '@remix-run/router';

// import '../styles/tailwind.css';

export const App = ({ context }: { context?: StaticHandlerContext }) => {
	return <ReactSPA context={context} />;
};
