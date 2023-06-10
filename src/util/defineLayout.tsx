export function defineComponentLayout(Component: any, Layout: any) {
  Component.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
}
