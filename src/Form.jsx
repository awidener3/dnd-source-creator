import { useForm, useFieldArray } from 'react-hook-form';
import { actionDefaults } from './utils/formProps';
import { cleanObject } from './utils';
import _ from 'lodash';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

function Form({ setFormVisible, addItem, properties }) {
	const { control, register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		data.id = crypto.randomUUID();
		addItem(cleanObject(data));
		setFormVisible(false);
	};

	return (
		<>
			{/* shade */}
			<div
				className="absolute inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
				onClick={() => setFormVisible(false)}
			></div>

			{/* modal */}
			<article className="absolute inset-0 z-10 overflow-y-auto bg-[var(--background-color)] m-10 w-11/12 rounded mx-auto flex flex-col">
				{/* heading */}
				<section className="sticky flex z-10 justify-between top-0 bg-[var(--background-color)] p-4 border-b">
					<h1 className="text-lg">Create Monster</h1>

					<div>
						<button
							type="submit"
							form="monsterForm"
							className="flex gap-1 text-white text-sm px-2 py-1 items-center rounded bg-emerald-700 hover:bg-emerald-800"
							onClick={handleSubmit}
						>
							Save
						</button>
					</div>
				</section>

				{/* form */}
				<form id="monsterForm" onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
					<section className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 relative">
						{properties.map((property) =>
							property.breakpoint ? (
								<span
									key={property.name}
									className="col-span-full border-b bg-[var(--background-color)] sticky top-0 mt-5"
								>
									{property.name}
								</span>
							) : property.type === 'nested' ? (
								<NestedFieldArray key={property.name} {...property} {...{ control, register }} />
							) : (
								<InputWithLabel key={property.name} {...property} register={register} />
							)
						)}
					</section>
				</form>
			</article>
		</>
	);
}

const NestedFieldArray = ({ name, fullWidth = false, properties, control, register }) => {
	const { fields, append, remove } = useFieldArray({ control, name });

	const handleAdd = () => append(actionDefaults);

	return (
		<span className={fullWidth ? 'flex flex-col col-span-full mb-5' : 'flex flex-col mb-5'}>
			{fields.map((field, index) => (
				<div key={field.name + index} className="grid grid-cols-2 gap-2 border rounded p-2 mb-2">
					<button className="hover:text-red-500 ms-auto col-span-full" onClick={() => remove(index)}>
						<AiOutlineDelete />
					</button>

					{properties.map((property) => (
						<InputWithLabel
							key={[name, index, property.name].join('_')}
							path={`${name}.${index}.${property.name}`}
							register={register}
							{...property}
						/>
					))}
				</div>
			))}

			<button
				type="button"
				className="text-gray-500 flex items-center gap-1 w-max px-2 py-1 text-sm border border-gray-500 rounded"
				onClick={handleAdd}
			>
				<AiOutlinePlus /> Add
			</button>
		</span>
	);
};

const InputWithLabel = ({
	name = '',
	path,
	type = 'text',
	placeholder,
	rows,
	min,
	max,
	minLength,
	maxLength,
	row,
	options = [],
	fullWidth = false,
	required = false,
	register,
}) => {
	const styles = {
		fullWidthInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}  col-span-full`,
		gridInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}`,
		label: 'italic flex-1',
		input: 'p-2 font-thin flex-1',
	};

	// cmd/ctrl + shift + s to wrap highlight in [spell][/spell]
	const handleSpellShortcut = (e) => {
		if (e.metaKey && e.shiftKey && e.key === 's') {
			const text = e.target;

			const before = text.value.substring(0, text.selectionStart);
			const selection = text.value.substring(text.selectionStart, text.selectionEnd);
			const after = text.value.substring(text.selectionEnd);

			text.value = `${before}[spell]${selection}[/spell]${after}`;
		}
	};

	return (
		<span className={fullWidth ? styles.fullWidthInput : styles.gridInput}>
			<label className="flex flex-col text-gray-500 text-sm">{_.startCase(name.replace('_', ' '))}</label>

			{type === 'select' ? (
				// SELECT element
				<select className="border rounded p-2 mt-1" defaultValue="" {...register(name, { required })}>
					<option value="" disabled>
						select
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : type === 'textarea' ? (
				// TEXTAREA element
				<textarea
					className="border rounded p-2"
					placeholder={placeholder}
					rows={rows}
					onKeyDown={handleSpellShortcut}
					{...register(path ? path : name, { required })}
				></textarea>
			) : (
				// All others
				<input
					type={type}
					className="border rounded p-2 mt-1"
					placeholder={placeholder}
					autoComplete="off"
					min={min}
					max={max}
					minLength={minLength}
					maxLength={maxLength}
					{...register(path ? path : name, { required })}
				/>
			)}
		</span>
	);
};

export default Form;
