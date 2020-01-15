import * as StyleThings from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

const {
    createGlobalStyle,
    ThemeProvider,
    default: styled,
    keyframes
} = StyleThings as ThemedStyledComponentsModule<ITheme>;

export { createGlobalStyle, ThemeProvider, keyframes };
export default styled; 