import { all, fork } from "redux-saga/effects";

import watchGetUserAction from "./saga";

const rootSaga = function* (): Generator {
  yield all([
    fork(watchGetUserAction),
    // Other forks
  ]);
};

export default rootSaga;
