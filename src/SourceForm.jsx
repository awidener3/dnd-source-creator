import { useForm } from 'react-hook-form';

function SourceForm() {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const onSubmit = () => {
		console.log('submit');
	};

	return (
		<>
			<h1 className="text-lg mb-2">New Monster Source</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto">
				<label className="flex flex-col text-gray-500 text-sm">
					Source name
					<input className="border rounded p-2 mt-1" {...register('name')} />
				</label>
			</form>
		</>
	);
}

export default SourceForm;
