const UploadAndDetectOperation = async (values: any) => {
  const response: any = await fetch(
    `${process.env.REACT_APP_SERVER_URL as string}/uploadedImage`,
    {
      method: "post",
      credentials: "include",
      body: values,
    }
  );

  const data = await response.json();

  return data;
};

export default UploadAndDetectOperation;
