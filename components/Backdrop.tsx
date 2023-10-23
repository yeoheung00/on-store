import styles from './Backdrop.module.css'

type BackDropType = {
  children: React.ReactNode;
  listModalHandler: () => void;
};

export default function Backdrop({
  children,
  listModalHandler,
}: BackDropType) {
  return (
    <div className={styles.backdrop} onClick={listModalHandler}>
      {children}
    </div>
  );
}