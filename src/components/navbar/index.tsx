import styles from "@/styles";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-secondary min-h-[10vh] flex items-center">
      <div
        className={`${styles.innerWidth} flex items-center justify-between gap-8`}
      >
        <h2 className="text-2xl font-extrabold text-primary font-primary">
          <a href="/">Scene-Struggle</a>
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
