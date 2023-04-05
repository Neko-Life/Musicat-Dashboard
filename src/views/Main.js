import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../util/navigators';

export default function Main() {
  setNavigator('landing', useNavigate());

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
