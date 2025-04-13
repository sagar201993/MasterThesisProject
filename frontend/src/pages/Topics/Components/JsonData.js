import React, { useMemo, useEffect, useState } from "react";
import TableContainer from "../../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { Card, CardBody, Container } from "reactstrap";

import AndroidJsonData from '../../../assets/jsons/android.json';
import AppleJsonData from '../../../assets/jsons/apple.json';
import CoolingJsonData from '../../../assets/jsons/cooling.json';
import CpuJsonData from '../../../assets/jsons/cpu.json';
import DesktopReviewJsonData from '../../../assets/jsons/desktop-review.json';
import GpusJsonData from '../../../assets/jsons/gpus.json';
import HtcJsonData from '../../../assets/jsons/htc.json';
import HuaweiJsonData from '../../../assets/jsons/huawei.json';
import MacReviewJsonData from '../../../assets/jsons/mac-review.json';
import MemoryJsonData from '../../../assets/jsons/memory.json';
import MicrosoftJsonData from '../../../assets/jsons/microsoft.json';
import MotheboardJsonData from '../../../assets/jsons/motheboard.json';
import NasJsonData from '../../../assets/jsons/nas.json';
import NotebookReviewJsonData from '../../../assets/jsons/notebook-review.json';
import SamsungJsonData from '../../../assets/jsons/samsung.json';
import SmartphonesJsonData from '../../../assets/jsons/smartphones.json';
import SsdJsonData from '../../../assets/jsons/ssd.json';
import StorageJsonData from '../../../assets/jsons/storage.json';
import TabletsJsonData from '../../../assets/jsons/tablets.json';
import UltrabookReviewJsonData from '../../../assets/jsons/ultrabook-review.json';


const importJson = async ({topic}) => {
      try {
        switch (topic) {
          case 'Android':
            return AndroidJsonData;
          case 'Apple':
            return AppleJsonData;
          case 'Cooling':
            return CoolingJsonData;
          case 'Cpu':
            return CpuJsonData;
          case 'DesktopReview':
            return DesktopReviewJsonData;
          case 'Gpus':
            return GpusJsonData;
          case 'Htc':
            return HtcJsonData;
          case 'Huawei':
            return HuaweiJsonData;
          case 'MacReview':
            return MacReviewJsonData;
          case 'Memory':
            return MemoryJsonData;
          case 'Microsoft':
            return MicrosoftJsonData;
          case 'Motheboard':
            return MotheboardJsonData;
          case 'Nas':
            return NasJsonData;
          case 'NotebookReview':
            return NotebookReviewJsonData;
          case 'Samsung':
            return SamsungJsonData;
          case 'Smartphones':
            return SmartphonesJsonData;
          case 'Ssd':
            return SsdJsonData;
          case 'Storage':
            return StorageJsonData;
          case 'Tablets':
            return TabletsJsonData;
          case 'UltrabookReview':
            return UltrabookReviewJsonData;
          case '*':
            return AndroidJsonData;
          default:
            return [];
        }

      } catch (error) {
        return [];
      }
    };

export default importJson;