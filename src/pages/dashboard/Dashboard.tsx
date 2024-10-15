import { Helmet } from "react-helmet-async";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import OverviewStatus from "./components/overview-status/OverviewStatus";
import CurrentStatus from "./components/current-status/CurrentStatus";
import TransactionTable from "./components/table/TransactionTable";
import ModalWrapper from "../../components/wrapper/Wrapper";
import WindowModal from "./components/table/components/modal/window/WindowModal";
import { useModalWrapper } from "../../hooks/useModalWrapper";
import { useSelector } from "react-redux";
import { IRootState } from "../../shared/stores/app";
import StatusModal from "./components/table/components/modal/status/StatusModal";
import TableFilter from "./components/table/components/modal/service-filter/TableFilter";

export default function Dashboard() {
  const { handleCloseModal } = useModalWrapper();

  const modal_for = useSelector((state: IRootState) => state.modal.modalFor);

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="grid grid-cols-[40px,2fr] h-screen max-lg:grid-cols-1">
        <Sidebar />
        <div className="bg-white-wash">
          <header>
            <Header />
          </header>
          <section>
            <div className="p-2 flex justify-around flex-wrap gap-5">
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
      <ModalWrapper onClick={handleCloseModal}>
        {modal_for === "Call" && <WindowModal />}
        {modal_for === "Done" && <StatusModal />}
        {modal_for === "table-filter" && <TableFilter />}
      </ModalWrapper>
    </>
  );
}
