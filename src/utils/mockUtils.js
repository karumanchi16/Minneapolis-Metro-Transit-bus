export let mockRoutes = [
  {
    route_id: "1",
    route_label: "route 1",
    direction_id: "1",
    direction_name: "direction 1",
    place_code: "1",
    description: "stop 1",
    stops: [{ stop_id: "1", description: "stop 1" }],
  },
  {
    route_id: "2",
    route_label: "route 2",
    direction_id: "2",
    direction_name: "direction 2",
    place_code: "2",
    description: "stop 2",
    stops: [{ stop_id: "2", description: "stop 2" }],
  },
  {
    route_id: "3",
    route_label: "route 3",
    direction_id: "3",
    direction_name: "direction 3",
    place_code: "3",
    description: "stop 3",
    stops: [{ stop_id: "3", description: "stop 3" }],
  },
];
export const mockFetch = (res) => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(res),
    })
  );
};
