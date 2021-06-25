/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ApiHelper } from "../../utils/ApiHelper";
import AutoComplete from "../autoComplete";
import Button from "../button";

function Home() {
  const [route, setRoute] = useState(null);
  const [direction, setDirection] = useState("");
  const [routes, setRoutes] = useState([]);
  const [directions, setDirections] = useState([]);
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState("");
  const [stopsInfo, setStopsInfo] = useState([]);

  const getRoutes = async () => {
    const data = await ApiHelper(
      "https://svc.metrotransit.org/nextripv2/routes"
    );
    setRoutes(data);
  };

  useEffect(() => {
    getRoutes();
  }, []);

  const getDirections = async () => {
    const data = await ApiHelper(
      `https://svc.metrotransit.org/nextripv2/directions/${route.route_id}`
    );
    setDirections(data);
  };

  const getStops = async () => {
    if (route?.route_id && direction?.direction_id > -1) {
      const data = await ApiHelper(
        `https://svc.metrotransit.org/nextripv2/stops/${route.route_id}/${direction.direction_id}`,
        "GET"
      );
      setStops(data);
    }
  };

  useEffect(() => {
    setDirection("");
    if (route?.route_id) getDirections();
  }, [route?.route_id]);

  useEffect(() => {
    setStop("");
    if (route?.route_id && direction?.direction_id > -1) getStops();
  }, [direction.direction_id]);

  const getStopInfo = async () => {
    const data = await ApiHelper(
      `https://svc.metrotransit.org/nextripv2/${route.route_id}/${direction.direction_id}/${stop.place_code}`,
      "GET"
    );
    setStopsInfo(data);
  };

  const handleClear = () => {
    setRoute("");
    setDirection("");
    setStop("");
  };

  return (
    <>
      <h3 className="App-Header">
        Select a Route and Direction to get the stops list
      </h3>
      <label>Route</label>
      <AutoComplete
        options={routes}
        defaultValue={route}
        onChange={setRoute}
        flag={"route_label"}
      />
      <label>Direction</label>
      <AutoComplete
        options={directions}
        defaultValue={direction}
        onChange={setDirection}
        flag={"direction_name"}
      />
      <label>Stop</label>
      <AutoComplete
        options={stops}
        defaultValue={stop}
        onChange={setStop}
        flag={"description"}
      />
      <Button
        onClick={getStopInfo}
        label={"Get Departures"}
        primary
        size={"large"}
        disabled={route && direction && stop ? false : true}
      />
      <Button onClick={handleClear} label={"Clear"} size={"large"} />
      {/* <Home stopsInfo={stopsInfo} /> */}
    </>
  );
}

export default Home;
