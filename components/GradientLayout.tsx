import { FC, ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

interface IGradientLayoutProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: string;
  roundedImage?: boolean;
  children?: ReactNode;
}

export const GradientLayout: FC<IGradientLayoutProps> = ({
  image,
  title,
  subtitle,
  description,
  color,
  roundedImage,
  children,
}) => {
  return (
    <Box
      overflowY="auto"
      height="calc(100vh - 100px)"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} align="end" padding="40px">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundedImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text casing="uppercase" fontWeight="bold" fontSize="x-small">
            {subtitle}
          </Text>
          <Text fontWeight="bold" fontSize="6xl">
            {title}
          </Text>
          <Text fontSize="x-small"> {description} </Text>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};
