import SidebarUser from "./SidebarUser.jsx";
import SidebarAdmin from "./SidebarAdmin.jsx";
import { useAuth } from "../context/Authcontext.jsx";

function Sidebar() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated && isAdmin) {
    return <SidebarAdmin />;
  } else if (isAuthenticated) {
    return <SidebarUser />;
  } /*else {
        
        return <Navigate to="/login" />;
    }*/
}

export default Sidebar;
