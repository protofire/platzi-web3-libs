const truncated = (account) =>
	`${account?.substr(0, 6)}...${account?.substr(-4)}`;
export default truncated;
