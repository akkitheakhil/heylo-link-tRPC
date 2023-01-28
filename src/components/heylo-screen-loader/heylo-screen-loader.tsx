import HeyloLoader from '../heylo-loader/heylo-loader';
import styles from './heylo-screen-loader.module.scss';

/* eslint-disable-next-line */
export interface HeyloScreenLoaderProps {}

export function HeyloScreenLoader(props: HeyloScreenLoaderProps) {
  return (
    <div className={styles['container']}>
      <HeyloLoader />
    </div>
  );
}

export default HeyloScreenLoader;
