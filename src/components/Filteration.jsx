import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Filteration() {
  const [countries,setCountries]=useState([])

  useEffect(() => {
    filterData()
    return () => {
    };
  }, []);

  const filterData = async () => {
    try {
      const response = await axios.get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=cou_name_en&offset=1"
      );
      const x = response.data.results
      console.log(x)
      // console.log(c);
      setCountries(response.data.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div>  
      {countries.map((item) => (
        <div key={item.cou_name_en}>{item.cou_name_en}</div>
      ))}
    </div>
  );
}

export default Filteration;
