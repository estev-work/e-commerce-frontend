import React from 'react';
import style from "./TopMenu.module.scss";
const TopMenu = () => {

	return (
		<div className={style.container}>
			<div className={style.Logo}>LOGO</div>
			<div className={style.Menu}>MENU</div>
			<div className={style.Cart}>CART</div>
		</div>
	);
};

export default TopMenu;
