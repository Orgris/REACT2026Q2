export const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === 'object' && 'error' in err)
    return String(err.error);
  if (err && typeof err === 'object' && 'message' in err)
    return String(err.message);
  return 'Unexpected error';
};
