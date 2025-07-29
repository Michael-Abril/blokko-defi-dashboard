import React, { useState } from 'react';
import { 
  Flex, 
  Box, 
  Text, 
  Spacer, 
  HStack, 
  VStack,
  Link as ChakraLink,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
  Tooltip,
  useColorMode,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink as RouterLink } from 'react-router-dom';
import { 
  HamburgerIcon, 
  CloseIcon, 
  SunIcon, 
  MoonIcon,
  ChevronDownIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
} from '@chakra-ui/icons';

const NavLink = ({ to, children, isMobile = false }) => (
  <ChakraLink 
    as={RouterLink} 
    to={to}
    px={isMobile ? 4 : 3}
    py={isMobile ? 3 : 2}
    borderRadius="lg"
    fontWeight="500"
    color="gray.600"
    _hover={{ 
      textDecoration: 'none', 
      color: 'secondary.500',
      bg: 'glass.100',
      transform: 'translateY(-1px)',
      boxShadow: 'neon',
    }}
    _activeLink={{ 
      color: 'secondary.500', 
      fontWeight: '600',
      bg: 'glass.200',
      boxShadow: 'neon',
    }}
    transition="all 0.2s"
  >
    {children}
  </ChakraLink>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Dashboard', badge: null },
    { to: '/holdings', label: 'Holdings', badge: 'Live' },
    { to: '/bridge', label: 'Bridge', badge: null },
    { to: '/swap', label: 'Swap', badge: 'Best Rate' },
    { to: '/activity', label: 'Activity', badge: null },
    { to: '/ai-accountant', label: 'AI Agent', badge: 'Beta' },
  ];

  return (
    <>
      <Flex 
        as="header" 
        align="center" 
        px={{ base: 4, md: 6, lg: 8 }}
        py={4}
        bg={isScrolled ? 'glass.200' : 'glass.100'}
        backdropFilter="blur(20px)"
        boxShadow={isScrolled ? 'glass' : 'none'}
        borderBottom={isScrolled ? '1px solid' : 'none'}
        borderColor="glass.300"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        transition="all 0.3s ease"
      >
        {/* Logo */}
        <HStack spacing={3}>
          <Box
            w="40px"
            h="40px"
            bg="gradient.brand"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="neon"
          >
            <Text fontSize="lg" fontWeight="bold" color="white">
              B
            </Text>
          </Box>
          <VStack spacing={0} align="start">
            <Text fontSize="lg" fontWeight="bold" color="text.primary">
              Blokko
            </Text>
            <Text fontSize="xs" color="text.secondary" fontWeight="500">
              DeFi Treasury
            </Text>
          </VStack>
        </HStack>

        <Spacer />

        {/* Desktop Navigation */}
        {!isMobile && (
          <HStack spacing={1} mr={6}>
            {navItems.map((item) => (
              <Box key={item.to} position="relative">
                <NavLink to={item.to}>
                  {item.label}
                </NavLink>
                {item.badge && (
                  <Badge
                    position="absolute"
                    top="-2"
                    right="-2"
                    colorScheme="secondary"
                    variant="neon"
                    fontSize="2xs"
                    px={1}
                    py={0.5}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Box>
            ))}
          </HStack>
        )}

        {/* Right Side Actions */}
        <HStack spacing={3}>
          {/* Search Button */}
          <Tooltip label="Search">
            <IconButton
              icon={<SearchIcon />}
              variant="glass"
              size="sm"
              aria-label="Search"
            />
          </Tooltip>

          {/* Notifications */}
          <Tooltip label="Notifications">
            <IconButton
              icon={<BellIcon />}
              variant="glass"
              size="sm"
              aria-label="Notifications"
              position="relative"
            >
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="error"
                variant="solid"
                fontSize="2xs"
                borderRadius="full"
                w="4"
                h="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                3
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="glass"
              size="sm"
              aria-label="Toggle theme"
            />
          </Tooltip>

          {/* Settings */}
          <Tooltip label="Settings">
            <IconButton
              icon={<SettingsIcon />}
              variant="glass"
              size="sm"
              aria-label="Settings"
            />
          </Tooltip>

          {/* Connect Wallet */}
          <Box
            sx={{
              '.rainbow-kit-connect': {
                bg: 'glass.200',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'glass.300',
                borderRadius: 'lg',
                _hover: {
                  bg: 'glass.300',
                  borderColor: 'secondary.500',
                  boxShadow: 'neon',
                },
              },
            }}
          >
            <ConnectButton />
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              icon={<HamburgerIcon />}
              variant="glass"
              size="sm"
              onClick={onOpen}
              aria-label="Open menu"
            />
          )}
        </HStack>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay bg="background.overlay" backdropFilter="blur(10px)" />
        <DrawerContent bg="glass.100" backdropFilter="blur(20px)" borderLeft="1px solid" borderColor="glass.300">
          <DrawerHeader borderBottom="1px solid" borderColor="glass.300">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold" color="text.primary">
                Menu
              </Text>
              <IconButton
                icon={<CloseIcon />}
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close menu"
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody pt={6}>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <Box key={item.to} position="relative">
                  <NavLink to={item.to} isMobile>
                    {item.label}
                  </NavLink>
                  {item.badge && (
                    <Badge
                      position="absolute"
                      top="2"
                      right="2"
                      colorScheme="secondary"
                      variant="neon"
                      fontSize="2xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;