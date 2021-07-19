import React, {FC} from 'react';
import style from "./TopMenu.module.scss";
interface TopMenuProps{
	logo?:string;
	menu?:string[];
	cart?:number;
}
const TopMenu:FC<TopMenuProps> = () => {

	return (
		<div className={style.container}>
			<div className={style.Logo}>LOGO</div>
			<div className={style.Menu}>MENU</div>
			<div className={style.Cart}>CART</div>
		</div>
	);
};

export default TopMenu;
