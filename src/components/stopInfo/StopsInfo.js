import "./StopsInfo.css";
const StopsInfo = ({ departures = [], stops = [] }) => {
  return (
    <>
      {stops.length && (
        <div className="Stop-Card">
          <div className="Stop-Info">
            <h3 className="Stop-Header">{stops[0].description}</h3>
            <p className="Stop-Id"> Stop #: {stops[0].stop_id}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ROUTE</th>
                <th>DESTINATION</th>
                <th>DEPARTS</th>
              </tr>
            </thead>
            {departures.length ? (
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
                      <td>{departure_text} Min</td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td>Stop closed</td>
              </tr>
            )}
          </table>
        </div>
      )}
    </>
  );
};

export default StopsInfo;
