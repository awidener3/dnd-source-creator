import Home from './Home';
import Monsters from './Monsters';
import Spells from './Spells';
import Items from './Items';
import NotFound from './NotFound';
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
