import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';


export const lightTheme = responsiveFontSizes(createMuiTheme({
    direction: 'rtl',
    body: '#F5F5F5',
    text: '#363537',
    palette: {
        action: {
            selected: teal[400],
            expanded: teal[100]
        },
        primary: { main: teal[700] },
        secondary: red,
        type: 'light'
    },
}));

export const darkTheme = responsiveFontSizes(createMuiTheme({
    direction: 'rtl',
    body: '#363537',
    text: '#FAFAFA',
    palette: {
        action: {
            selected: teal[600],
            expanded: teal[100]
        },
        background: {
            default: "#363537"
        },
        text: {
            primary: "#ffffff"
        },
        primary: { main: teal[700] },
        secondary: red,
        type: 'dark'
    },
}));