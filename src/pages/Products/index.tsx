import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
import FilterableProductTable from 'containers/products/FilterableProductTable';
import data from 'actions/redux/product/products.json';
import { Product } from 'actions/redux/product/interfaces';
import { sortBy } from 'lodash';
import { Container } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux';
// import ProductsActions, { productsSelector } from 'actions/redux/products';

interface Props {
	translate: TranslateFunction;
}

class Products extends React.Component<Props> {
	products: Product[] = sortBy(data, ['category']);
	
	render() {
		const { translate } = this.props;
		return (
			<Container>
				<h1>product list</h1>
				<FilterableProductTable products={this.products} translate={translate} />
			</Container>
		);
	}
}

export default baseConnect(Products,
	(state: ApplicationState) => {
		return {

		};
	},
	{

	});
