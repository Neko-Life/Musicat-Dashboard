import ConsoleGreet from '@/components/ConsoleGreet';

export function setStateNull<T>(state: T) {
  state = Object.create(null);
}

export function renderConsoleGreet() {
  return <ConsoleGreet />;
}
