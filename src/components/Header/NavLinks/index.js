import { ReactComponent as GithubLogo } from '../../../assets/github.svg';

const NavLinks = () => {
	return (
		<nav id="links">
			<ul>
				<li>
					<a href="https://github.com/matiasZFDev/crypto-data" target="_blank" rel="noreferrer">
						<GithubLogo className="github-repository" />
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default NavLinks;