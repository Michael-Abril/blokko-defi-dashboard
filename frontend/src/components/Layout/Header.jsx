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
  Button
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink as RouterLink } from 'react-router-dom';
import { 
  HamburgerIcon, 
  CloseIcon, 
  SunIcon, 
  MoonIcon,
  ChevronDownIcon,
  SettingsIcon
} from '@chakra-ui/icons';

const NavLink = ({ to, children, isMobile = false }) => (
  <ChakraLink 
    as={RouterLink} 
    to={to}
    px={isMobile ? 4 : 3}
    py={isMobile ? 3 : 2}
    borderRadius="lg"
    fontWeight="500"
    color="text.secondary"
    _hover={{ 
      textDecoration: 'none', 
      color: 'brand.500',
      bg: 'surface.50',
      transform: 'translateY(-1px)',
      boxShadow: 'soft.sm'
    }}
    _activeLink={{ 
      color: 'brand.500', 
      fontWeight: '600',
      bg: 'brand.50',
      boxShadow: 'soft.md'
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
        bg={isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'white'}
        backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
        boxShadow={isScrolled ? 'lg' : 'soft.md'}
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        transition="all 0.3s ease"
        className="animate-fade-in"
      >
        {/* Logo */}
        <Flex align="center" className="animate-slide-left">
          <Box
            w="40px"
            h="40px"
            bg="gradient.brand"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={3}
            className="animate-glow"
          >
            <Text fontSize="lg" fontWeight="800" color="white">B</Text>
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="800" color="text.primary">
              Blokko
            </Text>
            <Text fontSize="xs" color="text.tertiary" fontWeight="500">
              DeFi Dashboard
            </Text>
          </VStack>
        </Flex>

        <Spacer />

        {/* Desktop Navigation */}
        <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
          {navItems.map((item) => (
            <Box key={item.to} position="relative">
              <NavLink to={item.to}>
                {item.label}
              </NavLink>
              {item.badge && (
                <Badge
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  colorScheme={item.badge === 'Live' ? 'success' : item.badge === 'Best Rate' ? 'brand' : 'warning'}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  py={0.5}
                  className="animate-pulse"
                >
                  {item.badge}
                </Badge>
              )}
            </Box>
          ))}
        </HStack>

        <Spacer />

        {/* Right side controls */}
        <HStack spacing={3} className="animate-slide-right">
          {/* Theme toggle */}
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="neumorphic"
              size="sm"
              onClick={toggleColorMode}
              className="hover:scale-105"
            />
          </Tooltip>

          {/* Settings */}
          <Tooltip label="Settings">
            <IconButton
              aria-label="Settings"
              icon={<SettingsIcon />}
              variant="neumorphic"
              size="sm"
              className="hover:scale-105"
            />
          </Tooltip>

          {/* Connect Wallet */}
          <Box className="hover:scale-105">
            <ConnectButton />
          </Box>

          {/* Mobile menu button */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="neumorphic"
            size="sm"
            display={{ base: 'flex', lg: 'none' }}
            onClick={onOpen}
            className="hover:scale-105"
          />
        </HStack>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg="surface.50">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="surface.200">
            <Flex align="center">
              <Box
                w="32px"
                h="32px"
                bg="gradient.brand"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={3}
              >
                <Text fontSize="md" fontWeight="800" color="white">B</Text>
              </Box>
              <Text fontSize="lg" fontWeight="700" color="text.primary">
                Blokko
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody pt={6}>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <Box key={item.to} position="relative">
                  <NavLink to={item.to} isMobile={true}>
                    {item.label}
                  </NavLink>
                  {item.badge && (
                    <Badge
                      position="absolute"
                      top="50%"
                      right="16px"
                      transform="translateY(-50%)"
                      colorScheme={item.badge === 'Live' ? 'success' : item.badge === 'Best Rate' ? 'brand' : 'warning'}
                      fontSize="xs"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Box>
              ))}
              
              {/* Additional mobile-only items */}
              <Box pt={4} borderTopWidth="1px" borderColor="surface.200">
                <VStack spacing={2} align="stretch">
                  <NavLink to="/transactions" isMobile={true}>
                    Transactions
                  </NavLink>
                  <NavLink to="/allocation" isMobile={true}>
                    Allocation
                  </NavLink>
                  <NavLink to="/discovery" isMobile={true}>
                    Discovery
                  </NavLink>
                  <NavLink to="/academy" isMobile={true}>
                    Academy
                  </NavLink>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;