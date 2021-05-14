import React from "react";
import { Box, Center, Icon, Link, useColorMode } from "@chakra-ui/react";
import { FaTwitter, FaReddit } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box height="50px" marginTop="-65px">
      <Center>
        <Icon
          as={FaTwitter}
          w={5}
          h={5}
          mx={4}
          color={colorMode == "light" ? "gray.600" : "purple.400"}
          cursor="pointer"
          onClick={() =>
            window.open(
              "http://twitter.com/share?text=Hey! Check out Twitch Recon! It lets you sync twitch vods across various channels&url=https://twitchrecon.com&hashtags=twitchrecon",
              "_blank"
            )
          }
        />
        <Icon
          as={FaReddit}
          w={5}
          h={5}
          mx={4}
          color={colorMode == "light" ? "gray.600" : "purple.400"}
          cursor="pointer"
          onClick={() =>
            window.open(
              "http://www.reddit.com/submit?url=https://twitchrecon.com/&title=Check%20out%20twitchrecon!",
              "_blank"
            )
          }
        />
      </Center>
      <Center ml="10px" mt="10px" fontSize="11px" float="left">
        Made with ❤️ by{" "}
        <Link
          color={colorMode == "light" ? "gray.600" : "purple.400"}
          href="https://twitter.com/Gr33nLight_"
        >
          Gr33nLight
        </Link>
      </Center>
    </Box>
  );
};

export default Footer;
