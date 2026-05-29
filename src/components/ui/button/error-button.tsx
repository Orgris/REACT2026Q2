import { Button } from './button';
import { setError } from '../../../store/errorButton/errorButtonSlice';
import { hasErrorOccured } from '../../../store/errorButton/errorButtonSelectors';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';

export function ErrorButton() {
  const errorOccured = useAppSelector(hasErrorOccured);
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
