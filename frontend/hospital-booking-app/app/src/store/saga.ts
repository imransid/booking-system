// Import necessary functions and types
import { all, takeEvery } from "redux-saga/effects";

// Create a watcher saga
function* watchGetUserAction(): Generator {}

// Export the root saga
export default function* rootSaga(): Generator {
  yield all([
    watchGetUserAction(),
    // Add other watchers if needed
  ]);
}
