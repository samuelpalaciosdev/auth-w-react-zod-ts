import { Input } from 'react-daisyui';
import { RefCallBack } from 'react-hook-form';

interface InputFieldProps {
  id?: string;
  label: string;
  type?: 'password' | 'text' | 'email';
  placeholder?: string;
  error?: string;
  inputProps?: {
    onChange?: (e: any) => unknown;
    onBlur?: (e: any) => unknown;
    ref?: RefCallBack;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
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
        color='ghost'
        placeholder={placeholder}
        {...(inputProps ?? {})}
      />
      {error && <span className='label-text text-error'>{error}</span>}
    </div>
  );
};
export default InputField;
