import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import LogoutOperation from "../../operations/user/logout";
import Logo from "../Logo/Logo";

interface NavigationProps {}
const Navigation: React.FC<NavigationProps> = () => {
  const color = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)");
  const currentUser = localStorage.getItem("user");

  return (
    <Flex
      position="sticky"
      top={0}
      width="100%"
      backgroundColor={color}
      justifyContent="center"
      marginBottom={4}>
      <Flex width="100%" maxW={1600} py={2}>
        <Logo />
        <Box ml="auto">
          {currentUser ? (
            <Button
              onClick={async () => {
                await LogoutOperation();
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              colorScheme="pink">
              Sign out
            </Button>
          ) : null}
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </Flex>
    </Flex>
  );
};
export default Navigation;
