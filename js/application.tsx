/// <reference path="../typings/main.d.ts" />
/// <reference path="interfaces.d.ts" />

import React = require('react');
import { MenuItem, Menu } from 'nav';

export default class Application extends React.Component<any, any> {
	constructor() {
		super();
	}

	render() {
		return <div>
			<Menu>
				<MenuItem link="#">
					Main
				</MenuItem>
			</Menu>
		</div>
	}
}
