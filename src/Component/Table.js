import { Input, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases, selectCases, selectError, selectLoading } from "./covidSlice";

const CTable = () => {
  const dispatch = useDispatch();
  const cases = useSelector(selectCases);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("cases");

  const TableColumn = [
    {
      title: "Country",
      key: "country",
      dataIndex: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Total Cases",
      key: "cases",
      dataIndex: "cases",
      sorter: (a, b) => a.cases - b.cases,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Deaths",
      key: "deaths",
      dataIndex: "deaths",
      sorter: (a, b) => a.deaths - b.deaths,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Recovered",
      key: "recovered",
      dataIndex: "recovered",
      sorter: (a, b) => a.recovered - b.recovered,
      sortDirections: ["descend", "ascend"],
    },
  ];

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm) => {
    if (typeof confirm === "function") {
      confirm();
    }
    setSearchText(selectedKeys?.[0]?.toLowerCase() ?? "");
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const filteredData = searchText
    ? cases.filter((filter) =>
        filter.country.toLowerCase().includes(searchText.toLowerCase())
      )
    : cases;
  const searched =
    searchText &&
    cases.find((find) => find.country.toLowerCase().includes(searchText));
  const dataToShow = searchText ? [searched] : [...filteredData];

  const sorted = dataToShow.sort((a, b) => {
    if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
      return b[sortBy] - a[sortBy];
    } else {
      return a[sortBy].localeCompare(b[sortBy]);
    }
  });

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table columns={TableColumn} dataSource={sorted} />
      )}
    </div>
  );
};

export default CTable;
