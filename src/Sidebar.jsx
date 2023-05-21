import { GiTreasureMap, GiOrcHead, GiSpellBook, GiAxeSword } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

function Sidebar() {
	return (
		<aside className="flex flex-col sticky top-0 h-screen p-2 border-r min-w-[200px]">
			<h1 className="flex text-xl">D&D Source Creator</h1>

			<nav className="mt-2 flex flex-col">
				<ul>
					<li className="flex">
						<SidebarLink to={'/'}>
							<GiTreasureMap size={25} /> Home
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/monsters'}>
							<GiOrcHead size={25} /> Monsters
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/spells'}>
							<GiSpellBook size={25} /> Spells
						</SidebarLink>
					</li>
					<li className="flex">
						<SidebarLink to={'/items'}>
							<GiAxeSword size={25} /> Items
						</SidebarLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

function SidebarLink({ children, to }) {
	return (
		<NavLink to={to} className={({ isActive }) => (isActive ? 'font-bold text-emerald-700 flex-1' : 'flex-1')}>
			<span className="flex gap-2 items-center hover:bg-slate-300 hover:font-bold p-2 rounded">{children}</span>
		</NavLink>
	);
}

export default Sidebar;
