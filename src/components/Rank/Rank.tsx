import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import GetRankOperation from "../../operations/user/getRank";

interface RankProps {}
const Rank: React.FC<RankProps> = () => {
  const currentUser = JSON.parse(localStorage.getItem("user") as string);

  const { rank, setRank } = useContext(MyContext);

  useEffect(() => {
    const handleGetRank = async () => {
      const rank = await GetRankOperation();

      setRank(rank.rank);
    };

    handleGetRank();
  }, [setRank]);

  return (
    <Flex flexDirection="column">
      <Heading size="xl" textAlign="center" pb={4}>
        {currentUser ? `Hi ${currentUser.username}! Your rank is:` : null}
      </Heading>
      <Heading fontSize={50} textAlign="center" pb={4}>
        {`#${rank ? rank : "..."}`}
      </Heading>
    </Flex>
  );
};
export default Rank;
