export default function TipBox() {
  return (
    <div className="mt-8 rounded-lg shadow-md bg-yellow-100 border-l-4 border-yellow-400 p-5 mx-auto">
      <h4 className="flex items-center text-yellow-700 font-bold mb-2 text-lg select-none">
        <span aria-hidden="true" className="mr-2 text-2xl">
          &#x1F4A1;
        </span>
        Helpful Tip
      </h4>
      <p className="text-yellow-800 leading-relaxed text-sm">
        Worms thrive best at 15&ndash;25&deg;C and don&apos;t like bright light!
      </p>
    </div>
  );
}
