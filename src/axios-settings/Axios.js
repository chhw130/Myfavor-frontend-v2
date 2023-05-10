import axios from "axios";
import Cookie from "js-cookie";

export const instance = axios.create({
  //   baseURL: process.env.NODE_ENV === "development" ? "/api/v1/" : BASE_URL,
  baseURL: "/api/v1/",
  headers: {
    "X-CSRFToken": Cookie.get("csrftoken") || "",
  },
  withCredentials: true,
});

/**메인 페이지 */
export const getIdolSchedules = () =>
  instance.get(`/idols/schedules/`).then((response) => response.data);

export const getIdolList = () =>
  instance.get(`/idols/`).then((response) => response.data);

/**캘린더페이지 */
export const specificIdolInform = (idolId) =>
  instance.get(`/idols/${idolId}/`).then((response) => response.data);

export const specificIdolSchedule = (idolId) =>
  instance.get(`idols/${idolId}/schedules`).then((response) => response.data);
