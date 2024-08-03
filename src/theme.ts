// theme.ts
import { extendTheme } from '@chakra-ui/react';

// Define your custom colors and theme variables
const theme = extendTheme({
    config: {
        initialColorMode: "dark", // Set the initial color mode to "dark"
        useSystemColorMode: false, // Disable system color mode
    },
    fonts: {
        heading: "'PP Neue Montreal', sans-serif",
        body: "'PP Neue Montreal', sans-serif",
    },
    colors: {
        brand: {
            dark_grey: '#070708',
            white: '#FFFFFF'
        },
        // Add more custom colors if needed
    },
    fontSizes: {
        xl: '1.25rem',
        '2xl': '1.5rem',
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: 'md',
            },
            sizes: {
                lg: {
                    fontSize: 'lg',
                    px: '8',
                    py: '6',
                },
            },
        },
        // Customize other components if needed
    },
});

export default theme;
