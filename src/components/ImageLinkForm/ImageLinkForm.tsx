import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { MyContext } from "../../App";
import { useDropzone } from "react-dropzone";
import DetectFromUrlOperation from "../../operations/image/detectFromUrl";
import ColourfulBox from "../ColourfulBox/colourfulBox";
import UploadAndDetectOperation from "../../operations/image/detectFromUploadedImage";

interface ImageLinkFormProps {}
const ImageLinkForm: React.FC<ImageLinkFormProps> = () => {
  const colorMode = useColorModeValue("light", "dark");
  const [image, setImage] = useState<string | null>();
  const [boxes, setBoxes] = useState<any[]>([]);

  const { setRank } = useContext(MyContext);

  const handleDetect = useCallback(
    async (clarifaiFaces: any) => {
      const img = document.getElementById("inputimage") as HTMLImageElement;
      const width = Number(img.width);
      const height = Number(img.height);
      let boxesArray: any[] = [];

      for (let face of (clarifaiFaces as any).facesArray) {
        const box = {
          topRow: face[0] * height,
          leftCol: face[1] * width,
          bottomRow: height - face[2] * height,
          rightCol: width - face[3] * width,
        };

        boxesArray.push(box);
      }

      setBoxes(boxesArray);
      setRank(parseInt((clarifaiFaces as any).newRank.rank));
    },
    [setRank]
  );

  const onDrop = useCallback(
    async ([file]) => {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("file", file);
      await setImage(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }).preview
      );

      const clarifaiFaces = await UploadAndDetectOperation(formData);
      await handleDetect(clarifaiFaces);
    },
    [handleDetect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: false,
  });

  return (
    <Flex
      flexDirection="column"
      w="100%"
      p={2}
      justifyContent="center"
      alignItems="center">
      <Heading textAlign="center" size="l" pb={4}>
        This Magic Brain will detect faces in your photos.
      </Heading>
      <ColourfulBox>
        <Flex>
          <Input
            onChange={async (e) => {
              let img = new Image();
              img.src = e.target.value;
              img.onload = function () {
                setImage(e.target.value);
              };

              img.onerror = function () {
                if (image !== null) {
                  setImage(null);
                }
              };
            }}
            type="url"
            colorScheme="pink"
            backgroundColor={colorMode === "light" ? "white" : "#533C41"}
          />
          <Button
            onClick={async () => {
              if (image) {
                const clarifaiFaces = await DetectFromUrlOperation(image);
                handleDetect(clarifaiFaces);
              }
            }}
            ml={2}
            colorScheme="pink">
            <Text paddingX={2}> Detect from URL</Text>
          </Button>
        </Flex>
      </ColourfulBox>
      <Box mt={4} fontWeight="bold">
        OR
      </Box>
      <Box w="100%" my={4} {...getRootProps()}>
        <ColourfulBox>
          <Button borderRadius={10} colorScheme="pink" w="100%">
            <Text>Upload an image and detect faces</Text>
            <input name="imageUrl" {...getInputProps()} />
          </Button>
        </ColourfulBox>
      </Box>
      {image ? (
        <Box position="relative">
          <img
            id="inputimage"
            alt="img"
            style={{ width: "100%" }}
            src={image}
          />
          {boxes.map((box) => (
            <Box
              key={box.topRow + box.rightCol}
              className="bounding-box"
              position="absolute"
              boxShadow="0 0 0 3px #149df2 inset"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              cursor="pointer"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}></Box>
          ))}
        </Box>
      ) : null}
    </Flex>
  );
};
export default ImageLinkForm;
