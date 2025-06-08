import { FilterPanel } from 'features/filter/FilterPanel';
import { JobList } from 'features/positions/JobList';
import { TheHeader } from 'components/TheHeader';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  return (
    <>
     <TheHeader />
     <div className='container'>
      <FilterPanel />
      <JobList />
     </div>
    </>
  );
}

export default App;
