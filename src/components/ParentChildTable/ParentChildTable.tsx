import { Table, TableProps } from "antd";
import { IColumn, IUser } from "../../types";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const ParentChildTable = ({
  users,
  columns,
}: {
  users: IUser[];
  columns: IColumn[];
}) => {
  const getObjChildren = (data: IUser[]) => {
    const children = data.reduce((obj: { [key: number]: IUser[] }, item) => {
      item.key = item.id;
      const index = item.parentId;

      !obj[index] ? (obj[index] = [item]) : obj[index].push(item);

      return obj;
    }, {});

    return children;
  };

  const addChildren = (data: IUser[]) => {
    const objChildren = getObjChildren(data);
    data.forEach((row) => {
      const indexRow = row.id;

      if (objChildren[indexRow]) {
        row.children = objChildren[indexRow];
        delete objChildren[indexRow];
      }
    });
    return objChildren;
  };

  const getRootParents = (data: IUser[]) => {
    const objChildren = addChildren(data);
    const parentKeys = Object.keys(objChildren);
    const rootParents = parentKeys.reduce((arr: IUser[], key) => {
      return arr.concat(objChildren[+key]);
    }, []);

    return rootParents;
  };

  const getTableData = (data: IUser[]) => {
    const rootParents = getRootParents(data);
    return rootParents;
  };

  const [sortBy, setSortBy] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const sortData = (data: IUser[], sortBy: string | null) => {
    if (!sortBy) {
      return data;
    }

    switch (sortBy) {
      case "name":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "balance":
        return data.sort(
          (a, b) =>
            parseFloat(b.balance.replace(/[^\d.-]/g, "")) -
            parseFloat(a.balance.replace(/[^\d.-]/g, ""))
        );
      case "isActive":
        return data.sort(
          (a, b) => (b.isActive ? 1 : -1) - (a.isActive ? 1 : -1), 
        );
      default:
        return data;
    }
  };

  const handleSort = (column: string) => {
    setSortBy(column);
  };

  const handleCellClick = (user: IUser) => {
    setSelectedUser(user);
  };

  const config: TableProps<IUser> = {
    dataSource: getTableData(sortData(users, sortBy)),
    columns: columns.map((col) => ({
      ...col,
      title: (
        <div
          onClick={() => handleSort(col.dataIndex)}
          style={{ cursor: "pointer" }}
        >
          {col.title}
        </div>
      ),
      onCell: (record: IUser) => ({
        onClick: () => handleCellClick(record),
      }),
    })),
  };

  return (
    <> 
    <Table {...config}></Table>
    <Sidebar selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  )
};

export default ParentChildTable;

