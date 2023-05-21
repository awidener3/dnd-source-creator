function Home() {
	return (
		<>
			<h1 className="text-xl">D&D Source Creator</h1>

			<p className="mt-2">
				Welcome to D&D Source Creator, a tool for quickly creating &quot;source documents&quot; to be used in Dungeons &
				Dragons-based web apps, such as{' '}
				<a href="https://dm-deck.netlify.app" className="text-emerald-700 font-bold hover:underline">
					DM Deck
				</a>
				.{' '}
			</p>

			<p className="mt-2">
				Using the links in the navigation bar, you are able to create and modify source documents. Afterwards, you can
				download the file to your computer. You can always re-upload the file to make future edits!
			</p>
		</>
	);
}

export default Home;
