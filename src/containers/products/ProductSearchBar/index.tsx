import * as React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
	filterText: string;
	onFilterTextChange: (text: string) => void;
}

const ProductSearchBar: React.FC<Props> = (props: Props) => {
	const {
		filterText, onFilterTextChange
	} = props;

	function handleFilterTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		onFilterTextChange(e.target.value.toString());
	}

	return (
		<Form>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Search..."
					value={filterText}
					onChange={handleFilterTextChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Check
					label="Only show products in stock"
				/>
			</Form.Group>
		</Form>
	);
};

export default ProductSearchBar;
