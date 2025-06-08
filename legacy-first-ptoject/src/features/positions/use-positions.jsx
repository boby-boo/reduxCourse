import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addPosition, selectVisiblePositions} from "./position-slice";
import data from '../../mock/data.json';
import { selectFiltres } from "features/filter/filter-slice";

export const usePositions = () => {
    const dispatch = useDispatch();
    const currentFilters = useSelector(selectFiltres)
    const positions = useSelector((state) => selectVisiblePositions(state, currentFilters))

    useEffect(() => {
        dispatch(addPosition(data))
    }, [dispatch])

    return positions;
}