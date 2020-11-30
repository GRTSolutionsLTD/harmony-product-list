import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';
import { Table } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux';
import ProductCategoryRow from '../ProductCategoryRow';
import ProductRow from '../ProductRow';

interface Props {
	products: Product[];
	translate: TranslateFunction;
}

const ProductTable: React.FC<Props> = (props: Props) => {
	const { products, translate } = props;

	function renderRows(): JSX.Element[] {
		let prevCategory: string;
		const rows: JSX.Element[] = [];
		products.forEach((product: Product) => {
			if (prevCategory !== product.category) {
				prevCategory = product.category;
				rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
			}
			rows.push(<ProductRow key={product.id} product={product} />);
		});

		return rows;
	}

	return (
		<Table>
			<thead>
				<th>#</th>
				<th>{translate('products.name')}</th>
				<th>{translate('products.price')}</th>
			</thead>
			<tbody>
				{renderRows()}
			</tbody>
		</Table>
	);
};

export default ProductTable;
