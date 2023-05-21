import useLocalStorage from './hooks/useLocalStorage';
import { useRef, useState } from 'react';
import { sortBy } from 'lodash';
import { Link } from 'react-router-dom';
import {
	AiOutlinePlus,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineDownload,
	AiOutlineClose,
	AiOutlineCheck,
	AiOutlineImport,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineDown,
	AiOutlineUp,
	AiOutlineSearch,
	AiOutlineNumber,
	AiOutlineClockCircle,
} from 'react-icons/ai';

const SORTS = {
	NONE: (list) => list,
	SOURCE_ALPHA: (list) => sortBy(list, 'source'),
	SOURCE_ALPHA_REV: (list) => sortBy(list, 'source').reverse(),
};

function SourceList({ sourceType }) {
	const [sources, setSources] = useLocalStorage(sourceType.toLowerCase(), []);
	const [sort, setSort] = useState('NONE');

	const handleSort = (sortKey) => {
		setSort(sortKey);
	};

	const sortFunction = SORTS[sort];
	const sortedList = sortFunction(sources);

	const handleImport = () => {
		console.log('import');
		// ...
	};

	const handleNew = () => {
		setSources([
			{
				source: null,
				id: crypto.randomUUID(),
				lastUpdated: new Date().toLocaleString(),
				[sourceType.toLowerCase()]: [],
			},
			...sources,
		]);
	};

	const setUpdate = (updatedSource, id) => {
		setSources(
			sources.map((source) => {
				if (source.id === id) {
					source.source = updatedSource;
					source.lastUpdated = new Date().toLocaleString();
				}
				return source;
			})
		);
	};

	const handleDelete = (id) => {
		setSources(sources.filter((source) => source.id !== id));
	};

	return (
		<>
			<section className="flex justify-between items-center mb-2">
				<h1 className="text-xl">{sourceType}</h1>
				<button
					className="flex gap-2 items-center bg-emerald-700 rounded text-white px-2 py-1 text-sm hover:bg-emerald-800"
					onClick={handleImport}
				>
					<AiOutlineImport /> Import
				</button>
			</section>

			<span className="my-2">
				<ul className="flex flex-1 items-center gap-2">
					<li className="relative">
						<AiOutlineSearch className="absolute text-gray-600 top-1/2 transform -translate-y-1/2 left-1" />
						<input type="text" className="w-72 border rounded ps-5 py-1 text-sm" placeholder="Search by source name" />
					</li>
					<li>
						<button
							className={
								sort.match(/SOURCE_ALPHA|SOURCE_ALPHA_REV/)
									? 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm bg-gray-100'
									: 'flex gap-1 items-center border rounded p-1 text-gray-500 text-sm'
							}
							onClick={() => handleSort(sort === 'SOURCE_ALPHA' ? 'SOURCE_ALPHA_REV' : 'SOURCE_ALPHA')}
						>
							Source {sort === 'SOURCE_ALPHA' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
						</button>
					</li>
				</ul>
			</span>

			<section className="border rounded px-2 flex-1">
				<ul>
					{sortedList.map((source) => (
						<ListItem
							key={source.id}
							item={source}
							sourceType={sourceType}
							setUpdate={setUpdate}
							handleDelete={handleDelete}
						/>
					))}

					<li>
						<button className="flex items-center py-2 text-sm text-gray-400 hover:text-gray-500" onClick={handleNew}>
							<AiOutlinePlus /> Add new source
						</button>
					</li>
				</ul>
			</section>
		</>
	);
}

function ListItem({ item, sourceType, setUpdate, handleDelete }) {
	const editInputRef = useRef(null);
	const [editing, setEditing] = useState(item.source === null);
	const [expanded, setExpanded] = useState(false);
	const original = item.source;

	const handleEditing = () => {
		setEditing(true);
	};

	const handleUpdateDone = (e) => {
		if (editInputRef.current.value === '') {
			console.log('no');
			// ...
		} else if (e.key === 'Enter' || e.currentTarget.id === 'confirm') {
			setUpdate(editInputRef.current.value, item.id);
			setEditing(false);
		}
	};

	const handleCancel = () => {
		setUpdate(original, item.id);
		setEditing(false);
	};

	return (
		<li className="flex flex-col border-b py-2">
			{!editing && (
				<>
					<div className="flex justify-between">
						<h2
							className="flex items-center gap-1 cursor-pointer hover:underline"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? <AiOutlineUp /> : <AiOutlineDown />}
							{item.source}
						</h2>
						<div className="flex items-center gap-2">
							<button className="text-lg hover:text-blue-700">
								<AiOutlineDownload />
							</button>
							<button className="text-lg hover:text-emerald-700" onClick={handleEditing}>
								<AiOutlineEdit />
							</button>
							<button className="text-lg hover:text-red-700" onClick={() => handleDelete(item.id)}>
								<AiOutlineDelete />
							</button>
						</div>
					</div>

					{expanded && (
						<div className="p-2 ml-3 flex flex-col text-sm border-t">
							<p className="flex gap-1 items-center">
								<AiOutlineNumber /> Total {sourceType.toLowerCase()}: {item[sourceType.toLowerCase()].length}
							</p>

							<p className="flex gap-1 items-center">
								<AiOutlineClockCircle /> Last updated: {item.lastUpdated || 'Unknown'}
							</p>

							<Link to={`./${item.id}`} className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100">
								View
							</Link>
						</div>
					)}
				</>
			)}

			{editing && (
				<div className="flex">
					<input
						type="text"
						className="flex-1 me-2 border rounded p-1"
						ref={editInputRef}
						autoFocus={true}
						defaultValue={item.source}
						onKeyDown={handleUpdateDone}
					/>
					<div className="flex items-center gap-2">
						<button id="confirm" className="text-lg hover:text-emerald-700" onClick={handleUpdateDone}>
							<AiOutlineCheck />
						</button>
						<button className="text-lg hover:text-red-700" onClick={handleCancel}>
							<AiOutlineClose />
						</button>
					</div>
				</div>
			)}
		</li>
	);
}

export default SourceList;
