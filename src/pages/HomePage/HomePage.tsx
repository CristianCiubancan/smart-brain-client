import { Flex } from "@chakra-ui/layout";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm";
import Rank from "../../components/Rank/Rank";

export const HomePage = () => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="100%"
      maxWidth="600">
      <Rank />
      <ImageLinkForm />
    </Flex>
  );
};
