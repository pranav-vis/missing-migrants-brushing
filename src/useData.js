import { useState, useCallback, useEffect } from 'react';
import { csv } from 'd3';
export const useData = () => {
 const csvUrl =
    'https://gist.githubusercontent.com/pranav-vis/2ad083af50a06d09b285288c22169ce5/raw/%28Simplified%29MissingMigrants-Global-2021-09-18T15-55-13.csv';
  
  const row = d => {
    d.coords = d['Location Coordinates']
    .split(",")
    .map(d => +d)
    .reverse();
    d['Total Dead and Missing'] = +d['Total Dead and Missing'];
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
  };
  
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);
  return data;
};
