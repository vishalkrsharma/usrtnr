import UnderDevelopment from '@/components/helper/under-development';

const ProfilePage = () => {
  return (
    <main className='flex-1 flex flex-col items-stretch'>
      <UnderDevelopment
        buttonTitle='Head over to Urls Page!!'
        buttonHref='/urls'
      />
    </main>
  );
};

export default ProfilePage;
