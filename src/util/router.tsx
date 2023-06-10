export function useDefinedComponentLayout(Component: any) {
  const renderComponent = <Component />;
  return Component.getLayout?.(renderComponent) ?? renderComponent;
}
