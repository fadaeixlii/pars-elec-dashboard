import { a11yProps, CustomTabPanel } from "@/components/layout/TabUtils";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import { ListEventsTable } from "./ListEventsTable";

export function EventsPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={3}>
      <Grid sm={12} item>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="رویداد ها" {...a11yProps(0)} />

              {/*
              <Tab label="Active orders" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ListEventsTable />
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
