import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  CATS_SEARCH_RANDOM_CAT_BEGIN,
  CATS_SEARCH_RANDOM_CAT_SUCCESS,
  CATS_SEARCH_RANDOM_CAT_FAILURE,
  CATS_SEARCH_RANDOM_CAT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function searchRandomCat() {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: CATS_SEARCH_RANDOM_CAT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('https://api.thecatapi.com/v1/images/search');

      doRequest.then(
        res => {
          dispatch({
            type: CATS_SEARCH_RANDOM_CAT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: CATS_SEARCH_RANDOM_CAT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchRandomCatError() {
  return {
    type: CATS_SEARCH_RANDOM_CAT_DISMISS_ERROR,
  };
}

export function useSearchRandomCat() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { randomCat, randomCatPending, randomCatError } = useSelector(
    state => ({
      randomCat: state.cats.randomCat,
      randomCatPending: state.examples.randomCatPending,
      randomCatError: state.examples.randomCatError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    () => {
      dispatch(searchRandomCat());
    },
    [dispatch],
  );

  const boundDismissSearchRandomCatError = useCallback(() => {
    dispatch(dismissSearchRandomCatError());
  }, [dispatch]);

  return {
    randomCat,
    searchRandomCat: boundAction,
    randomCatPending,
    randomCatError,
    dismissSearchRandomCatError: boundDismissSearchRandomCatError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CATS_SEARCH_RANDOM_CAT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        randomCatPending: true,
        randomCatError: null,
      };

    case CATS_SEARCH_RANDOM_CAT_SUCCESS:
      // The request is success
      return {
        ...state,
        randomCat: action.data.data.children,

        randomCatPending: false,
        randomCatError: null,
      };

    case CATS_SEARCH_RANDOM_CAT_FAILURE:
      // The request is failed
      return {
        ...state,
        randomCatPending: false,
        randomCatError: action.data.error,
      };

    case CATS_SEARCH_RANDOM_CAT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        randomCatError: null,
      };

    default:
      return state;
  }
}

