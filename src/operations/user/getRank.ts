const GetRankOperation = async () => {
  const response: any = await fetch(
    `${process.env.REACT_APP_SERVER_URL as string}/getRank`,
    {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();

  return data;
};

export default GetRankOperation;
