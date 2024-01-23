import React, { useEffect, useState } from 'react';
import MoviesData from './MoviesData';

const Movies = () => {
  const [input, setInput] = useState('');
  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [movieDescriptionId, setMovieDescriptionId] = useState('No Movies Selected');

  useEffect(() => {
    getData();
  }, [input]);

  const getData = async () => {
    const datas = await fetch('https://swapi.dev/api/films/?format=json');
    const json = await datas.json();
    setData(json.results);
    if (input.trim() !== "") {
        const filter = json.results.filter((e) =>
          e.title.toLowerCase().includes(input.toLowerCase())
        );
        setFilterData(filter);
      } else {
        // If input is empty or contains only whitespace, set filterData to the original episode data
        setFilterData(json.results);
      }
  };

  const handleOptions = () => {
    setBool(!bool);
  };

  const filterDatas = (sortOption) => {
    if (sortOption === 'Episode') {
      const sortedEpisodes = [...data].sort((a, b) => a.episode_id - b.episode_id);
      setFilterData(sortedEpisodes);
    } else if (sortOption === 'Year') {
      const filteredAndSorted = data
        .filter((movie) => movie.release_date)
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      setFilterData(filteredAndSorted);
    }
    setBool(false);
  };
  

  return (
    <div className=" ">
      <header className="bg-[#F7F8FA] px-2 py-5 border-b-2 flex gap-2">
        <div className="px-4 py-2 w-28  bg-white border-2 relative rounded-md">
          <button onClick={handleOptions}>Sort by...</button>

          {bool && (
            <div className="text-[18px] h-60 shadow-lg absolute w-64 mt-4 left-0 bg-white">
              <div className="flex p-2 justify-between items-center">
                <h1 className="">Sort by</h1>
                <i
                  className="fa-solid fa-xmark cursor-pointer"
                  onClick={() => setBool(false)}
                ></i>
              </div>
              <ul className="">
                <li
                  className="px-2 py-3 border-t-2 border-b-2 cursor-pointer hover:bg-slate-50"
                  onClick={() => filterDatas('Episode')}
                >
                  Episode
                </li>
                <li
                  className="px-2 py-3 border-b-2 cursor-pointer hover:bg-slate-50"
                  onClick={() => filterDatas('Year')}
                >
                  Year
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full flex items-center relative">
          <i className="fa-solid fa-magnifying-glass absolute left-2"></i>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type to search..."
            className="w-full border-none outline-none py-2 rounded-md px-8 bg-white border-2 focus:outline-pink-400 focus:border-2"
          />
        </div>
      </header>
      <MoviesData
        filterData={filterData}
        movieDescriptionId={movieDescriptionId}
        setMovieDescriptionId={setMovieDescriptionId}
      />
    </div>
  );
};

export default Movies;
