import Routes from './Routes';
import Sidebar from './Sidebar';

function App() {
	return (
		<>
			<section className="flex">
				<Sidebar />

				<section className="flex flex-col flex-1 p-4 relative">
					<Routes />
				</section>
			</section>
		</>
	);
}

export default App;
