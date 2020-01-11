import React, { useState, useEffect } from 'react';
import MovieGrid from '../components/moviegrid';
import Search from '../components/search';

const MyRated = () => {
    let md = [];
    const [md2, setMovieData] = useState(null);

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let k = localStorage.key(i);
            let movie = localStorage.getItem(k);
            movie = JSON.parse(movie);
            if(movie.starNumber>0){
            md.push(movie);    
            }
        }
    }

    return (
        <div>
            
            <Search lang='en_us'  setMovieData={setMovieData}/>
            <hr />
            {md.length===0 && <h4><center><p>Sorry, no records found.</p> <p>Please use search to add movies to your rated page.</p></center></h4>}
            {(md && !md2) && <MovieGrid movies={md} />}
            {md2 && <MovieGrid movies={md2} />}
        </div>
    );
}

export default MyRated;