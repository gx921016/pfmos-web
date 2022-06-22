import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  personName: string;
  pin: boolean;
  organizationName: string;
  pinId: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (projectId: number, pinId: string) => (pin: boolean) =>
    mutate({
      pin: pin,
      projectId: projectId,
      pinId: pinId,
    }).then(props.refresh);
  return (
    <Table
      pagination={false}
      rowKey={(record) => record.id}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id, project.pinId)}
              />
            );
          },
        },
        {
          title: "名称",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organizationName",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        { title: "负责人", dataIndex: "personName" },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
