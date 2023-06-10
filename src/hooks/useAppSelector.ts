import { AppState } from '@/store/store';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
