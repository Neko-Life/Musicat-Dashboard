export function defineComponentLayout(Component, Layout) {
  Component.getLayout = (page) => <Layout>{page}</Layout>;
}
