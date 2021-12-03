import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import Brain from "./Brain.png";
import WhiteBrain from "./WhiteBrain.png";

interface LogoProps {}
const Logo: React.FC<LogoProps> = () => {
  const logoColor = useColorModeValue("black", "white");
  return (
    <Box ml={2} boxSize={10}>
      {logoColor === "black" ? (
        <Image src={Brain} />
      ) : (
        <Image src={WhiteBrain} />
      )}
    </Box>
  );
};
export default Logo;
