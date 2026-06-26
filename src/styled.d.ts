import "styled-components";
import { CustomTheme } from "./services/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: CustomTheme["colors"];
  }
}
