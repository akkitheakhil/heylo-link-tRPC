import { HeyloButton } from '@/components';
import { useRouter } from 'next/navigation';
import styles from './404.module.scss';
function PageNotFound() {

  const router = useRouter();


  function handleGoHome() {
    router.push('/');
  }

  return <div className={styles['container']}>

    <h1> 404</h1>
    <h2> Sorry, link not found!</h2>
    <h3> Please go back to home page.</h3>
      <HeyloButton color="PRIMARY"  width="300px" height="60px" label="HOME" onClick={handleGoHome} />
  </div>
}

export default PageNotFound;
