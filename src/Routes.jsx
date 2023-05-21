import Home from './Home';
import Items from './Items';
import Monsters from './Monsters';
import NotFound from './NotFound';
import Spells from './Spells';
import Source from './Source';
import { useRoutes } from 'react-router-dom';

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
					element: <Monsters />,
				},
				{
					path: ':sourceId',
					element: <Source sourceType={'monsters'} />,
				},
			],
		},
		{
			path: '/spells',
			children: [
				{
					index: true,
					element: <Spells />,
				},
			],
		},
		{
			path: '/items',
			children: [
				{
					index: true,
					element: <Items />,
				},
			],
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

	return element;
};

export default Routes;
