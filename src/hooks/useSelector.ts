import useAppSelector from './useAppSelector';

export function useMainSelector() {
  return useAppSelector((state) => state.main);
}
