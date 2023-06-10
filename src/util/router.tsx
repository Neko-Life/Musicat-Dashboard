import { IComponentWithLayout } from '@/interfaces/util';

export function useDefinedComponentLayout(
  Component: IComponentWithLayout<unknown>
) {
  const renderComponent = <Component />;
  return Component.getLayout?.(renderComponent) ?? renderComponent;
}
