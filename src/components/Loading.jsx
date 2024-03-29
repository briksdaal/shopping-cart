import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className="my-24 flex justify-center" data-testid="loading">
      <CgSpinner className="animate-spin text-8xl text-blue-700 " />
    </div>
  );
}
