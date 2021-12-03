import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import { HomePage } from "./pages/HomePage/HomePage";

interface AppPorps {}

export const MyContext = createContext<any>({
  rank: 0,
  setRank: () => {},
});

export const App: React.FC<AppPorps> = () => {
  const colorMode = useColorModeValue("light", "dark");
  const navigate = useNavigate();
  const location = useLocation();

  const [rank, setRank] = useState<number | null>();

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (!currentUser && location.pathname === "/") {
      navigate("login");
    }
  }, [navigate, location]);

  return (
    <MyContext.Provider value={{ rank, setRank }}>
      <Flex flexDirection="column" alignItems="center">
        <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={-1}>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: colorMode === "light" ? "#EDF2F7" : "#63474D",
                },
              },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onClick: {
                    enable: false,
                    mode: "push",
                  },
                  onHover: {
                    enable: false,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: colorMode === "light" ? "CF3C89" : "#F7B6CE",
                },
                links: {
                  color: colorMode === "light" ? "CF3C89" : "#F7B6CE",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 1000,
                  },
                  value: 40,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: false,
                  value: 2,
                },
              },
              detectRetina: true,
            }}
          />
        </Box>
        <Flex width="100%" flexDirection="column" alignItems="center">
          <Navigation />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Flex>
      </Flex>
    </MyContext.Provider>
  );
};
