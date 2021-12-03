import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Text, Link } from "@chakra-ui/react";
import RegisterOperation from "../../operations/user/register";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../InputField/InputField";
import { useNavigate } from "react-router";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const data = await RegisterOperation(values);
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
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
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
              Already have an account?{" "}
              <Link
                onClick={() => {
                  navigate("/login", { replace: true });
                }}>
                Login
              </Link>
            </Text>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="pink"
              mt={4}
              width="100%">
              Register
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default Register;
