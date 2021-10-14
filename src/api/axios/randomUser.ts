import axios, { AxiosResponse } from "axios";
import { Users } from "types/models/user";

export interface RadomUserProps {
  gender?: "male" | "female" | "";
  page?: number;
}

export const getRandomUser = ({
  gender = "",
  page = 1,
}: RadomUserProps): Promise<AxiosResponse<Users>> =>
  axios
    .create({
      baseURL: "https://randomuser.me/api/",
      params: { gender, page, results: 50 },
    })
    .get("");
