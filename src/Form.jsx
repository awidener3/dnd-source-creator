import { useForm, useFieldArray } from 'react-hook-form';
import { actionDefaults } from './utils/formProps';
import { cleanObject } from './utils';

function Form({ setFormVisible, addItem, properties }) {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const onSubmit = (data) => {
		data.id = crypto.randomUUID();
		addItem(cleanObject(data));
	};

	return (
		<>
			{/* shade */}
			<div
				className="absolute inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
				onClick={() => setFormVisible(false)}
			></div>

			{/* modal */}
			<article className="absolute inset-0 z-10 overflow-y-auto bg-[var(--background-color)] m-10 rounded w-3/4 mx-auto">
				<section className="sticky flex justify-between top-0 bg-[var(--background-color)] p-4 border-b">
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
				<form id="monsterForm" onSubmit={handleSubmit(onSubmit)} className="p-4">
					<section className="grid grid-cols-2 gap-2">
						{properties.map((property) =>
							property.type === 'nested' ? (
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
		<span className={fullWidth ? 'flex flex-col col-span-2 mb-5' : 'flex flex-col mb-5'}>
			<div className="flex justify-between border-b">
				<h2>{name.replace('_', ' ')}</h2>
				<button type="button" onClick={handleAdd}>
					add
				</button>
			</div>

			{fields.map((field, index) => (
				<div key={field.name + index} className="grid grid-cols-2 gap-2">
					<h3 className="col-span-2 mt-3">ability {index + 1}</h3>
					{properties.map((property) => (
						<InputWithLabel
							key={[name, index, property.name].join('_')}
							path={`${name}.${index}.${property.name}`}
							register={register}
							{...property}
						/>
					))}

					{fields.length > 0 && (
						<button className="col-span-2 italic text-right" onClick={() => remove(index)}>
							Remove
						</button>
					)}
				</div>
			))}
		</span>
	);
};

const InputWithLabel = ({
	name = '',
	path,
	type = 'text',
	placeholder,
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
		fullWidthInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}  col-span-2`,
		gridInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}`,
		label: 'italic flex-1',
		input: 'p-2 font-thin flex-1',
	};

	return (
		<span className={fullWidth ? styles.fullWidthInput : styles.gridInput}>
			<label className="flex flex-col text-gray-500 text-sm">{name.replace('_', ' ')}</label>
			{type === 'select' ? (
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
			) : (
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
