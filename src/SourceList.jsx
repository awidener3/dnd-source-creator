import { useRef, useState } from 'react';
import {
	AiOutlinePlus,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineDownload,
	AiOutlineClose,
	AiOutlineCheck,
} from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';

const testSources = [
	{
		id: 1,
		source: 'source 1',
	},
	{
		id: 2,
		source: 'source 2',
	},
	{
		id: 3,
		source: 'source 3',
	},
	{
		id: 4,
		source: 'source 4',
	},
	{
		id: 5,
		source: 'source 5',
	},
];

function SourceList({ sourceType }) {
	const [sources, setSources] = useState(testSources);
	// const navigate = useNavigate();

	const handleNew = () => {
		setSources([
			{
				source: 'New Source',
				id: crypto.randomUUID(),
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
					className="bg-emerald-700 rounded text-white px-2 py-1 text-sm hover:bg-emerald-800"
					onClick={handleNew}
				>
					<AiOutlinePlus />
				</button>
			</section>

			<section className="border rounded px-2 flex-1">
				<ul>
					{sources.map((source) => (
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
	const [editing, setEditing] = useState(false);
	const original = source;

	const handleEditing = () => {
		setEditing(true);
	};

	const handleUpdateDone = (e) => {
		if (e.key === 'Enter' || e.currentTarget.id === 'confirm') {
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
					<h2>{source}</h2>
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
