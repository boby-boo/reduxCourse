import { connect } from 'react-redux';
import { JobPosition } from './JobPosition';
import { selectVisiblePositions } from 'store/positions/position-selectors';
import { addFilter } from 'store/filters/filter-actions';
import { usePositions } from './use-positions';

const _JobList = ({positions, addFilter}) => {
  usePositions();
  const handleAddFilter = (filter) => {
    addFilter(filter);
  }

  return (
    <div className='job-list'>
      {positions.map(item => (
        <JobPosition 
          key={item.id} 
          {...item} 
          handleAddFilter={handleAddFilter}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  positions: selectVisiblePositions(state, state.filters),
})

const JobList = connect(mapStateToProps, {
  addFilter,
})(_JobList);

export {JobList};