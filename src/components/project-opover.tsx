import React from "react";
import { List, Popover, Typography } from "antd";
export const ProjectOpover = () => {
  const content = (
    <div>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>{}</List>
    </div>
  );
  return <Popover placement={"bottom"} content={content}></Popover>;
};
