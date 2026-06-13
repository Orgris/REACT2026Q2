import type { UserData } from '../types/types';

type UserCardProps = {
  user: UserData;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div
      className={`
        flex flex-col gap-4 rounded-lg border bg-(--bg) p-6 font-(--sans)
        text-(--text) transition-all duration-300 ease-out
        last:border-(--accent)
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className="
            size-14 shrink-0 overflow-hidden rounded-full border-2
            border-(--accent-border) bg-(--accent-bg)
          "
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="size-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://placehold.co/100x100/2e303a/c084fc?text=?';
            }}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg/tight text-(--text-h)">{user.name}</h3>
          <div className="flex justify-center gap-2 text-xs">
            <span>Age: {user.age}</span>
            <span className="opacity-40">•</span>
            <span>Gender: {user.gender}</span>
            <span className="opacity-40">•</span>
            <span>Country: {user.country}</span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-(--border)" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-wider uppercase opacity-60">
            Email
          </span>
          <span className={`truncate text-sm text-(--text-h)`}>
            {user.email}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-wider uppercase opacity-60">
            Password
          </span>
          <span className={`truncate text-sm text-(--text-h)`}>
            {user.password}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-(--border)" />

      <div className="flex items-center justify-between">
        <span className="text-xs tracking-wider uppercase opacity-70">
          Terms & Conditions:
        </span>
        <span
          className={`
            inline-flex items-center gap-1.5 rounded-full border
            border-(--accent-border) bg-(--accent-bg) px-2.5 py-1 text-xs
            font-medium text-(--accent) transition-colors
          `}
        >
          {user.terms ? (
            <>
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Accepted
            </>
          ) : (
            'Not accepted'
          )}
        </span>
      </div>
    </div>
  );
}
