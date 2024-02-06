import { CurrencyFormatter } from "../CurrencyFormatter";
import classes from "./ProductBox.module.scss";

export interface ProductBoxProps {
  product: any;
  footer: any;
}

export default function ProductBox(props: ProductBoxProps) {
  const { product, footer } = props;
  return (
    <div className={classes.product} key={product.id}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>
        Price: <CurrencyFormatter amount={product.price} />
      </p>
      <div>{footer}</div>
    </div>
  );
}
