export const getValueFromInput = (
  ref: React.RefObject<HTMLInputElement | HTMLSelectElement | null>
) => ref.current?.value ?? '';
