import axios from "axios";

export const getRandomUser = ({
  gender = "",
  page = 1,
}: {
  gender?: "male" | "female" | "";
  page?: number;
}) =>
  axios
    .create({
      baseURL: "https://randomuser.me/api/",
      params: { results: 50, gender, page },
    })
    .get("");
