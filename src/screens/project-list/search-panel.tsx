import React from "react";
import { Form, Input } from "antd";
import { Project } from "./list";
import { UserSelect } from "../../components/user-select";

export interface User {
  token: string;
  id: number;
  name: string;
  email: string;
  dept: string;
  role: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"搜索项目名称"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => {
            console.log("bbb", value);
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          {/*<Select.Option value={""}>负责人</Select.Option>*/}
          {/*{users.map((user) => (*/}
          {/*  <Select.Option key={user.id} value={String(user.id)}>*/}
          {/*    {user.name}*/}
          {/*  </Select.Option>*/}
          {/*))}*/}
        </UserSelect>
      </Form.Item>
    </Form>
  );
};
