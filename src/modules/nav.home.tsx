export default function HomeNav(props: any) {
    return(
        <div className="header">
        <div className="nav">
          <div className="count">
            Total: <div className="c-div">{props.max}</div>
          </div>
          <div className="search">
            <div className="icon" />
            <input
              type="text"
              placeholder="search"
              onChange={(e) => {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
                props.setPage(0);
                props.setSearch(e.target.value);
              }}
            />
          </div>
          <div className="admin">
            <div className="down-icon"></div>
            <input type="checkbox" className="dropdown"></input>
            <div className="admin-stack">

            <a href="admin" className="admin-name">
            {props.user?.name ? props.user?.nickname: ""}
            </a>
            {props.user?.name ? (
              <>
              <a className="btn-nav btn-secondary-outline" href="/admin">
                Dashboard
              </a>
              <a
                className="btn-nav btn-secondary-outline"
                href="api/auth/logout"
                >
                Logout
              </a>
              </>
            ) : (
                <a
                className="btn-nav btn-secondary-outline"
                href="api/auth/login"
                >
                Login
              </a>
            )}
            </div>
          </div>
        </div>
      </div>
    );
}