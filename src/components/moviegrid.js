import React from 'react';
import NoPic from '../images/noposter.jpg'
import { Link, Redirect } from 'react-router-dom';

const imagePath = 'https://image.tmdb.org/t/p/w342';

const makeGrid = (arr) => {
    
    return arr.map((item, i) => {
        const handlePoster = (poster) => {
            if (poster != null) {
                return <img src={`${imagePath}${item.poster}`} className="card-img-top" alt={`${item.title}`} />
            } else {
                return <img src={NoPic} className="card-img-top" alt={`${item.title}`} />
            }
        }
        return (
            <div key={i} className="card pl-2 pr-2">
                <Link to={`/detail${item.poster}/${item.id}/${item.title}/${item.releaseDate}/${item.rating}/${item.summary}`} className="gallery-item"><div>{handlePoster(item.poster)}</div></Link>
                <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">Release at: {item.releaseDate}</p>
                    <p className="card-text">Rating: {item.rating}</p>
                    <small className="card-text">{item.summary}</small>
                </div>
                <div className="card-footer">
                <Link to={`/detail${item.poster}/${item.id}/${item.title}/${item.releaseDate}/${item.rating}/${item.summary}`} className="gallery-item">
                    <div className="moreinfo">
                        <button>More Info</button>
                    </div>
                </Link>
                </div>
            </div>
        );
    });
}

const MovieGrid = (props) => {

    return (

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {makeGrid(props.movies)}
        </div>

    );
}



export default MovieGrid;