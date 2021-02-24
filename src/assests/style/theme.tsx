import { createMuiTheme } from '@material-ui/core/styles';
import { CSSProperties } from 'react';

const headingStyles = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 700,
};

const themeOptions = {
    palette: {
        primary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#000000',
            contrastText: '#666666',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
    typography: {
        fontSize: 16,
        htmlFontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: headingStyles,
        h2: headingStyles,
        h3: headingStyles,
        h4: headingStyles,
        h5: headingStyles,
        h6: {
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '0.8rem',
        },
        subtitle2: {
            fontSize: '0.7rem',
        },
        body1: {},
        body2: {},
        caption: {},
        overline: {
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: 2,
        },
        button: {
            fontSize: 24,
            fontWeight: 500,
        },
    },
    spacing: [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20, 30],
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
    shape: {
        borderRadius: 6,
        left: '0%',
        center: '50%',
        right: '100%',
    },
    overrides: {
        button: {
            width: 32,
            height: 32,
        },
        northArrow: {
            width: 42,
            height: 42,
        },
        MuiFab: {
            extended: {
                padding: '0 24px',
            },
            label: {
                fontSize: '1rem',
            },
        },
    },
};

export const styles: Record<string, CSSProperties> = {
    buttonIcon: {
        width: '1em',
        height: '1em',
        display: 'inherit',
        fontSize: themeOptions.typography.button.fontSize,
        alignItems: 'inherit',
        justifyContent: 'inherit',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        flexShrink: 0,
        userSelect: 'none',
    },
};

export const theme = createMuiTheme(themeOptions);
