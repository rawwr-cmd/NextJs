//our-domain.com/news/breaking-news
import { useRouter } from "next/router";
function DetailsPage() {
  const { query } = useRouter();
  const newsId = query.newsId;

  return <h1>The Breaking news page</h1>;
}

export default DetailsPage;
