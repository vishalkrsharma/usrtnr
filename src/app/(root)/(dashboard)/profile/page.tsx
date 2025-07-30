import UnderDevelopment from '@/components/helper/under-development';

const ProfilePage = () => {
  return (
    <main className='gap-8 flex-1 flex items-stretch flex-col w-full'>
      <UnderDevelopment
        buttonTitle='Head over to Urls Page!!'
        buttonHref='/urls'
      />
    </main>
  );
};

export default ProfilePage;
