/// <reference path="../typings/main.d.ts" />

import React = require('react');
import _s = require('underscore.string');
import _ = require('underscore');

interface IMenuItemProp {
	allowHover?: boolean;
	disabled?: boolean;
	selected?: boolean;
	link?: string;
	className?: string
}

function isArray(item: any): item is any[] {
	return item instanceof Array;
}

function HasChildren(children: any, pred: (item: any)=>boolean) {
	if (isArray(children)) {
		return _.any(children, pred) || null;
	}
	return null;
}

function ClassNames(...classes: string[]) {
	return _s.join(" ", ..._.filter(classes, (i: string) => i != null))
}

export class MenuItem extends React.Component<IMenuItemProp, any> {
	constructor(props: IMenuItemProp) {
		super(props);
	}

	render() {
		const { allowHover, className, disabled, selected } = this.props;
		const hasChildren = HasChildren(this.props.children,
										(itr: any) => {
											return itr instanceof MenuItem;
										});

		const cls = ClassNames("pure-menu-item", this.props.className,
							   allowHover && 'pure-menu-allow-hover',
							   disabled && 'pure-menu-disabled',
							   hasChildren && 'pure-menu-has-children',
							   selected && 'pure-menu-selected'
		);
		return <li className={ cls }>
			<a href={ this.props.link || "#" } className="pure-menu-link">
				{ this.props.children }
			</a>
		</li>;
	}
}

interface IMenuProp {
	brand?: React.ReactElement<any>;
}

export class Menu extends React.Component<IMenuProp, any> {
	constructor(props: IMenuProp) {
		super(props);
	}

	render() {
		return <div className="pure-u">
			<div className="nav-inner">
				<div className="pure-menu" >
					<ul className="pure-menu-list" >
						{ this.props.children }
					</ul>
				</div>
			</div>
		</div>
	}
}
