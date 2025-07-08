const Header = () => {
  return (
    <header className='flex-1 flex flex-col justify-end items-center gap-4 pb-8'>
      <h1 className='text-center font-black text-4xl'>urstnr</h1>
      <p className='text-center text-muted-foreground md:w-2/3 max-sm:px-4 max-md:px-8 max-w-[1000px] min-w-[200px]'>
        A modern URL shortener that transforms long web addresses into short, memorable, and shareable links with ease.
      </p>
    </header>
  );
};

export default Header;
