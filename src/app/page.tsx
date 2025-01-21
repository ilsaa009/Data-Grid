'use client';

import Aggregation from "./component/Aggregation";
import LazyLoadingDataGrid from "./component/LazyLoadingDataGrid";
import ListView from "./component/ListView";
import TreeDataGrid from "./component/ScrollRestoration";




const Page = () => {
  return (
    <div>
      <h1>Tree Data in DataGridPro</h1>
      <TreeDataGrid />
    </div>
  );
};

export default Page;
