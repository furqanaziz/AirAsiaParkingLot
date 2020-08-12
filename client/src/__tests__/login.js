import mockAxios from "axios";
import {login} from "../components/login.component";

it("Login User to the system", async () => {
  // setup
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve(
        {
            "email": "furqan.dev1@gmail.com",
            "tokens":{
                refreshToken: "",
                token: ""
            }
        }
    )
  );

  // work
  const loggedIn = await login();
  console.log(loggedIn);

  // expect
  expect(loggedIn).toEqual(
        {
            "email": "furqan.dev1@gmail.com",
            "tokens":{
                refreshToken: "",
                token: ""
            }
        }
    );
  expect(mockAxios.post).toHaveBeenCalledTimes(1);

});