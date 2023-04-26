import React, { useEffect, useState } from "react";
import {  Col,Row,Statistic} from "antd";
import axios from "axios";
const Global=()=>{
    const [cases,setCases]=useState('');
 
    useEffect(()=>{
    const asyncCall =async() =>{
      const result = await axios.get("https://disease.sh/v3/covid-19/all");
      setCases(result.data);
      // Expected output: "resolved"
    } ;
    asyncCall();},[]);
return(
    <div style={{alignContent:"center"}}>
        <h2>GLOBAL STATISTICS</h2>
        
        <Row gutter={16} style={{alignItems:"center"}}>
    <Col span={5}>
      
      <Statistic title="Updated" value={cases.updated} />
     
    </Col>
    <Col span={4}>
      <Statistic title="Today cases" value={cases.cases}  />
      
    </Col>
  
    <Col span={4}>
      <Statistic title="Deaths" value={cases.deaths} />
    </Col>
    <Col span={4}>
      <Statistic title="Recovered" value={cases.recovered} />
      
    </Col>
    <Col span={4}>
      <Statistic title="Active" value={cases.active} />
    </Col>
    <Col span={3}>
      <Statistic title="Critical" value={cases.critical}  />
      
    </Col>
   
    
  </Row>
    </div>
);
}
export default Global;