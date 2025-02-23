import { Input } from "@heroui/input";

interface LabelInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function LabelInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = ""
}: LabelInputProps) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`rounded-lg shadow-sm ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
