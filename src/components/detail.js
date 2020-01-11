import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NoPic from '../images/noposter.jpg';
import RedHeart from '../images/redheart.png';
import GreyHeart from '../images/greyheart.png';
import NoHeart from '../images/noheart.png';
import Search from '../components/search';
import MovieGrid from '../components/moviegrid';

const Detail = (props) => {
    const [md3, setMovieData] = useState(null);

    let themovie = {
        poster: '/' + props.match.params.poster,
        id: props.match.params.id,
        title: props.match.params.title,
        releaseDate: props.match.params.releaseDate,
        rating: props.match.params.rating,
        summary: props.match.params.summary,
        like: '',
        starNumber: 0
    }
    const imagePath = 'https://image.tmdb.org/t/p/w342';
    let likeshow = '';
    var searchmovieinit;
    let arrredinit=[];
    let arrgreyinit=[];

    searchmovieinit = localStorage.getItem(themovie.id);
    searchmovieinit = JSON.parse(searchmovieinit);
    if (searchmovieinit && searchmovieinit.like === 'Like') {
        likeshow = 'Dislike';
    } else {
        likeshow = 'Like';
    }
    let initlength;
    searchmovieinit?initlength=searchmovieinit.starNumber:initlength=0;
    for (let i=0;i<initlength;i++){
        arrredinit.push(1);
    }
    for (let i=0;i<(5-initlength);i++){
        arrgreyinit.push(1);
    }

    const [likeShow, setLikeShow] = useState('');
    useEffect(() => {
     let   searchmovie = localStorage.getItem(themovie.id);
        searchmovie = JSON.parse(searchmovie);
        if (likeShow === 'Dislike' && (!searchmovie)) {
            themovie.like = 'Like';
            let item = JSON.stringify(themovie);
            localStorage.setItem(themovie.id, item);
            setRenew('Dislike');
        }else if(likeShow === 'Dislike' && (searchmovie.like === '' || searchmovie.like === "Dislike")){
            let item=localStorage.getItem(themovie.id);
            item=JSON.parse(item);
            item.like = 'Like';
            item = JSON.stringify(item);
            localStorage.setItem(themovie.id, item);
            setRenew('Dislike');
        }else if (likeShow === 'Like' && searchmovie) {
            let item=localStorage.getItem(themovie.id);
            item=JSON.parse(item);
            item.like = 'Dislike';
            item = JSON.stringify(item);
            localStorage.setItem(themovie.id, item);
            setRenew('Like');
        }
    }, [likeShow])

    const [renew, setRenew] = useState(likeshow);

    const handleLike = (e) => {
        e.preventDefault();
        let likevalue = e.target.value;
        if (likevalue === 'Like') {
            likevalue = 'Dislike';
        } else if (likevalue === 'Dislike') {
            likevalue = 'Like';
        }
        setLikeShow(likevalue);
    }

    const handlePoster = (poster) => {
        if (poster != null) {
            return <img src={`${imagePath}${poster}`} className="card-img-top" alt={`${themovie.title}`} />
        } else {
            return <img src={NoPic} className="card-img-top" alt={`${themovie.title}`} />
        }
    }

    const [arrRed, setarrRed] = useState(arrredinit);
    const [arrGrey, setarrGrey] = useState(arrgreyinit);
    let totalIndex;
    
    const handleClickGrey=(greyindex)=>{
        totalIndex=greyindex+arrRed.length+1;
        let greylength=5-totalIndex;
        let redlength=totalIndex;
        let arrG=[];
        let arrR=[];
        for (let i=0;i<greylength;i++){
            arrG.push(1);
        }
        for (let i=0;i<redlength;i++){
            arrR.push(1);
        }
        setarrGrey(arrG);
        setarrRed(arrR);

        let item=localStorage.getItem(themovie.id);
        item=JSON.parse(item);
        if(item){
        item.starNumber = arrR.length;
        item = JSON.stringify(item);
        localStorage.setItem(themovie.id, item); 
        }else{
            themovie.starNumber=arrR.length;
            item = JSON.stringify(themovie);
            localStorage.setItem(themovie.id, item);
        }
        }

    const handleClickRed=(redindex)=>{
        let redlength=redindex+1;
        let greylength=5-redlength;
        let arrG=[];
        let arrR=[];
        for (let i=0;i<greylength;i++){
            arrG.push(1);
        }
        for (let i=0;i<redlength;i++){
            arrR.push(1);
        }
        setarrGrey(arrG);
        setarrRed(arrR);

        let item=localStorage.getItem(themovie.id);
        item=JSON.parse(item);
        if(item){
            item.starNumber = arrR.length;
            item = JSON.stringify(item);
            localStorage.setItem(themovie.id, item); 
            }else{
                themovie.starNumber=arrR.length;
                item = JSON.stringify(themovie);
                localStorage.setItem(themovie.id, item);
            }
    }

    const handleClickNoHeart=()=>{
        setarrGrey([1,1,1,1,1]);
        setarrRed([]);
        let item=localStorage.getItem(themovie.id);
        item=JSON.parse(item);
        if(item){
            item.starNumber = 0;
            item = JSON.stringify(item);
            localStorage.setItem(themovie.id, item); 
            }else{
                themovie.starNumber=0;
                item = JSON.stringify(themovie);
                localStorage.setItem(themovie.id, item);
            }
    }
    
    
const handleNoHeart=()=>{
    return <a href='#' onClick={() => {handleClickNoHeart() }}><img src={NoHeart} width="20"/></a>
}

    const handleRedHeart = (arrRed) => {
        const items = arrRed.map((item, i) => <a href='#' onClick={() => {handleClickRed(i) }}><img src={RedHeart} width="20" /></a>);
        return items;
    }
    const handleGreyHeart = (arrGrey) => {
        const items = arrGrey.map((item, i) => <a href='#' onClick={() => { handleClickGrey(i) }}><img src={GreyHeart} width="20" /></a>);
        return items;
    }

console.log(md3);

    return (
        <main>
            <Search lang='en_us'  setMovieData={setMovieData}/>
            <hr/>
            {<div className="container">
                <div className="movieDetail">
                    <div>{handlePoster(themovie.poster)}</div>
                    <div className="card-body detailcard">
                        <h5 className="card-title">Title: {themovie.title}</h5>
                        <h6 className="card-title">Release Date: {themovie.releaseDate}</h6>
                        <h6 className="card-title">Rating: {themovie.rating}</h6>
                        <h6>Summary: </h6>
                        <p className="card-text">{themovie.summary}</p>
                    </div>
                </div>
                <form >
                    <h5>Add this movie to your My Favourites?</h5>
                    <button type="submit" name='isLike' className="btn btn-success" value={renew} onClick={handleLike}>{renew}</button>
                    <h5><br />How would you rate this movie?</h5>
                    {handleNoHeart()}
                    {handleRedHeart(arrRed)}
                    {handleGreyHeart(arrGrey)}
                </form>

                <Link className="goback" to="/" className="">Back to Home Page</Link>
            </div>}
            {md3 && <MovieGrid movies={md3} />}
        </main>
    ); 
}


export default Detail;