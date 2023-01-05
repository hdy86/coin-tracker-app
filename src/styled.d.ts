import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    bgOpacity1: string;
    bgOpacity2: string;
    textColor: string;
    accentColor1: string;
    accentColor2: string;
  }
}
