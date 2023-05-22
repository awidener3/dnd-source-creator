import Form from './Form';
import useLocalStorage from './hooks/useLocalStorage';
import { monsterProps } from './utils/formProps';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { sortBy } from 'lodash';
import {
	AiOutlinePlus,
	AiOutlineDelete,
	AiOutlineArrowLeft,
	AiOutlineDown,
	AiOutlineUp,
	AiOutlineEdit,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineSearch,
} from 'react-icons/ai';
import { getCRExperience } from './utils';

const SORTS = {
	NONE: (list) => list,
	NAME_ALPHA: (list) => sortBy(list, 'name'),
	NAME_ALPHA_REV: (list) => sortBy(list, 'name').reverse(),
	CR_ASC: (list) => sortBy(list, 'challenge_rating'),
	CR_DESC: (list) => sortBy(list, 'challenge_rating').reverse(),
};

function Source({ sourceType }) {
	const navigate = useNavigate();
	const { sourceId } = useParams();
	const [sort, setSort] = useState('NONE');
	const [formVisible, setFormVisible] = useState(false);
	const [sources, setSources] = useLocalStorage(sourceType.toLowerCase(), []);

	const source = sources.find((source) => source.id === sourceId);

	const handleSort = (sortKey) => {
		setSort(sortKey);
	};

	const sortFunction = SORTS[sort];
	const sortedList = sortFunction(source[sourceType.toLowerCase()]);

	const addItem = (data) => {
		setSources(
			sources.map((source) => {
				if (source.id === sourceId) {
					source[sourceType.toLowerCase()].push(data);
					source.lastUpdated = new Date().toLocaleString();
				}
				return source;
			})
		);

		//...
	};

	const handleEditing = () => {
		console.log('handle edit...');

		// ...
	};

	const removeItem = () => {
		console.log('handle delete...');

		//...
	};

	return (
		<>
			<section className=" py-2 mb-2 sticky top-0 bg-[var(--background-color)]">
				<section className="flex gap-2 mb-2">
					<button
						className="flex gap-1 text-white text-sm px-2 py-1 items-center rounded bg-emerald-700 hover:bg-emerald-800"
						onClick={() => navigate(-1)}
					>
						<AiOutlineArrowLeft /> Back
					</button>
					<h1 className="text-lg">{source.source}</h1>
				</section>

				<span className="my-2 flex-wrap">
					<ul className="flex flex-1 items-center gap-2">
						<li className="relative">
							<AiOutlineSearch className="absolute text-gray-600 top-1/2 transform -translate-y-1/2 left-1" />
							<input
								type="text"
								className="w-72 border rounded ps-5 py-1 text-sm"
								placeholder={`Search by ${sourceType.toLowerCase().slice(0, sourceType.length - 1)} name`}
							/>
						</li>
						<li>
							<button
								className={
									sort.match(/NAME_ALPHA|NAME_ALPHA_REV/)
										? 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm bg-gray-100'
										: 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm'
								}
								onClick={() => handleSort(sort === 'NAME_ALPHA' ? 'NAME_ALPHA_REV' : 'NAME_ALPHA')}
							>
								Name {sort === 'NAME_ALPHA' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
							</button>
						</li>
						<li>
							<button
								className={
									sort.match(/CR_ASC|CR_DESC/)
										? 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm bg-gray-100'
										: 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm'
								}
								onClick={() => handleSort(sort === 'CR_ASC' ? 'CR_DESC' : 'CR_ASC')}
							>
								CR {sort === 'CR_ASC' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
							</button>
						</li>
					</ul>
				</span>
			</section>

			<section className="border rounded px-2 flex-1">
				<ul>
					{sortedList.map((item) => (
						<ListItem
							key={item.id}
							item={item}
							sourceType={sourceType}
							removeItem={removeItem}
							handleEditing={handleEditing}
						/>
					))}

					<li>
						<button
							className="flex items-center py-2 text-sm text-gray-400 hover:text-gray-500"
							onClick={() => setFormVisible(true)}
						>
							<AiOutlinePlus /> Add new {sourceType.slice(0, sourceType.length - 1)}
						</button>
					</li>
				</ul>
			</section>

			{formVisible && <Form setFormVisible={setFormVisible} addItem={addItem} properties={monsterProps} />}
		</>
	);
}

function ListItem({ item, sourceType, removeItem, handleEditing }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<li className="flex flex-col border-b py-2">
			<div className="flex justify-between">
				<h2 className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => setExpanded(!expanded)}>
					{expanded ? <AiOutlineUp /> : <AiOutlineDown />}
					{item.name}
				</h2>
				<div className="flex items-center gap-2">
					<button className="text-lg hover:text-emerald-700" onClick={handleEditing}>
						<AiOutlineEdit />
					</button>
					<button className="text-lg hover:text-red-700" onClick={() => removeItem(item.id)}>
						<AiOutlineDelete />
					</button>
				</div>
			</div>

			{expanded && (
				<div className="p-2 ml-3 flex flex-col text-sm border-t">
					{sourceType === 'monsters' && <MonsterExpandedInfo item={item} />}
				</div>
			)}
		</li>
	);
}

const MonsterExpandedInfo = ({ item }) => {
	return (
		<>
			<section className="flex">
				<ul className="flex-1">
					<li>
						<strong>HP</strong> {item.hit_points}
					</li>
					<li>
						<strong>AC</strong> {item.armor_class}
					</li>
					<li>
						<strong>CR</strong> {item.challenge_rating} ({getCRExperience(item.challenge_rating)}xp)
					</li>
					<li className="mt-2 italic">
						{item.size} {item.type}
					</li>
				</ul>

				<ul className="flex-1">
					<h2 className="font-bold">Actions</h2>

					{item.actions.map((action) => (
						<li key={item.name + '_' + action.name}>{action.name}</li>
					))}
				</ul>

				{item.reactions && (
					<ul className="flex-1">
						<h2 className="font-bold">Reactions</h2>

						{item.reactions.map((reaction) => (
							<li key={reaction.name}>{reaction.name}</li>
						))}
					</ul>
				)}

				{item.legendary_actions && (
					<ul className="flex-1">
						<h2 className="font-bold">Legendary Actions</h2>

						{item.legendary_actions.map((action) => (
							<li key={item.name + '_' + action.name}>{action.name}</li>
						))}
					</ul>
				)}
			</section>
		</>
	);
};

export default Source;
