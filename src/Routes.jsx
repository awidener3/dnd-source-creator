import { useRoutes } from 'react-router-dom';
import Home from './Home';
import SourceList from './SourceList';
import SourceForm from './SourceForm';

const Routes = () => {
	const element = useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/monsters',
			children: [
				{
					index: true,
					element: <SourceList sourceType={'Monsters'} />,
				},
				{
					path: 'new',
					element: <SourceForm sourceType={'Monsters'} />,
				},
			],
		},
		{
			path: '/spells',
			children: [
				{
					index: true,
					element: <SourceList sourceType={'Spells'} />,
				},
				{
					path: 'new',
					element: <SourceForm sourceType={'Spells'} />,
				},
			],
		},
		{
			path: '/items',
			children: [
				{
					index: true,
					element: <SourceList sourceType={'Items'} />,
				},
				{
					path: 'new',
					element: <SourceForm sourceType={'Items'} />,
				},
			],
		},
	]);

	return element;
};

export default Routes;
