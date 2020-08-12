import mockAxios from "axios";
import {parkCar} from "../components/parking.component";

it("Park Car in nearby slot", async () => {
  // setup
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve(
        {"id":"2"}
    )
  );

  // work
  const parking = await parkCar({"number":"ABC-3456","color":"Red","type":"Suv"});
  console.log(parking);

  // expect
  expect(parking).toEqual(
    {"id":"2"}
    );
  expect(mockAxios.post).toHaveBeenCalledTimes(1);

});