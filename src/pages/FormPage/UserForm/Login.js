import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";
import Layout from "../../../UI/Layout";
import axios from "axios";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import { postLogin } from "../../../axios-settings/Axios";
import { useMutation } from "react-query";

axios.defaults.withCredentials = true;

const LogIn = () => {
  const [isValid, setIsValid] = useState("");

  useEffect(() => {}, [isValid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutateAsync: loginHandler } = useMutation((loginData) =>
    postLogin(loginData)
  );

  /**로그인 form을 제출했을 때*/
  const onSubmit = async (loginData) => {
    await loginHandler(loginData);
  };

  return (
    <Layout>
      <div className={styles.logInDiv}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
          <img className={styles.mainImg} src={choeImg} alt="" />
          <h1>로그인</h1>
          <Input
            className={styles.logInInput}
            name="email"
            placeholder="UserEmail"
            {...register("email", {
              required: "ID를 입력해주세요.",
            })}
          />
          <Input
            className={styles.logInInput}
            name="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password를 입력해주세요.",
            })}
          />
          <div className={styles.errorMessage}>
            {(errors.email && <p>{errors.email.message}</p>) ||
              (errors.password && <p>{errors.password.message}</p>) ||
              (isValid.error && <p>비밀번호가 틀렸습니다.</p>) ||
              (isValid.detail && <p>계정이 없습니다.</p>)}
          </div>
          <div className={styles.goSignUp}>
            <Button
              bg="transparent"
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Not user?
            </Button>
          </div>
          <ButtonGroup marginTop="30px">
            <Button
              w="150px"
              h="50px"
              onClick={() => {
                navigate("/");
              }}
              type="button"
            >
              홈으로
            </Button>
            <Button
              w="150px"
              h="50px"
              type="submit"
              color="white"
              colorScheme="twitter"
            >
              로그인
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </Layout>
  );
};
export default LogIn;
