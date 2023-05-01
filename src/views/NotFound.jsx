import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../util/navigators';

export default function NotFound() {
  setNavigator('landing', useNavigate());

  return (
    <div>
      <h1>NotFound</h1>
    </div>
  );
}
