import type { NextPage } from "next";
import Link from "next/link";
import { SiBluesky, SiGithub, SiScrapbox } from "react-icons/si";
import { LuTestTubeDiagonal } from "react-icons/lu";
import styles from "../styles/Home.module.css";
import WasmGame from "./wasm-game";
import Head from "next/head";

type portfolioLinks =
  | "https://bsky.app/profile/nuts3745.dev"
  | "https://github.com/nuts3745"
  | "https://scrapbox.io/suzuki-log/"
  | "https://labs.nuts3745.dev";
type linkTarget = "_blank" | "_self";
type linkDescription = "Bluesky" | "GitHub" | "Scrapbox" | "Laboratory";
type SocialLink = {
  href: portfolioLinks;
  ariaLabel: linkDescription;
  icon: React.ReactNode;
  target: linkTarget;
};

const YEAR = new Date().getFullYear();
const SIZE = 34;
const COLOR = "black";

const socialLinks: SocialLink[] = [
  {
    href: "https://bsky.app/profile/nuts3745.dev",
    ariaLabel: "Bluesky",
    icon: <SiBluesky size={SIZE} color={COLOR} />,
    target: "_blank",
  },
  {
    href: "https://github.com/nuts3745",
    ariaLabel: "GitHub",
    icon: <SiGithub size={SIZE} color={COLOR} />,
    target: "_blank",
  },
  {
    href: "https://scrapbox.io/suzuki-log/",
    ariaLabel: "Scrapbox",
    icon: <SiScrapbox size={SIZE} color={COLOR} />,
    target: "_blank",
  },
  {
    href: "https://labs.nuts3745.dev",
    ariaLabel: "Laboratory",
    icon: <LuTestTubeDiagonal size={SIZE} color={COLOR} />,
    target: "_self",
  }
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>nuts3745.dev</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.wasmGameContainer}>
          <WasmGame />
        </div>
        <nav className={styles.socialNav}>
          {socialLinks.map((link) => (
            <Link
              key={link.ariaLabel}
              href={link.href}
              aria-label={link.ariaLabel}
              className={styles.socialLink}
              rel="noopener noreferrer"
              target={link.target}
              title={link.ariaLabel}
            >
              {link.icon}
            </Link>
          ))}
        </nav>
      </main>
      <footer className={styles.footer}>
        <small>
          Copyright © 2019-{YEAR} nuts3745 All rights reserved.
          <br />
          Icons by{" "}
          <Link
            href="https://github.com/simple-icons/simple-icons"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Simple Icons"
            aria-label="Simple Icons"
          >
            Simple Icons
          </Link>
        </small>
      </footer>
    </div>
  );
};

export default Home;
