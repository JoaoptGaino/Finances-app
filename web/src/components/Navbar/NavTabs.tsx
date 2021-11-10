import { styled, Tabs as MuiTabs, Tab, Box, Container } from "@mui/material";
import { observer } from "mobx-react-lite";

import rootStore from "../../stores/root";

const TabsContainer = styled(Container)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(8),
}));

const Tabs = styled(MuiTabs)(({ theme }) => ({
  background: theme.palette.background.default,
}));

function NavTabs() {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <TabsContainer maxWidth="xl">
        <Box>
          {rootStore.tabs.length ? (
            <Tabs
              value={rootStore.activeTab}
              onChange={rootStore.handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
            >
              {rootStore.tabs.map((tab) => {
                return <Tab key={tab} label={tab} />;
              })}
            </Tabs>
          ) : null}
        </Box>
      </TabsContainer>
    </Box>
  );
}

export default observer(NavTabs);
