import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';

function NotFound() {
  return (
    <div>
      <h1>NotFound</h1>
    </div>
  );
}

defineComponentLayout(NotFound, AppLayout);

export default NotFound;
