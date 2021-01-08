import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ProductState, TypesNames, ActionCreator, SetProductsAction, SetFilterProductAction, Product, SetProductAction
} from './interfaces';
import { AnyAction } from 'redux';
import { sortBy, includes, isEmpty } from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getProducts: [],
	setProducts: ['products'],
	setFilter: ['filter'],
	createProduct: ['product'],
	updateProduct: ['product'],
	setProduct: ['product'],
	loadProduct: [],
});

export const ProductTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ProductState>({
	products: [],
	filter: {
		isInStock: true,
		filterText: ''
	},
	loading: false,
	success: false,
	error: false,
});

/* ------------- Selectors ------------- */

const getProducts = (state: ApplicationState) => state.product.products;
const getFilter = (state: ApplicationState) => state.product.filter;
const getIsInStock = (state: ApplicationState) => state.product.filter.isInStock;
const getFilterText = (state: ApplicationState) => state.product.filter.filterText;

const getProductsList = (state: ApplicationState) => {
	const products: Product[] = getProducts(state);
	const isInStock: boolean = getIsInStock(state);
	const filterText: string = getFilterText(state);

	return products.filter((product: Product) => {
		if (!isProductContainsText(product, filterText)) return false;
		if (isInStock && !product.isInStock) return false;
		return true;
	});
};

const isProductContainsText = (product: Product, search: string) => {
	if (isEmpty(search)) return true;
	if (includes(product.name, search)) return true;
	if (includes(product.price, search)) return true;
	return false;
};

export const productSelector = {
	getProductsList,
	getFilter,
	getProduct: (state: ApplicationState, id: string) => {
		return state.product.products.find((product) => product.id === id);
	},
	getSuccess: (state: ApplicationState) => state.product.success,
	getError: (state: ApplicationState) => state.product.error,
};

/* ------------- Reducers ------------- */

const setProductsReducer = (state: ImmutableObject<ProductState>, action: SetProductsAction) => {
	const { products } = action;
	return state.merge({
		products, loading: false, success: true, error: false
	});
};

const setFilterProductReducer = (state: ImmutableObject<ProductState>, action: SetFilterProductAction) => {
	const { filter } = action;
	return state.merge({ filter });
};

const setProductReducer = (state: ImmutableObject<ProductState>, action: SetProductAction) => {
	const { product } = action;
	const restProducts = state.products.filter((p: Product) => p.id !== product.id);
	const newProducts = sortBy([...restProducts.asMutable(), product], ['category']);
	return state.merge({
		products: newProducts, loading: false, success: true, error: false
	});
};

const setErrorReducer = (state: ImmutableObject<ProductState>) => {
	return state.merge({ loading: false, success: false, error: true });
};

const setLoadReducer = (state: ImmutableObject<ProductState>) => {
	return state.merge({ loading: true, success: false, error: false });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer<ImmutableObject<ProductState>, AnyAction>(INITIAL_STATE, {
	[ProductTypes.SET_PRODUCTS]: setProductsReducer,
	[ProductTypes.SET_FILTER]: setFilterProductReducer,
	[ProductTypes.SET_PRODUCT]: setProductReducer,
	[ProductTypes.PRODUCT_ERROR]: setErrorReducer,
	[ProductTypes.LOAD_PRODUCT]: setLoadReducer,
});
