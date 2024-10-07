export default function PasswordForm() {
    return (
      <>
        <form className="px-8 pt-6 pb-8 w-full">
          <label className="text-sm text-onyx font-semibold mb-1">Password</label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 bg-white-wash outline-none"
          />
          <button className="bg-blood-red w-full p-3 text-white-wash font-bold rounded hover:bg-red-500">
            Submit
          </button>
        </form>
      </>
    );
  }