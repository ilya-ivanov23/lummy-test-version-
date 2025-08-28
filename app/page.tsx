import AppBarChart from "@/components/AppBarChart";
import CardList from "@/components/CardList";
import AppPieChart from "@/components/AppPieChart";
import AppAreaChart from "@/components/AppAreaChart";
import TodoList from "@/components/TodoList";
import AppArea2Chart from "@/components/AppArea2Chart";
import AppToolTip from "@/components/AppToolTip";
import AppTest from "@/components/AppTest";


const Homepage = () => {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
              <AppBarChart />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
              <CardList title="Latest Transactions" />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
              <AppPieChart />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg"><TodoList/></div>
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
              <AppAreaChart />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
              <AppToolTip />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-4">
              <AppArea2Chart />
          </div>

              <AppTest />

      </div>
  )
}

export default Homepage