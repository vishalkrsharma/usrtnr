const UrlPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const shortRoute = (await params).id;

  return <div>{shortRoute}</div>;
};

export default UrlPage;
