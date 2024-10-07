import attic_logo from "../../../../assets/images/attic-logo.png";
export default function Header() {
  return (
    <>
      <div className="bg-white-wash h-32 py-3 shadow">
        <div className="flex justify-center items-center ">
          <img src={attic_logo} alt="Attic Tours" className="w-auto" />
          <div className="text-center max-md:hidden">
            <h3 className="text-crimson text-3xl font-bold">
              Attic Tours Philippines, Inc.
            </h3>
            <h6 className="text-onyx text-base font-bold">
              Accredited by Japan and Korea Embassies
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
