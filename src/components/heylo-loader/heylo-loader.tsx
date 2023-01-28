import styles from './heylo-loader.module.scss';

/* eslint-disable-next-line */
export interface HeyloLoaderProps {}

export function HeyloLoader(props: HeyloLoaderProps) {
  return (
    <div className={styles['loader']}>
    </div>
  );
}

export default HeyloLoader;
