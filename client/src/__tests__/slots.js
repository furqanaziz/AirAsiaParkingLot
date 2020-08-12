import mockAxios from "axios";
import {availableSlots} from "../components/slots-list.component";

it("fetches Slots data", async () => {
  // setup
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(
        [
        {
            "id": "6",
            "alloted": false,
            "car": null
        }]
    )
  );

  // work
  const slots = await availableSlots();
  console.log(slots);

  // expect
  expect(slots).toEqual(
      [
        {
            "id": "6",
            "alloted": false,
            "car": null
        }
      ]
    );
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});