const LoginOperation = async (values: any) => {
  const response: any = await fetch(
    `${process.env.REACT_APP_SERVER_URL as string}/login`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export default LoginOperation;
