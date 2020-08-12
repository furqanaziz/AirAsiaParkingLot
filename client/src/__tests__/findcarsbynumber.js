import mockAxios from "axios";
import {getCarsByNumberData} from "../components/find-cars.component";

it("fetches car based on type name", async () => {
  // setup
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(
        [{"type":"Mehran","number":"LEL-693","color":"Red"}]
    )
  );

  // work
  const carsByNumber = await getCarsByNumberData('LEL-693');

  // expect
  expect(carsByNumber).toEqual(
    [{"type":"Mehran","number":"LEL-693","color":"Red"}]
    );
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});