import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import InputField from "../InputField/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import LoginOperation from "../../operations/user/login";
import { useNavigate } from "react-router";

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const data = await LoginOperation(values);

        if (data.errors) {
          setErrors(toErrorMap(data.errors));
        } else if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/";
        }
      }}>
      {({ isSubmitting }) => (
        <Box
          padding={5}
          pt={0}
          borderRadius={10}
          borderWidth={1}
          boxShadow="2xl">
          <Form>
            <Box mt={4}>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Text mt={2}>
              Don't have an account?{" "}
              <Link
                onClick={() => {
                  navigate("/register", { replace: true });
                }}>
                Register
              </Link>
            </Text>
            <Button
              width="100%"
              isLoading={isSubmitting}
              type="submit"
              colorScheme="pink"
              mt={4}>
              Login
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
