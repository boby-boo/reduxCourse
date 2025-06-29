import { Info } from './Info';
import { useDetails } from './use-details';

export const CountryDetails = ({ name = '', navigate }) => {
    const {currentCountry, error, status} = useDetails(name);

    return (
        <div>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {currentCountry && <Info push={navigate} {...currentCountry} />}
        </div>
    )
}