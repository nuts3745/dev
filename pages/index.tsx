import type { NextPage } from "next";
import Link from "next/link";
import { SiBluesky, SiGithub, SiScrapbox } from "react-icons/si";
import styles from "../styles/Home.module.css";
import WasmGame from "./wasm-game";

type SocialLink = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
};

const YEAR = new Date().getFullYear();
const SIZE = 34;
const COLOR = "black";

const socialLinks: SocialLink[] = [
  {
    href: "https://bsky.app/profile/nuts3745.dev",
    ariaLabel: "Bluesky",
    icon: <SiBluesky size={SIZE} color={COLOR} />,
  },
  {
    href: "https://github.com/nuts3745",
    ariaLabel: "GitHub",
    icon: <SiGithub size={SIZE} color={COLOR} />,
  },
  {
    href: "https://scrapbox.io/suzuki-log/",
    ariaLabel: "Scrapbox",
    icon: <SiScrapbox size={SIZE} color={COLOR} />,
  },
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.wasmGameContainer}>
          <Link
            key="Tutorial: Conway's Game of Life"
            href="https://rustwasm.github.io/docs/book/game-of-life/introduction.html"
            aria-label="Tutorial: Conway's Game of Life"
          >
            <WasmGame />
          </Link>
        </div>
        <nav className={styles.socialNav}>
          {socialLinks.map((link) => (
            <Link
              key={link.ariaLabel}
              href={link.href}
              aria-label={link.ariaLabel}
              className={styles.socialLink}
            >
              {link.icon}
            </Link>
          ))}
        </nav>
      </main>
      <footer className={styles.footer}>
        <small>
          Copyright © 2019-{YEAR} nuts3745 All rights reserved.
          {" · "}
          Icons by <Link href="https://simpleicons.org/" className={styles.footerLink}>Simple Icons</Link>
        </small>
      </footer>
    </div>
  );
};

export default Home;
