import { createReducer } from "@reduxjs/toolkit";

import { setFilter } from "./filter-actions";

const filterReducer = createReducer("", {
    [setFilter]: (_, {payload}) => payload,
});

export default filterReducer;