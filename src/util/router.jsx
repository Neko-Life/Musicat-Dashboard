export function useDefinedComponentLayout(Component) {
  const renderComponent = <Component />;
  return Component.getLayout?.(renderComponent) ?? renderComponent;
}
