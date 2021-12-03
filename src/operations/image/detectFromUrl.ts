const DetectFromUrlOperation = async (url: string) => {
  const response: any = await fetch(
    `${process.env.REACT_APP_SERVER_URL as string}/detectFromUrl`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url }),
    }
  );

  const data = await response.json();

  return data;
};

export default DetectFromUrlOperation;
