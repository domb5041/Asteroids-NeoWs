import axios from 'axios';

const getData = () => {
    axios
        .get(
            'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-02-01&end_date=2021-02-07&api_key=aKGF3JhSHt1jCVbfXtajzH17NdWtIDg2m59HEOqn'
        )
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

export default function App() {
    return (
        <div className='App'>
            <button onClick={getData}>get</button>
        </div>
    );
}
