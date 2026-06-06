import { useState } from 'react';
import { UncontrolledFrom } from '../../components/forms/uncontrolledFrom';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';

export function Home() {
  const [showUncontrolledModal, setshowUncontrolledModal] = useState(true);

  const handleUncontrolledClick = () => {
    setshowUncontrolledModal(true);
  };

  return (
    <main
      className="
        relative flex grow flex-col items-center justify-center gap-3 border-2
        border-y-0 border-(--border) bg-(--bg)
      "
    >
      <h2>Registration</h2>
      <div className="flex gap-6">
        <Button onClick={handleUncontrolledClick}>Uncontrolled form</Button>
        {showUncontrolledModal && (
          <Modal
            onClose={() => setshowUncontrolledModal(false)}
            title={'Register'}
          >
            <UncontrolledFrom />
          </Modal>
        )}
      </div>
    </main>
  );
}

export default Home;
