import '@testing-library/jest-dom';

import { vi } from 'vitest';
import type { SVGProps } from 'react';

vi.mock('../assets/pokeball.svg?react', () => ({
  default: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} />
  ),
}));
