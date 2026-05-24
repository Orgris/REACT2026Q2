import { Button } from './button';
import { setError } from '../../app/errorButtonSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';

export function ErrorButton() {
  const errorOccured = useAppSelector(
    (state) => state.errorButton.errorOccured
  );
  const dispatch = useAppDispatch();

  const onClickButton = () => {
    dispatch(setError());
  };

  if (errorOccured) {
    throw new Error('Test error');
  }

  return (
    <Button data-testid="error-btn" onClick={onClickButton}>
      Click me!
    </Button>
  );
}
