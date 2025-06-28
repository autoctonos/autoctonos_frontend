import { Input } from "@heroui/input";

interface LabelInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  className?: string;
}

export default function LabelInputPayment({
  label,
  type = "text",
  name,
  placeholder,
  value,
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
        required={required}
      />
    </div>
  );
}
