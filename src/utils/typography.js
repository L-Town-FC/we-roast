import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"
import { ScalarLeafs } from "graphql/validation/rules/ScalarLeafs"

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography