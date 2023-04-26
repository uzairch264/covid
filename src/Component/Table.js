import { Input,Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CTable= ()=>{

     const [cases,setCases]=useState("");
const [loading, setLoading] = useState(false);
     const [searchText, setSearchText] = useState("");
  const [sortBy] = useState("cases");

     const TableColumn=[
        {
            title:"country",
            key:"country",
            dataIndex:"country",
            sorter:(a,b)=>a.country.localeCompare(b.country),
            sortDirections: ["ascend", "descend"],

        },
        {
            title:"Total Cases",
            key:"cases",
            dataIndex:"cases",
            sorter:(a,b)=>a.cases-b.cases,
            sortDirections: ["descend", "ascend"],

        },
        {
            title:"Total Deaths",
            key:"deaths",
            dataIndex:"deaths",
            sorter:(a,b)=>a.cases-b.cases,
            sortDirections: ["descend", "ascend"],

        },
        {
            title:"Total Recovered",
            key:"ecovered",
            dataIndex:"recovered",
            sorter:(a,b)=>a.cases-b.cases,
            sortDirections: ["descend", "ascend"],

        },
     ];

     const handleSearch =(selectedKeys, confirm)=>{
        if(typeof confirm==="function"){
            confirm();
        }
        setSearchText(selectedKeys?.[0]?.toLowerCase() ?? "");

     };
     const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };
      
    useEffect (()=>{
        
        const asynCall =async()=>{
            try{
            setLoading(true);
        const request = await axios.get("https://disease.sh/v3/covid-19/countries");
        const cases =request.data.map((dataCenter)=>({
            key: dataCenter.countryInfo._id,
            country: dataCenter.country,
            cases: dataCenter.cases,
            deaths: dataCenter.deaths,
            active: dataCenter.active,
            recovered: dataCenter.recovered,

        }));
        setCases(cases);
setLoading(false);
        }

    
    catch (error){
console.log(error);
setLoading(false);
    }
};
asynCall();
    },[]);
    const filteredData = searchText
    ? cases.filter((filter) =>
        filter.country.toLowerCase().includes(searchText.toLowerCase())
      ) : cases;
    const searched =searchText &&cases.find((find) =>find.country.toLowerCase().includes(searchText)
      );
    const dataToShow = searchText ? [searched] : [...filteredData];

  
  
      console.log(typeof dataToShow);
      const sorted = dataToShow.sort((a, b) => {
        if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy].localeCompare(b[sortBy]);
        }
      })
  return (
    <div className="country-table">
    <h2 className="country-table__title">Countries Table</h2>
    <Input.Search
      placeholder="Search by country"
      allowClear
      enterButton
      style={{ width: 200, marginBottom: 16 }}
      onSearch={handleSearch}
      onReset={handleReset}
    />
<Table columns={TableColumn} dataSource={sorted } />
    
  </div>
  
  
);}
export default CTable;