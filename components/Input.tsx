interface InputProps {
  label: string;
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={label} className="text-lg font-light mb-2">
        {label}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-md border-2 border-grey p-2 text-lg focus:outline-none focus:border-purple"
      />
    </div>
  );
};

export default Input;
