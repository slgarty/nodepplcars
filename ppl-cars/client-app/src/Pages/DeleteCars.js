import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarRow from '../components/CarRow';
import { Link, useHistory, useParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const DeleteCars = () => {

    const [cars, setCars] = useState([]);
    const [searchText, setSearchText] = useState('');

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const getCars = async () => {
            const { personId } = params;
            const { data } = await axios.get(`/api/peoplecars/getcars?id=${personId}`);
            setCars(data);
        }
        getCars();
    }, []);

    const onDeleteAllClick = async () => {
        const { personId } = params;
        await axios.post(`/api/peoplecars/deletecars?id=${personId}`);
        history.push('/');
    }

    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <SearchBox
                searchText={searchText}
                onTextChange={e => setSearchText(e.target.value)}
                onClearClick={() => setSearchText("")}
                placeholder="Search Cars"
            />
            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars
                                .filter(c => `${c.make.toLowerCase()} ${c.model.toLowerCase()}`.includes(searchText))
                                .map(c => <CarRow car={c} key={c.id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Are you sure you want to delete all of these cars?</h3>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button className='btn btn-primary btn-lg btn-block'>No</button>
                    </Link>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <button onClick={onDeleteAllClick} className='btn btn-danger btn-lg btn-block'>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCars;