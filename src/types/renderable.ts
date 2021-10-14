export type RenderableType = JSX.Element | JSX.Element[] | string | number | null | ((props: Record<string, unknown>) => RenderableType);

export default RenderableType;
