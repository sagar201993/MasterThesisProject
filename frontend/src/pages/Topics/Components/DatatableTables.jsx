import React, { useEffect, useState } from "react";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody } from "reactstrap";
import { useData } from '../../../provider/DataProvider';

const DatatableTables = ({ topic }) => {


  const jsonData = useData();

  const filterByTopic = (dataArray, topic) => {
    return dataArray.filter(item => item.topic.includes(topic));
  };

  const [data, setData] = useState([]);
  const [dataColums, setDataColums] = useState([]);

  useEffect(() => {

    setData(topic === "*" ? jsonData : filterByTopic(jsonData, topic))

    setDataColums(topic === "*" ? [
      {
        Header: "Title",
        accessor: "title",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Topic",
        accessor: "topic",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Author",
        accessor: "author",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Total Comments",
        accessor: "comment",
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Posted Date",
        accessor: "date",
        disableFilters: true,
        filterable: false,
      },
    ] : [
      {
        Header: "Title",
        accessor: "title",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Author",
        accessor: "author",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Total Comments",
        accessor: "comment",
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Posted Date",
        accessor: "date",
        disableFilters: true,
        filterable: false,
      },
    ])
    // Clean-up function (optional)
    return () => {
      // This will run when the component is unmounted
      // You can perform clean-up tasks here if needed
    };
  }, []); // The empty dependency array ensures this effect runs only once


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <TableContainer
            columns={dataColums || []}
            data={data || []}
            isPagination={false}
            isGlobalFilter={true}
            iscustomPageSize={false}
            isBordered={false}
            customPageSize={10}
            customPageSizeOptions={10}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default DatatableTables;