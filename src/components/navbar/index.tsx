import styles from "@/styles";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-slate-200">
      <div
        className={`${styles.innerWidth} flex items-center justify-between gap-8 py-8 `}
      >
        <h2 className="text-2xl font-extrabold text-black">
          <a href="/">Scene-Struggle</a>
        </h2>
        <h2 className="text-2xl font-extrabold text-black">
          <a href="/game">Game</a>
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
