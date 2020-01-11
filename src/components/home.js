import React, { useState, useEffect } from 'react';
import SelectType from '../components/selecttype';
import movieMaker from './moviemaker';
import MovieGrid from './moviegrid';
import Search from '../components/search';

const Home = (props) => {
    const [md, setMovieData] = useState(null);
    const [choise, setChoise] = useState(props.choise);
    

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${choise}?api_key=a7913b39e5e5965bc0611cad50321e2a&page=1`);
            let data = await res.json();
            setMovieData(movieMaker(data.results));
        }
        fetchMovie();
    }, [choise])

    const handleChangeType = (choise) => {
        setChoise(choise);
    }
   
    return (
        <main>
            <div className="inline">&nbsp;&nbsp;&nbsp;
            <Search setMovieData={setMovieData}/>
            <div className="optionGroup">
            <SelectType choise={choise} handleChangType={handleChangeType} />
            
            </div>
            </div>
            <hr />
            <div className='gridwrap'>
            {md && <MovieGrid movies={md} />}
            </div>
        </main>
    );
}

Home.defaultProps = {
    choise: 'popular',
    lang: 'en_us',
    search: ''
}
export default Home;