import { put } from 'redux-saga/effects';
import ProductActions from 'actions/redux/product';
import { Product } from 'actions/redux/product/interfaces';
import data from './products.json';
import { sortBy } from 'lodash';

export function* productsSaga() {
	const products: Product[] = sortBy(data, ['category']);
	yield put(ProductActions.setProducts(products));
}

