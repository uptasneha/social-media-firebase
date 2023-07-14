import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const light = '#f7f7f7';
const dark = '#1A202c';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
});

export default theme;
