import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { subHours } from "date-fns";

const HomeStats = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  const OrdersTotal = (orders) => {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });

    console.log(orders);
    return new Intl.NumberFormat("en-US").format(sum);
  };

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const orderToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );

  const orderWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const orderMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );
  return (
    <div className="">
      <h2>Orders</h2>
      <div className="tiles-grid">
        <div className="tile ">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{orderToday.length}</div>
          <div className="tile-desc">{orderToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">{orderWeek.length}</div>
          <div className="tile-desc">{orderWeek.length} orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile-hader">This month</h3>
          <div className="tile-number">{orderMonth.length}</div>
          <div className="tile-desc">{orderMonth.length} orders this month</div>
        </div>
      </div>
      <h2>Revenue</h2>
      <div className="tiles-grid">
        <div className="tile ">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">$ {OrdersTotal(orderToday)}</div>
          <div className="tile-desc">{orderToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">$ {OrdersTotal(orderWeek)}</div>
          <div className="tile-desc">{orderWeek.length} orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile-hader">This month</h3>
          <div className="tile-number">$ {OrdersTotal(orderMonth)}</div>
          <div className="tile-desc">{orderMonth.length} orders this month</div>
        </div>
      </div>
    </div>
  );
};
export default HomeStats;
