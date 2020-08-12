import mockAxios from "axios";
import {unparkCar} from "../components/unparking.component";

it("Unpark a car from a given slot", async () => {
  // setup
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve(
        {"car":{"color":"Red","type":"Mehran","number":"LEL-693"}}
    )
  );

  // work
  const unparking = await unparkCar('1');
  console.log(unparking);

  // expect
  expect(unparking).toEqual(
    {"car":{"color":"Red","type":"Mehran","number":"LEL-693"}}
    );
  expect(mockAxios.post).toHaveBeenCalledTimes(1);

});