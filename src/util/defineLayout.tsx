import { IComponentWithLayout } from '@/interfaces/util';

export function defineComponentLayout<P>(
  Component: IComponentWithLayout<P>,
  Layout: React.FC<{ children: React.ReactNode } & unknown>
) {
  Component.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
}
