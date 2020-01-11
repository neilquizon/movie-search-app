import React, { useState, useEffect } from 'react';
import movieMake from './moviemaker';

const Search = (props) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchSearch = async () => {
            if (search != '') {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a7913b39e5e5965bc0611cad50321e2a&language=${props.lang}&query=${search}&page=1`);
                let data = await res.json();
                props.setMovieData(movieMake(data.results));
            }
        }
        fetchSearch();
    }, [search,props.lang])

    const handleSearch = (search) => {
        setSearch(search)
    }

    const handleSearchBox=(e)=>{
        e.preventDefault();
        let searching=e.target.elements.searching.value;
        handleSearch(searching);
    }
    return (
        <form onSubmit={handleSearchBox}>
            <input name="searching" placeholder='movie name'></input>
            <button className="search">Search</button>
        </form>


    );
}
export default Search;