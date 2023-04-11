type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: "w-fit" | "w-full";
  buttonBg?: string;
};

const Button = ({
  children,
  disabled,
  onClick,
  width = "w-fit",
  buttonBg = "bg-primary hover:bg-primary-700",
}: ButtonProps) => {
  return (
    <button
      className={`${buttonBg} text-secondary font-bold py-2 px-4 rounded ${width}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
