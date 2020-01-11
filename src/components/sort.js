import React, { useState } from 'react';





const Sort = (props) => {
    const handlesortlist = () => {
        let sortlist = ['vote_average.asc', 'vote_average.desc', 'release_date.asc', 'release_date.desc', 'original_title.asc', 'original_title.desc'];
        const sortitems = sortlist.map((item, i) => <option key={i} type="radio" aria-label="Radio button for following text input" >{item}</option>)
        return sortitems;
    }



    const handleChange=(e)=>{
        e.preventDefault();
        let sort=e.target.value;
        props.handleChangSort(sort);
    }

    return (

        <select onChange={handleChange}>
            {handlesortlist()}
        </select>

    );
}
export default Sort;