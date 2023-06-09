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

/**회원가입 */

export const postSignUp = (signUpInform) =>
  instance.post(`/users/`, signUpInform).then((res) => res.data);

/**로그인 */
export const postLogin = (loginInform) =>
  instance.post(`/users/login/`, loginInform).then((res) => res.data);

/**메인 페이지 */
export const getIdolSchedules = () =>
  instance.get(`/idols/schedules/`).then((response) => response.data);

export const getIdolList = () =>
  instance.get(`/idols/`).then((response) => response.data);

/**캘린더페이지 */
export const specificIdolInform = (idolId) =>
  instance.get(`/idols/${idolId}/`).then((response) => response.data);

export const specificIdolSchedule = (idolId) =>
  instance.get(`/idols/${idolId}/schedules/`).then((response) => response.data);

/**사진을 업로드 할 url 가져오는 함수. */
export const getUploadUrl = async (img) => {
  let resData = "";
  await instance
    .post(`/media/photos/get-url/`, img.file)
    .then((data) => {
      resData = uploadImg(data, img);
      return resData;
    })
    .catch(() => {
      resData = false;
      return resData;
    });

  return resData;
};

/**받아온 url에 img를 넣어주기 */
export const uploadImg = async (data, img) => {
  let resData = "";
  const form = new FormData();
  form.append("file", img.file[0]);
  await axios
    .post(data.data.uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    })
    .then((res) => {
      resData = res.data.result;
      return res.data.result;
    });

  return resData;
};

/**유저 이미지를 넣은 url post 하기 */
export const postProfileImg = async (profileImg) => {
  await instance
    .put(`/users/mypage/`, profileImg, {
      withCredentials: true,
    })
    .then((res) => res)
    .catch((res) => res);
};

/**유저 일정 등록 */

export const postUserCalendar = async (data) =>
  await instance.post(`/users_calendar/`, data, {
    withCredentials: true,
  });

/**유저 일정 수정 */

export const putUserCalendar = async (data, schedulePk) => {
  await instance.put(`/users_calendar/${schedulePk}/`, data, {
    withCredentials: true,
  });
};
