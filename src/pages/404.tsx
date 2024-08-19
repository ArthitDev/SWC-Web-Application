import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Custom404() {
  const [countdown, setCountdown] = useState(10);
  const [redirectPath, setRedirectPath] = useState('/app');
  const [buttonText, setButtonText] = useState('Go back to homepage');
  const router = useRouter();

  useEffect(() => {
    const getRedirectInfo = () => {
      const { asPath } = router;
      if (asPath.startsWith('/app')) {
        return { path: '/app', text: 'Go back to homepage' };
      }
      if (
        ['/login', '/admin', '/register', '/resetpassword'].some((path) =>
          asPath.startsWith(path)
        )
      ) {
        return { path: '/login', text: 'Go to login page' };
      }
      return { path: '/app', text: 'Go back to homepage' };
    };

    const { path, text } = getRedirectInfo();
    setRedirectPath(path);
    setButtonText(text);

    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(intervalId);
        router.push(path);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, router]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom paddingTop={3}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link href={redirectPath} passHref>
        <Button variant="contained" color="primary">
          {buttonText}
        </Button>
      </Link>
      <Typography variant="body2" paragraph pt={5}>
        {countdown > 0
          ? `Auto redirecting in ${countdown} seconds...`
          : 'Redirecting now...'}
      </Typography>
    </div>
  );
}
