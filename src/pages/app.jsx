import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'src/hooks/useAuth';
import { useLoader } from 'src/hooks/useLoader';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  
  const { isLoggedIn } = useAuth();
  const { loading } = useLoader();

  return (
    <>
      {/* <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet> */}
    

      <AppView />     </>
  );
}
