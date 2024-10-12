import attic_logo from "../../../../assets/images/attic-logo-2.png";

export default function AtticVideo() {
  return (
    <aside className="pl-20 pt-10 left-tv max-xl:px-2">
      <img src={attic_logo} alt="Attic Logo" className="h-16" />
      <div className="pt-8">
        <iframe
          className="w-full h-[calc(100vh-15rem)]"
          src="https://www.youtube.com/embed/watch?v=Bnej8INPYhw&list=PLvQ0G7tJfb3zqjWCxdQPrn9kCmmciLWUm&index=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </aside>
  );
}
