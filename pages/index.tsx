import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import WasmGame from "./wasm-game";
import { SiBluesky, SiGithub, SiInstagram, SiScrapbox } from "react-icons/si";
import styles from "../styles/Home.module.css";

type SocialLink = {
	href: string;
	ariaLabel: string;
	icon: React.ReactNode;
};

const YEAR = new Date().getFullYear();
const SIZE = 24;
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
		href: "https://instagram.com/kohji.street",
		ariaLabel: "Instagram",
		icon: <SiInstagram size={SIZE} color={COLOR} />,
	},
	{
		href: "https://cosen.se/suzuki-log/",
		ariaLabel: "Scrapbox",
		icon: <SiScrapbox size={SIZE} color={COLOR} />,
	},
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
						>
							{link.icon}
						</Link>
					))}
				</nav>
			</main>
			<footer className={styles.footer}>
				<small>
					<time>
						{2020}-{YEAR}
					</time>{" "}
					© nuts3745.
				</small>
			</footer>
		</div>
	);
};

export default Home;
