import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shared-ui/Table";

const data = [
  { rest: "Трактиръ", dishes: "Жаркое, Чорба, Пельмени", price: 100, status: "Доставлено" },
  { rest: "Turkmen tagam", dishes: "Ishlekli", price: 70, status: "Отправлено" },
];

const HEAD_CELLS = ["ProfilePage.restaurantName", "ProfilePage.dishesName", "ProfilePage.price", "ProfilePage.status"];

interface Props {
  userOrders: UserOrder[];
  t: any;
}

const OrdersTable: FC<Props> = ({ userOrders, t }) => {
  console.log("userOrders", userOrders);
  return (
    <>
      <h1 className="pt-2 text-2xl">{t("ProfilePage.history")}</h1>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-b-gray-1 bg-gray-2 p-2 text-base *:font-bold">
            {HEAD_CELLS.map((title) => (
              <TableHead key={title}>{t(title)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map(({ rest, dishes, price, status }, i) => (
            <TableRow key={i} className="cursor-pointer border-b border-gray-1 text-base duration-200 hover:bg-gray-3">
              <TableCell>{rest}</TableCell>
              <TableCell>{dishes}</TableCell>
              <TableCell>{price} ТМТ</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTable;
