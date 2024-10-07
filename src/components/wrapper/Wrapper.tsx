export default function ModalWrapper({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <div
        className="flex justify-center items-center fixed inset-0 bg-rose-100 bg-opacity-50 max-md:mx-3"
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
  