import mockAxios from "axios";
import {getCarsByTypeData} from "../components/find-cars.component";

it("fetches car based on type name", async () => {
  // setup
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(
        [{"type":"Mehran","number":"LEL-693","color":"Red"}]
    )
  );

  // work
  const carsByType = await getCarsByTypeData('Mehran');
  console.log(carsByType);

  // expect
  expect(carsByType).toEqual(
    [{"type":"Mehran","number":"LEL-693","color":"Red"}]
    );
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});