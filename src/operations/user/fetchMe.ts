const fetchMe = async (cookie: string | null = null) => {
  const response: any = await fetch(
    `${process.env.REACT_APP_SERVER_URL as string}/me`,
    {
      method: "get",
      headers: cookie
        ? { "Content-Type": "application/json", cookie: cookie }
        : { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();

  return data;
};

export default fetchMe;
