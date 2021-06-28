import { apiHelper, GET, domain } from "./ApiHelper";
import { mockRoutes, mockFetch } from "./mockUtils";

it("api helper response", async () => {
  mockFetch(mockRoutes);
  const routes = await apiHelper(domain + "routes", GET);
  expect(routes).toEqual(mockRoutes);
  expect(fetch).toHaveBeenCalledTimes(1);
});
