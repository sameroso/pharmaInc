// Imports
import Container from "./parts/Container";
import _Column from "./parts/Column";
import _Extra from "./parts/Extra";

// Bind parts inside of the element
Container.Column = _Column;
Container.Extra = _Extra;

// Exports
export default Container;
export const Column = _Column;
export const Extra = _Extra;
