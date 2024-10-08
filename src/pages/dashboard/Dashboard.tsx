import { Helmet } from "react-helmet-async";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import OverviewStatus from "./components/overview-status/OverviewStatus";
import CurrentStatus from "./components/current-status/CurrentStatus";
import TransactionTable from "./components/table/TransactionTable";

export default function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="grid grid-cols-[40px,2fr] h-screen max-md:grid-cols-1">
        <Sidebar />
        <div className="bg-white-wash">
          <header>
            <Header />
          </header>
          <section>
            <div className="p-16 flex justify-around flex-wrap gap-5">
              <section>
                <OverviewStatus />
              </section>
              <section>
                <CurrentStatus />
              </section>
            </div>
          </section>
          <section>
            <TransactionTable />
          </section>
        </div>
      </div>
    </>
  );
}
