import { ControlledForm } from '../../components/forms/controlledFrom';
import { UncontrolledFrom } from '../../components/forms/uncontrolledFrom';
import { Modal } from '../../components/ui/modal';
import { UserCard } from '../../components/user-card';
import { useAppSelector } from '../../hooks/hooks';
import { selectUsers } from '../../store/user/appSelectors';

export function Home() {
  const users = useAppSelector(selectUsers);

  return (
    <main
      className="
        relative flex grow flex-col items-center justify-center gap-6 border-2
        border-y-0 border-(--border) bg-(--bg) p-6
      "
    >
      <section
        className="
          flex w-fit flex-col gap-3 rounded-lg border-3 border-(--border) p-6
        "
      >
        <h2 className="m-0 border-b-3 border-(--border) pb-3">Registration</h2>
        <div className="flex gap-6">
          <Modal
            title={'Registration controlled'}
            buttonContent={'Controlled form'}
          >
            <ControlledForm />
          </Modal>
          <Modal
            title={'Registration uncontrolled'}
            buttonContent={'Uncontrolled form'}
          >
            <UncontrolledFrom />
          </Modal>
        </div>
      </section>

      <section
        className="
          flex size-full grow flex-col items-center gap-3 rounded-lg border-3
          border-(--border) p-6
        "
      >
        <h2 className="m-0 w-1/2 border-b-3 border-(--border) pb-3">History</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
