import React from 'react';
import Async from "react-async";

const AsyncLoading = () => {
  return (
    <Async.Pending>
      Loading...
    </Async.Pending>
  );
};

export default AsyncLoading;