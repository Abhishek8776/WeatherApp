import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CityData from './CityData';
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort } from "react-icons/fa6";



function CityTable() {

  const [cities, setCities] = useState([])
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('')
  let fetchWithDelay;

  useEffect(() => {
    getCities();
    return () => {
      clearTimeout(fetchWithDelay)
    };
  }, [sort]);

  const applySort = (sortValue) => {
    setOffset(0)
    setCities([]);
    setSort(sortValue)
  }

  const getCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}` + (sort ? `&order_by=${sort}` : "")
      );  
         fetchWithDelay = setTimeout(() => {
          setCities((prevCities) => [
            ...prevCities,
            ...response.data.results,
          ]);
          setOffset((prevOffset) => prevOffset + 20);
        }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const cityDatas = cities.map((details) => (
    <CityData key={details.geoname_id} details={details} />
  ))

  return (
    <div className="flex justify-center mt-10">
      <InfiniteScroll
        className="block"
        dataLength={cities.length}
        next={getCities}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <table style={{ minWidth: "40vw" }}>
          <tbody>
            <tr>
              <th className="border border-slate-600 py-2">
                <div className="flex justify-center text-center">
                  City
                  <div className="flex flex-col ms-2">
                    <button
                      className={`${sort === 'ascii_name' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("ascii_name")}
                    >
                      ▲
                    </button>
                    <button
                      className={`${sort === '-ascii_name' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("-ascii_name")}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </th>
              <th className="border border-slate-600">
                <div className="flex justify-center">
                  Country
                  <div className="flex flex-col ms-2">
                    <button
                      className={`${sort === 'cou_name_en' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("cou_name_en")}
                    >
                      ▲
                    </button>
                    <button
                      className={`${sort === '-cou_name_en' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("-cou_name_en")}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </th>
              <th className="border border-slate-600">
                <div className="flex justify-center">
                  Timezone
                  <div className="flex flex-col ms-2">
                    <button
                      className={`${sort === 'timezone' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("timezone")}
                    >
                      ▲
                    </button>
                    <button
                      className={`${sort === '-timezone' && 'bg-slate-300'} text-xs px-1`}
                      onClick={() => applySort("-timezone")}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </th>
            </tr>
            {cityDatas}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default CityTable;
