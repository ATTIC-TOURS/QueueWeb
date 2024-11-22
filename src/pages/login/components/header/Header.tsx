import logo from "../../../../assets/images/attic-logo.png"
export default function Header() {
  return (
    <>
      <div className="bg-white-wash h-32 py-3 shadow-lg">
        <div className="flex justify-center items-center ">
          <img src={logo} alt="Attic Tours" className="w-auto h-28" />
        </div>
      </div>
    </>
  );
}
