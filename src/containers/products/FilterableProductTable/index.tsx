import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
import { Col, Container, Row } from 'react-bootstrap';
import ProductSearchBar from '../ProductSearchBar';
import { Product } from 'actions/redux/product/interfaces';
import { TranslateFunction } from 'react-localize-redux';
import ProductTable from '../ProductTable';
import ProductView from '../ProductView';

interface Props {
	products: Product[];
	translate: TranslateFunction;
}

interface State {
	filterText: string;
	selectedProduct: Product | null;
}

class FilterableProductTable extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			filterText: '',
			selectedProduct: null
		};

		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleProductSelected(selectedProduct: Product) {
		this.setState({ selectedProduct });
	}

	handleFilterTextChange(filterText: string) {
		this.setState({ filterText });
	}

	render() {
		const { filterText, selectedProduct } = this.state;
		const { products, translate } = this.props;
		return (
			<Container>
				<Row>
					<ProductSearchBar
						filterText={filterText}
						onFilterTextChange={this.handleFilterTextChange}
					/>
				</Row>
				<Row>
					<Col lg={8}>
						<ProductTable
							products={products}
							translate={translate}
							filterText={filterText}
							selectedProductId={selectedProduct ? selectedProduct.id : ''}
							onProductSelected={this.handleProductSelected}
						/>
					</Col>
					<Col>
						{selectedProduct != null && <ProductView product={selectedProduct} />}
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

	}) as React.ComponentType<any>;
