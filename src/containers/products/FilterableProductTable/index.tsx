import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
import { Col, Container, Row } from 'react-bootstrap';
import ProductSearchBar from '../ProductSearchBar';
import { Product } from 'actions/redux/product/interfaces';
import { TranslateFunction } from 'react-localize-redux';
import ProductTable from '../ProductTable';
import ProductView from '../ProductView';
// import FilterableProductTableActions, { filterableProductTableSelector } from 'actions/redux/filterableProductTable';

interface Props {
	products: Product[];
	translate: TranslateFunction;
}

class FilterableProductTable extends React.Component<Props> {
	render() {
		const { products, translate } = this.props;
		return (
			<Container>
				<Row>
					<ProductSearchBar />
				</Row>
				<Row>
					<Col lg={8}>
						<ProductTable products={products} translate={translate} />
					</Col>
					<Col>
						<ProductView product={products[0]} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default baseConnect(FilterableProductTable,
	(state: ApplicationState) => {
		return {

		};
	},
	{

	});
