import axios from "axios";

export interface RadomUserProps {
  gender?: "male" | "female" | "";
  page?: number;
}

export const getRandomUser = ({ gender = "", page = 1 }: RadomUserProps) =>
  axios
    .create({
      baseURL: "https://randomuser.me/api/",
      params: { gender, page, results: 50 },
    })
    .get("");
