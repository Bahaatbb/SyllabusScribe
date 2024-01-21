import { Tabs, TabsProps, rem } from '@mantine/core';
import classes from './StyledTabs.module.css';

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      variant="outline"
      classNames={classes}
      // orientation="vertical"
      {...props}
    />
  );
}

export { StyledTabs };
