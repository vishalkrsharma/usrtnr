const Header = () => {
  return (
    <header className='flex-1 flex flex-col justify-end items-center gap-4'>
      <h1 className='text-center font-black text-4xl'>urstnr</h1>
      <p className='text-center text-muted-foreground w-2/3 max-w-[1000px] min-w-[200px]'>
        A modern and efficient URL shortener service that helps you create short, memorable links from long URLs. Transform lengthy web addresses into concise,
        shareable links with ease.
      </p>
    </header>
  );
};

export default Header;
