import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';

interface Props {
	product: Product;
}

const ProductRow: React.FC<Props> = (props: Props) => {
	const { product } = props;
	return (
		<tr>
			<td>{product.id}</td>
			<td>{product.name}</td>
			<td>{product.price}</td>
		</tr>
	);
};

export default ProductRow;
