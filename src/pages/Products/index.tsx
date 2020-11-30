import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
// import ProductsActions, { productsSelector } from 'actions/redux/products';

interface Props {

}

class Products extends React.Component<Props> {
	render() {
		return (
			<div>
				Products New Container
			</div>
		);
	}
}

export default baseConnect(Products,
	(state: ApplicationState) => {
		return {

		};
	},
	{

	}
);
