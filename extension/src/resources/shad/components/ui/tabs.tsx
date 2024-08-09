import * as Tab from "@radix-ui/react-tabs";
import type React from "react";

type Tab = {
  name: string;
  value: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabData: Tab[];
};

const TabTrigger: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => (
  <Tab.Trigger
    className="bg-white dark:bg-background px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black dark:text-foreground select-none hover:text-twitch-11 dark:hover:text-twitch-11 data-[state=active]:text-twitch-11 dark:data-[state=active]:text-twitch-11 data-[state=active]:font-bold border-b-2 border-transparent dark:border-foreground transition-all duration-300 ease-in-out data-[state=active]:border-twitch-11 dark:data-[state=active]:border-twitch-8 outline-none cursor-default"
    value={value}
  >
    {name}
  </Tab.Trigger>
);

const TabContent: React.FC<{ value: string; content: React.ReactNode }> = ({
  value,
  content,
}) => (
  <Tab.Content
    className="grow bg-white dark:bg-background rounded-b-md"
    value={value}
  >
    {content}
  </Tab.Content>
);

const Tabs: React.FC<TabsProps> = ({ tabData }) => (
  <Tab.Root
    className="flex flex-col w-full gap-3 dark:bg-background"
    defaultValue={tabData[0].value}
  >
    <Tab.List
      className="shrink-0 flex border-b border-gray-200 dark:border-twitch-1"
      aria-label="Sections"
    >
      {tabData.map((tab) => (
        <TabTrigger name={tab.name} value={tab.value} key={tab.value} />
      ))}
    </Tab.List>
    {tabData.map((tab) => (
      <TabContent value={tab.value} content={tab.content} key={tab.value} />
    ))}
  </Tab.Root>
);

export default Tabs;
