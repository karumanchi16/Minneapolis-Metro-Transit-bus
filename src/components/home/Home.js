/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { apiHelper, GET } from "../../utils/ApiHelper";
import AutoComplete from "../autoComplete";
import Update from "../autoUpdate";
import Button from "../button";
import Spinner from "../loadingSpinner";
import StopsInfo from "../stopInfo";
const styles = { position: "absolute", left: "122px", top: "15px" };
const logError = (e) => console.log(e);
function Home() {
  const [route, setRoute] = useState(null);
  const [direction, setDirection] = useState("");
  const [routes, setRoutes] = useState([]);
  const [isRoutesLoading, setIsRoutesLoading] = useState(false);
  const [directions, setDirections] = useState([]);
  const [isDirectionsLoading, setIsDirectionsLoading] = useState(false);
  const [stops, setStops] = useState([]);
  const [isStopsLoading, setIsStopsLoading] = useState(false);
  const [stop, setStop] = useState("");
  const [stopsInfo, setStopsInfo] = useState({});
  const [isStopsInfoLoading, setIsStopsInfoLoading] = useState(false);

  const getRoutes = async () => {
    setIsRoutesLoading(true);
    const data = await apiHelper("routes", GET);
    setRoutes(data);
    setIsRoutesLoading(false);
  };

  useEffect(() => {
    try {
      getRoutes();
    } catch (e) {
      logError(e);
    }
  }, []);

  const getDirections = async () => {
    setIsDirectionsLoading(true);
    const data = await apiHelper(`directions/${route.route_id}`, GET);
    setDirections(data);
    setIsDirectionsLoading(false);
  };

  const getStops = async () => {
    setIsStopsLoading(true);
    const data = await apiHelper(
      `stops/${route.route_id}/${direction.direction_id}`,
      GET
    );
    setStops(data);
    setIsStopsLoading(false);
  };

  useEffect(() => {
    setDirection("");
    setDirections([]);
    setStopsInfo([]);
    if (route?.route_id) {
      try {
        getDirections();
      } catch (e) {
        logError(e);
      }
    }
  }, [route?.route_id]);

  useEffect(() => {
    setStop("");
    setStops([]);
    setStopsInfo([]);
    if (route?.route_id && direction?.direction_id > -1) {
      try {
        getStops();
      } catch (e) {
        logError(e);
      }
    }
  }, [direction.direction_id]);

  const getStopInfo = async () => {
    setIsStopsInfoLoading(true);
    try {
      const data = await apiHelper(
        `${route.route_id}/${direction.direction_id}/${stop.place_code}`,
        GET
      );
      setStopsInfo(data);
    } catch (e) {
      logError(e);
    }
    setIsStopsInfoLoading(false);
  };

  const handleClear = () => {
    setRoute("");
    setDirection("");
    setDirections([]);
    setStop("");
    setStops([]);
    setStopsInfo([]);
  };

  useEffect(() => {
    setStopsInfo([]);
  }, [stop?.place_code]);

  return (
    <>
      <h3 className="App-Body-Header">Real-time Departures</h3>
      <label>Route</label>
      <div className="App-AutoComplete-Spinner">
        <AutoComplete
          options={routes}
          defaultValue={route}
          onChange={setRoute}
          objKey={"route_label"}
          dataTestid={"route"}
        />
        {isRoutesLoading && <Spinner styles={{ ...styles }} />}
      </div>
      <label>Direction</label>
      <div className="App-AutoComplete-Spinner">
        <AutoComplete
          options={directions}
          defaultValue={direction}
          onChange={setDirection}
          objKey={"direction_name"}
          dataTestid={"direction"}
        />
        {isDirectionsLoading && <Spinner styles={{ ...styles }} />}
      </div>
      <label>Stop</label>
      <div className="App-AutoComplete-Spinner">
        <AutoComplete
          options={stops}
          defaultValue={stop}
          onChange={setStop}
          objKey={"description"}
          dataTestid={"stop"}
        />
        {isStopsLoading && <Spinner styles={{ ...styles }} />}
      </div>
      <Button
        onClick={getStopInfo}
        label={"Get Departures"}
        primary
        size={"large"}
        disabled={route && direction && stop ? false : true}
      />
      <Button onClick={handleClear} label={"Clear"} size={"large"} />
      {isStopsInfoLoading && (
        <div style={{ minHeight: "100vh" }}>
          <Spinner />
        </div>
      )}
      {route &&
        direction &&
        stop &&
        stopsInfo?.stops?.length &&
        !isStopsInfoLoading && (
          <>
            <Update callback={getStopInfo} updatedTime={new Date()} />
            <StopsInfo {...stopsInfo} />
          </>
        )}
    </>
  );
}

export default Home;
