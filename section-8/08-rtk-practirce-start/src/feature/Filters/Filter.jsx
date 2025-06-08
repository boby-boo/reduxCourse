import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./filter-slice";

export const Filter = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(state => state.filter)

  const handleFilter = (value) => dispatch(setFilter(value))

  return (
    <div>
      <button onClick={() => handleFilter('all')}>all</button>
      <button onClick={() => handleFilter('active')}>active</button>
      <button onClick={() => handleFilter('completed')}>completed</button>
    </div>
  );
}