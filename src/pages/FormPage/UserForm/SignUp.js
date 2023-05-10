import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../../UI/Layout";
import Option from "./Option";
import Modal from "../../../UI/Modal";
import SignUpSuccess from "./SignUpSuccess";
import {
  Button,
  ButtonGroup,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import { postSignUp } from "../../../axios-settings/Axios";

const SignUp = () => {
  /**회원가입 확인 모달창 */
  const [signUpModal, setSignUpModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const { mutateAsync: signUpHandler } = useMutation((signUpInform) =>
    postSignUp(signUpInform)
  );

  /**링크 네비게이트 */
  const navigate = useNavigate();

  /**회원가입 form 제출시 */
  const onSubmit = async (data) => {
    const year = Number(data.birth.slice(0, 4));
    const date = new Date().getFullYear();
    const age = date - year + 1;

    console.log(data);

    const signUpInform = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      age: age,
      pick: Number(data.pick),
    };

    await signUpHandler(signUpInform);
  };

  return (
    <>
      {signUpModal ? (
        <Modal>
          <SignUpSuccess />
        </Modal>
      ) : null}
      <Layout>
        <div className={styles.signUp}>
          <Image
            w="300px"
            margin="100px auto 50px auto"
            alt=""
            src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.typeDiv}>
              <label htmlFor="username">아이디(Email)</label>
              <Input
                id="username"
                placeholder="Id를 입력하세요."
                {...register("username", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  maxLength: {
                    value: 15,
                    message: "15자까지 입력가능합니다.",
                  },
                  minLength: {
                    value: 3,
                    message: "2자 이상 입력하세요.",
                  },
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className={styles.typeDiv}>
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
                {...register("password", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력하세요.",
                  },
                  maxLength: {
                    value: 16,
                    message: "16자까지 입력가능합니다.",
                  },
                  pattern: {
                    value:
                      // eslint-disable-next-line
                      /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/,
                    // eslint-disable-next-line

                    message: "특수문자 1개 이상 넣어주세요.",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className={styles.typeDiv}>
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                autoComplete="off"
                {...register("passwordConfirm", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  validate: {
                    check: (val) => {
                      if (getValues("password") !== val) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                    },
                  },
                })}
              />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
            </div>
            <div className={styles.typeDiv}>
              <label htmlFor="name">성명</label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                {...register("name", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  maxLength: {
                    value: 10,
                    message: "20자까지 입력 가능합니다.",
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.typeDiv}>
              <label>생년월일</label>
              <Input
                name="birth"
                type="date"
                {...register("birth", {
                  validate: {
                    check: (val) => {
                      if (!val) {
                        return "필수 정보입니다.";
                      }
                    },
                  },
                })}
              />
              {errors.birth && <p>{errors.birth.message}</p>}
            </div>
            <div className={styles.typeDiv}>
              <label htmlFor="number">전화번호</label>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<FontAwesomeIcon icon={faPhone} />}
                  height="50px"
                />
                <Input
                  id="number"
                  type="number"
                  placeholder="전화번호를 입력하세요."
                  {...register("phone_number")}
                />
              </InputGroup>
              {errors?.phone_number && <p>{errors.phone_number?.message}</p>}
            </div>

            <div className={styles.typeDiv}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="이메일을 입력하세요"
                {...register("email", {
                  required: "필수 정보입니다.",
                  pattern: {
                    // eslint-disable-next-line
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                  maxLength: {
                    value: 40,
                    message: "40자까지 입력가능합니다.",
                  },
                })}
              />
              {errors?.email && <p>{errors.email.message}</p>}
            </div>
            <div className={styles.typeDiv}>
              <label>최애 등록</label>
              <Select
                placeholder="당신의 최애를 알려주세요."
                {...register("pick", {
                  required: "필수 입니다.",
                })}
              >
                <Option />
              </Select>
            </div>
            <ButtonGroup>
              <Button
                w="150px"
                h="50px"
                borderRadius="15px"
                type="button"
                onClick={() => navigate(-1)}
              >
                뒤로
              </Button>
              <Button w="150px" h="50px" borderRadius="15px" type="submit">
                제출
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default SignUp;
