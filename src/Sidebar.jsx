import { GiTreasureMap, GiOrcHead, GiSpellBook, GiAxeSword } from 'react-icons/gi';
import { BiCodeCurly } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

function Sidebar() {
	return (
		<aside className="flex flex-row sticky top-0 p-2 border-b justify-between sm:border-r sm:border-b-0 sm:justify-normal sm:flex-col sm:h-screen">
			<h1 className="flex text-xl items-center justify-center">
				<BiCodeCurly className="text-emerald-700" />
				<span className="hidden md:block"> 5e Source Creator</span>
			</h1>

			<nav className="mt-2 flex-row sm:flex-col">
				<ul className="flex sm:flex-col ">
					<li className="flex">
						<SidebarLink to={'/'}>
							<GiTreasureMap size={25} /> <span className="hidden md:block">Home</span>
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/monsters'}>
							<GiOrcHead size={25} /> <span className="hidden md:block">Monsters</span>
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/spells'}>
							<GiSpellBook size={25} /> <span className="hidden md:block">Spells</span>
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/items'}>
							<GiAxeSword size={25} /> <span className="hidden md:block">Items</span>
						</SidebarLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

function SidebarLink({ children, to }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? 'font-bold text-emerald-700 flex-1 gap-2' : 'flex-1 gap-2')}
		>
			<span className="flex gap-2 items-center hover:bg-gray-100 hover:font-bold px-2 sm:p-2 rounded">{children}</span>
		</NavLink>
	);
}

export default Sidebar;
