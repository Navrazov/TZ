import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ParentChildTable from "./ParentChildTable";
import { Tag } from "antd";

const dataDef = [
    {
      id: 1,
      parentId: 0,
      isActive: true,
      balance: "$3,655.34",
      name: "Yolanda Chavez",
      email: "yolandachavez@isoplex.com",
    },
    {
      id: 2,
      parentId: 0,
      isActive: true,
      balance: "$1,247.87",
      name: "Navarro Levy",
      email: "navarrolevy@isoplex.com",
    },
    {
      id: 3,
      parentId: 2,
      isActive: true,
      balance: "$2,559.85",
      name: "Wooten Hartman",
      email: "wootenhartman@isoplex.com",
    },];

const mockColumns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "balance",
        dataIndex: "balance",
        key: "balance",
      },
      {
        title: "isActive",
        dataIndex: "isActive",
        key: "isActive",
        render: (row: boolean) => {
          return <Tag color={row ? "green" : "red"}>{row ? "TRUE" : "FALSE"}</Tag>;
        },
      },
];

describe('ParentChildTable Test', () => {
    test('test render', () => {
        render(<ParentChildTable users={dataDef} columns={mockColumns} />);
        expect(screen.getByText('Wooten Hartman')).toBeInTheDocument();
    });
    test('test render two', () => {
        render(<ParentChildTable users={dataDef} columns={mockColumns} />);
        expect(screen.getByText('Navarro Levy')).toBeInTheDocument();
    });
});
