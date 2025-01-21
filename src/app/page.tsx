'use client';

import Aggregation from "./component/Aggregation";
import LazyLoadingDataGrid from "./component/LazyLoadingDataGrid";
import ListView from "./component/ListView";
import ScrollRestoration from "./component/ScrollRestoration";
import TreeDataGrid from "./component/ScrollRestoration";




const Page = () => {
  return (
    <div>
      <h1>Tree Data in DataGridPro</h1>
      <ScrollRestoration />
    </div>
  );
};

export default Page;
