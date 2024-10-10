export default function InProgressQueue() {
  return (
    <article className="right-tv pt-10 max-xl:px-2">
      <div className="bg-blood-red h-16 w-72 rounded flex justify-center items-center mx-auto">
        <h1 className="text-white-wash font-bold">IN-PROGRESS</h1>
      </div>
      <article className="mt-10 mb-20 w-72 mx-auto h-96">
        <div className="bg-blood-red rounded h-full">
          <section className="py-8">
            <h1 className="text-white-wash text-center font-bold text-9xl">
              JO1
            </h1>
            <p className="text-white-wash text-center text-4xl">Window 1</p>
          </section>
          <section className="pb-10">
            <div className="flex justify-around py-2 in-prog-list">
              <h1 className="text-white-wash text-center text-2xl font-bold">
                JO2
              </h1>
              <p className="text-white-wash text-center text-2xl">Window 2</p>
            </div>
            <div className="flex justify-around py-2 in-prog-list">
              <h1 className="text-white-wash text-center text-2xl font-bold">
                JO2
              </h1>
              <p className="text-white-wash text-center text-2xl">Window 2</p>
            </div>
            <div className="flex justify-around py-2 in-prog-list">
              <h1 className="text-white-wash text-center text-2xl font-bold">
                JO2
              </h1>
              <p className="text-white-wash text-center text-2xl">Window 2</p>
            </div>
          </section>
        </div>
      </article>
    </article>
  );
}
