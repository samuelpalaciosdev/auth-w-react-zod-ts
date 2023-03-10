import { Input } from 'react-daisyui';

interface InputFieldProps {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  inputProps?: unknown;
}

const InputField = ({ id, label, type, error, inputProps, placeholder }: InputFieldProps) => {
  return (
    <div className='form-control w-full max-w-xs'>
      <label htmlFor={id} className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <Input
        type={type ?? 'text'}
        id={id}
        size='md'
        color='ghost'
        placeholder={placeholder}
        {...(inputProps ?? {})}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};
export default InputField;
