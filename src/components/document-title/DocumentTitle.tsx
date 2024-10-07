import { Helmet } from "react-helmet-async";

export default function DocumentTitle({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
