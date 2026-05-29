import { Button } from '../ui/button/button';

type PaginationProps = {
  page: number;
  onPageChange: (value: number) => void;
};

export function Pagination({ page, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-5">
      <Button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className=""
      >
        Prev
      </Button>
      <span>{page}</span>
      <Button onClick={() => onPageChange(page + 1)}>Next</Button>
    </div>
  );
}
