// Interfaces
import { ExtraProps } from "../types";

const Extra = (props: ExtraProps) => props;
Extra.type = "extra";
export default (Extra as unknown) as React.FC<ExtraProps>;
