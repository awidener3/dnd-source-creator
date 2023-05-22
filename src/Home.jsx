import { GiOrcHead, GiSpellBook, GiAxeSword } from 'react-icons/gi';

function Home() {
	return (
		<>
			<section>
				<p className="mt-2">
					Welcome to 5e Source Creator, a tool for quickly creating &quot;source documents&quot; to be used in Dungeons
					& Dragons-based web apps, such as{' '}
					<a href="https://dm-deck.netlify.app" className="text-emerald-700 font-bold hover:underline">
						DM Deck
					</a>
					.{' '}
				</p>

				<p className="mt-2">
					Using the links in the navigation bar, you are able to create and modify source documents. Afterwards, you can
					download the file to your computer. You can always re-upload the file to make future edits!
				</p>
			</section>

			<section className="flex mt-5">
				<ul className="flex flex-1 justify-even flex-wrap gap-5 px-5">
					<li className="flex flex-col flex-1 border rounded bg-red-500 pt-5">
						<section className="flex flex-col items-center mt-auto p-4 bg-[var(--background-color)]">
							<GiOrcHead size={60} />
							<h2>Monsters</h2>
						</section>
					</li>
					<li className="flex flex-col flex-1 border rounded bg-blue-500 pt-5">
						<section className="flex flex-col items-center mt-auto p-4 bg-[var(--background-color)]">
							<GiSpellBook size={60} />
							<h2>Spells</h2>
						</section>
					</li>
					<li className="flex flex-col flex-1 border rounded bg-green-500 pt-5">
						<section className="flex flex-col items-center mt-auto p-4 bg-[var(--background-color)]">
							<GiAxeSword size={60} />
							<h2>Items</h2>
						</section>
					</li>
				</ul>
			</section>
		</>
	);
}

export default Home;
