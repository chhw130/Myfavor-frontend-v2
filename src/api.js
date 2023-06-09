import axios from "axios";
import { BASE_URL } from "./URL/url";

// 아이돌의 ID를 파라미터로 전달받아 특정 URL에 HTTP GET 요청

export function axiosSchedule(idolId) {
  return axios(`${BASE_URL}idols/${idolId}/schedules`).then(
    (response) => response.data
  );
}

export const axiosIdolSchedule = async (idolId) => {
  return await axios(`${BASE_URL}idols/${idolId}/`).then(
    (response) => response.data
  );
};
