import React, { useEffect, useState } from 'react'

const MoviesfilterData = ({filterData,setfilterData,movieDescriptionId,setMovieDescriptionId}) => {
 
    // useEffect(() => {
    // }, [])
 
    const handleDescription=(id)=>{
        console.log(id);
        setMovieDescriptionId(id)

    }
    return (
        <div className='flex items-center'>
            <div className={filterData.length?'w-1/2 border-r-2 h-[88vh]':'w-1/2 flex justify-center items-center border-r-2 h-[88vh]'}>

                {
                    filterData.length?
                filterData?.map((ele, i) => {
                    return (
                        <ul key={ele.episode_id} className='flex py-4 justify-between px-4 border-b-2 cursor-pointer ' onClick={()=>handleDescription(i)}>
                            <div className='flex gap-4'> 
                            <li className=''>EPISODE {ele.episode_id}</li>
                            <li className='font-bold'>EPISODE {ele.episode_id}-{ele.title}</li>
                            </div>
                         
                            <li>{ele.release_date}</li>
                        </ul>)
                }):
                <span className='text-[30px] font-bold text-center'>Please Wait Loading.... </span>
            }

            </div>
            <div className={typeof(movieDescriptionId)!=="number"?'flex justify-center items-center h-[88vh] w-1/2':'flex justify-center h-[88vh] w-1/2'}>
{
typeof(movieDescriptionId)!=="number"?<span className=''>{movieDescriptionId}</span>:
<div className='flex flex-col gap-5 px-4 py-5'>
<h1 className='text-2xl font-bold'>EPISODE {filterData[movieDescriptionId]?.episode_id}-{filterData[movieDescriptionId]?.title}</h1>

<span>{filterData[movieDescriptionId].opening_crawl}</span>

<h2>Directed by:{filterData[movieDescriptionId].director}</h2>
<h1></h1>

</div>

}
                
            </div>
        </div>
    )
}

export default MoviesfilterData