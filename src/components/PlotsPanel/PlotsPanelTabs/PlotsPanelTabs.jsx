import { useState } from "react";
import style from "./PlotsPanelTabs.module.scss";
import TransactionSection from "./TransactionsTab/TransactionsTab";
import OwnersTab from "./OwnersTab/OwnersTab";
import GeneralTab from "./GeneralTab/GeneralTab.jsx";
import AddressesTab from "./AddressesTab/AddressesTab.jsx";

const PlotsPanelTabs = ({ plotInfo }) => {
  const [activeTab, setActiveTab] = useState({
    label: "General",
    component: GeneralTab,
  });
  const ActiveComponent = activeTab.component;

  const tabs = [
    { label: "General", component: GeneralTab },
    { label: "Addresses", component: AddressesTab },
    { label: "Owners", component: OwnersTab },
    { label: "Transactions", component: TransactionSection },
  ];

  return (
    <div>
      <ul className={style.tabs}>
        {tabs.map((tab, i) => (
          <li
            key={i}
            className={activeTab.label === tab.label ? style.active : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <ActiveComponent plotInfo={plotInfo} />
    </div>
  );
};

export default PlotsPanelTabs;
