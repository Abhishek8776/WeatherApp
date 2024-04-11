import React from 'react';

function CityData({details}) {
  return (
    <tr>
      <td className="border border-slate-600 p-2 text-center">{details.ascii_name}</td>
      <td className="border border-slate-600 p-2 text-center">{details.cou_name_en}</td>
      <td className="border border-slate-600 p-2 text-center">{details.timezone}</td>
    </tr>
  );
}

export default CityData;
