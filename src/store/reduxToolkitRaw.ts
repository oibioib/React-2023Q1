import * as reduxToolkit from '@reduxjs/toolkit';
import * as reduxToolkitQuery from '@reduxjs/toolkit/dist/query/react/index.js';

type ReduxToolkit = typeof reduxToolkit;

interface ReduxToolkitWithDefault extends ReduxToolkit {
  default?: unknown;
}

const { configureStore, combineReducers, createSlice } = ((reduxToolkit as ReduxToolkitWithDefault)
  .default ?? reduxToolkit) as typeof reduxToolkit;

type ReduxToolkitQuery = typeof reduxToolkitQuery;

interface ReduxToolkitQueryWithDefault extends ReduxToolkitQuery {
  default?: unknown;
}

const { fetchBaseQuery, buildCreateApi, coreModule, reactHooksModule } = ((
  reduxToolkitQuery as ReduxToolkitQueryWithDefault
).default ?? reduxToolkitQuery) as typeof reduxToolkitQuery;

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export { configureStore, combineReducers, createSlice };
export { fetchBaseQuery, createApi };
