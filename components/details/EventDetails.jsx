const EventDetails = ({ details, swaqs }) => {
  return (
    <div className="col-span-3">
      <div className="w-full h-full bg-[#242526] p-6 rounded-lg">
        <h2 className="font-bold text-2xl">Details</h2>
        <div className="my-2 text-[#AEAEAE] space-y-4 prose lg:prose-lg max-w-none">
          <p className="">{details}</p>

          {swaqs && (
            <ul className="">
              {swaqs.map((swaq) => (
                <li key={swaq}>{swaq}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
