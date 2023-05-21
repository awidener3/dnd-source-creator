import useLocalStorage from './hooks/useLocalStorage';
import { useEffect, useRef, useState } from 'react';
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
				<ul>
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
							listId={source.id}
							source={source.source}
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

function ListItem({ listId, source, setUpdate, handleDelete }) {
	const editInputRef = useRef(null);
	const [editing, setEditing] = useState(source === null);

	const original = source;

	const handleEditing = () => {
		setEditing(true);
	};

	const handleUpdateDone = (e) => {
		if (editInputRef.current.value === '') {
			console.log('no');
			// ...
		} else if (e.key === 'Enter' || e.currentTarget.id === 'confirm') {
			setUpdate(editInputRef.current.value, listId);
			setEditing(false);
		}
	};

	const handleCancel = () => {
		setUpdate(original, listId);
		setEditing(false);
	};

	return (
		<li className="flex justify-between border-b py-2">
			{!editing && (
				<>
					<h2 className="hover:underline">
						<Link to={`./${listId}`}>{source}</Link>
					</h2>
					<div className="flex items-center gap-2">
						<button className="text-lg hover:text-blue-700">
							<AiOutlineDownload />
						</button>
						<button className="text-lg hover:text-emerald-700" onClick={handleEditing}>
							<AiOutlineEdit />
						</button>
						<button className="text-lg hover:text-red-700" onClick={() => handleDelete(listId)}>
							<AiOutlineDelete />
						</button>
					</div>
				</>
			)}

			{editing && (
				<>
					<input
						type="text"
						className="flex-1 me-2 border rounded p-1"
						ref={editInputRef}
						autoFocus={true}
						defaultValue={source}
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
				</>
			)}
		</li>
	);
}

export default SourceList;
