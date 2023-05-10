import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { starLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;{user?.name}
      </span>
      <button className="btn btn-outline-danger" onClick={starLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>&nbsp; salir</span>
      </button>
    </div>
  );
};
