import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shared-ui/Table";

const data = [
  { rest: "Трактиръ", dishes: "Жаркое, Чорба, Пельмени", price: 100, status: "Доставлено" },
  { rest: "Turkmen tagam", dishes: "Ishlekli", price: 70, status: "Отправлено" },
];

export default function OrdersTable() {
  return (
    <>
      <h1 className="pt-2 text-2xl">История заказов</h1>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-b-gray-1 bg-gray-2 p-2 text-base *:font-bold">
            <TableHead>Название ресторана</TableHead>
            <TableHead>Названия блюд</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Статус</TableHead>
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
}
