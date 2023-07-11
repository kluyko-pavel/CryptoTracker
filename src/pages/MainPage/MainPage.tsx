import { Pagination, Table } from "../../components";
import "./MainPage.scss";

export const MainPage = () => {
  return (
    <section className="main-page">
      <div className="container">
        <Table />
        <Pagination />
      </div>
    </section>
  );
};
