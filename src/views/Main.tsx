import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';

function Main() {
  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}

defineComponentLayout(Main, AppLayout);

export default Main;
