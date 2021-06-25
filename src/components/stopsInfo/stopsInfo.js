const StopsInfo = ({ departures = [], stops = [] }) => {
  console.log(stops, departures);
  return (
    <>
      {stops.length && (
        <>
          <span>
            <p>{stops[0].description}</p>
            <p>Stop #: {stops[0].stop_id}</p>
          </span>
          <span>
            <p>ROUTE</p>
            <p>DESTINATION</p>
            <p>DEPARTS</p>
          </span>
          {departures.length &&
            departures.map(
              ({ route_short_name, description, departure_text }) => {
                return (
                  <span>
                    <p>{route_short_name}</p>
                    <p>{description}</p>
                    <p>{departure_text}</p>
                  </span>
                );
              }
            )}
        </>
      )}
    </>
  );
};

export default StopsInfo;
