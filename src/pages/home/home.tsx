import { UncontrolledFrom } from '../../components/forms/uncontrolledFrom';
import { Modal } from '../../components/ui/modal';

export function Home() {
  return (
    <main
      className="
        relative flex grow flex-col items-center justify-center gap-3 border-2
        border-y-0 border-(--border) bg-(--bg)
      "
    >
      <h2>Registration</h2>
      <div className="flex gap-6">
        <Modal title={'Register'} buttonContent={'Uncontrolled form'}>
          <UncontrolledFrom />
        </Modal>
      </div>
    </main>
  );
}

export default Home;
