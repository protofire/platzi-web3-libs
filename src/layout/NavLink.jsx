import { Link as DefaultLink, useColorModeValue } from "@chakra-ui/react";

const NavLink = ({ children, ...props }) => (
  <DefaultLink
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    {...props}
  >
    {children}
  </DefaultLink>
);

export default NavLink;
