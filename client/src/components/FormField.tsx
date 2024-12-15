import { Label } from './ui/label';
import { Input } from './ui/input';
import { InputHTMLAttributes, useState, FC } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: any;
  inputType?: 'string' | 'number';
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  error,
  inputType = 'string',
  type = 'text',
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className="grid gap-2">
      {/* Label */}
      <Label htmlFor={id}>{label}</Label>

      {/* Input Wrapper */}
      <div className="relative">
        <Input
          id={id}
          type={isPasswordField && showPassword ? 'text' : type}
          inputMode={inputType === 'number' ? 'numeric' : undefined}
          disabled={disabled}
          {...props}
        />

        {/* Password Toggle */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default FormField;
