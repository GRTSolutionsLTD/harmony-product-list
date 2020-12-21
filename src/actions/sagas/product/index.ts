import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { ProductTypes } from 'actions/redux/product';

function* watchProductsSaga() {
	yield takeLatest(ProductTypes.GET_PRODUCTS, Sagas.productsSaga);
}

function* productSaga() {
	yield all([
		fork(watchProductsSaga)
	]);
}

export default productSaga;

