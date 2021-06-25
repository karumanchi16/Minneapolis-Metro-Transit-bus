import "./StopsInfo";
const StopsInfo = ({ departures = [], stops = [] }) => {
  return (
    <>
      {stops.length && (
        <>
          <table>
            <tr>
              <th>{stops[0].description}</th>
              <th>Stop #: {stops[0].stop_id}</th>
            </tr>
          </table>
          <table>
            <tr>
              <th>ROUTE</th>
              <th>DESTINATION</th>
              <th>DEPARTS</th>
            </tr>
            {departures &&
              departures.map(
                ({
                  route_short_name,
                  description,
                  departure_text,
                  trip_id,
                }) => {
                  return (
                    <tr key={trip_id}>
                      <td>{route_short_name}</td>
                      <td>{description}</td>
                      <td>{departure_text}</td>
                    </tr>
                  );
                }
              )}
          </table>
        </>
      )}
    </>
  );
};

export default StopsInfo;
