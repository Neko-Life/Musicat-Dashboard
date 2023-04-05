import { useNavigate } from 'react-router-dom';
import navigators from '../util/navigators';

export default function Main() {
  navigators.landing = useNavigate();

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
