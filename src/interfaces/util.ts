export interface IComponentWithLayout<P> extends React.FC<P> {
  getLayout?: (page: JSX.Element) => JSX.Element;
}
