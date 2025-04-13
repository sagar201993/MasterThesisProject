import React, { createContext, useContext, useState, useEffect } from 'react';

import AndroidJsonData from '../assets/jsons/android.json';
import AppleJsonData from '../assets/jsons/apple.json';
import CoolingJsonData from '../assets/jsons/cooling.json';
import CpuJsonData from '../assets/jsons/cpu.json';
import DesktopReviewJsonData from '../assets/jsons/desktop-review.json';
import GpusJsonData from '../assets/jsons/gpus.json';
import HtcJsonData from '../assets/jsons/htc.json';
import HuaweiJsonData from '../assets/jsons/huawei.json';
import MacReviewJsonData from '../assets/jsons/mac-review.json';
import MemoryJsonData from '../assets/jsons/memory.json';
import MicrosoftJsonData from '../assets/jsons/microsoft.json';
import MotheboardJsonData from '../assets/jsons/motheboard.json';
import NasJsonData from '../assets/jsons/nas.json';
import NotebookReviewJsonData from '../assets/jsons/notebook-review.json';
import SamsungJsonData from '../assets/jsons/samsung.json';
import SmartphonesJsonData from '../assets/jsons/smartphones.json';
import SsdJsonData from '../assets/jsons/ssd.json';
import StorageJsonData from '../assets/jsons/storage.json';
import TabletsJsonData from '../assets/jsons/tablets.json';
import UltrabookReviewJsonData from '../assets/jsons/ultrabook-review.json';
import AllJsonData from '../assets/jsons/allData.json';
import { getDate } from './GeneralFunctions'
import { preloadDataToLocalStorage } from './GeneralFunctionsProcessed'


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);

  const importJson = async () => {
    let combinedArray = [];
    combinedArray = combinedArray.concat(AndroidJsonData.map(obj => ({ ...obj, topic: 'Android' })));
    combinedArray = combinedArray.concat(AppleJsonData.map(obj => ({ ...obj, topic: 'Apple' })));
    combinedArray = combinedArray.concat(CoolingJsonData.map(obj => ({ ...obj, topic: 'Cooling' })));
    combinedArray = combinedArray.concat(CpuJsonData.map(obj => ({ ...obj, topic: 'Cpu' })));
    combinedArray = combinedArray.concat(DesktopReviewJsonData.map(obj => ({ ...obj, topic: 'DesktopReview' })));
    combinedArray = combinedArray.concat(GpusJsonData.map(obj => ({ ...obj, topic: 'Gpus' })));
    combinedArray = combinedArray.concat(HtcJsonData.map(obj => ({ ...obj, topic: 'Htc' })));
    combinedArray = combinedArray.concat(HuaweiJsonData.map(obj => ({ ...obj, topic: 'Huawei' })));
    combinedArray = combinedArray.concat(MacReviewJsonData.map(obj => ({ ...obj, topic: 'MacReview' })));
    combinedArray = combinedArray.concat(MemoryJsonData.map(obj => ({ ...obj, topic: 'Memory' })));
    combinedArray = combinedArray.concat(MicrosoftJsonData.map(obj => ({ ...obj, topic: 'Microsoft' })));
    combinedArray = combinedArray.concat(MotheboardJsonData.map(obj => ({ ...obj, topic: 'Motheboard' })));
    combinedArray = combinedArray.concat(NasJsonData.map(obj => ({ ...obj, topic: 'Nas' })));
    combinedArray = combinedArray.concat(NotebookReviewJsonData.map(obj => ({ ...obj, topic: 'NotebookReview' })));
    combinedArray = combinedArray.concat(SamsungJsonData.map(obj => ({ ...obj, topic: 'Samsung' })));
    combinedArray = combinedArray.concat(SmartphonesJsonData.map(obj => ({ ...obj, topic: 'Smartphones' })));
    combinedArray = combinedArray.concat(SsdJsonData.map(obj => ({ ...obj, topic: 'Ssd' })));
    combinedArray = combinedArray.concat(StorageJsonData.map(obj => ({ ...obj, topic: 'Storage' })));
    combinedArray = combinedArray.concat(TabletsJsonData.map(obj => ({ ...obj, topic: 'Tablets' })));
    combinedArray = combinedArray.concat(UltrabookReviewJsonData.map(obj => ({ ...obj, topic: 'UltrabookReview' })));
    
    combinedArray = combinedArray.map(obj => ({ ...obj, formatedDate: getDate(obj.date), formatedAuthorName: obj.author.replace('by ', '') }));
    
    return combinedArray;
  };
  
  
  useEffect(() => {
    const combineJsonData = async () => {
      try {
        const _data = AllJsonData;
        localStorage.setItem("ScarpedData", JSON.stringify(_data));
        setJsonData(JSON.parse(localStorage.getItem("ScarpedData")));
      } catch (error) {
        console.error('Error combining JSON files:', error);
      }
    };

    combineJsonData();
    preloadDataToLocalStorage();
  }, []);


  return (
    <DataContext.Provider value={jsonData}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
