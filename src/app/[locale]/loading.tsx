import { Spinner } from '../../components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center self-center">
      <Spinner className="w-1/3 text-(--bg)!" />
    </div>
  );
}
