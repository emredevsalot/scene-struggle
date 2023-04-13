import styles from "@/styles";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex min-h-[15vh] items-center bg-secondary">
      <div
        className={`${styles.innerWidth} flex items-center justify-center gap-8`}
      >
        <h2 className="text font-primary text-2xl font-extrabold text-primary">
          <a href="/">Scene Struggle</a>
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
