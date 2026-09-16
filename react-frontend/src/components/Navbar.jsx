import {
    Link,
    NavLink
} from "react-router-dom";


function Navbar({
    variant = "student"
}) {

    return (

        <header>

            <div className="logo">

                {variant.startsWith("admin")
                    ? "CourseMS Admin"
                    : "CourseMS"}

            </div>


            <nav>

                {/* HOME */}
                {variant === "home" && (

                    <>

                        <NavLink to="/">
                            Home
                        </NavLink>


                        <NavLink to="/login">
                            Login
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                            style={{
                                display: "none"
                            }}
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* STUDENT */}
                {variant === "student" && (

                    <>

                        <NavLink to="/courses">
                            Explore Courses
                        </NavLink>


                        <NavLink to="/my-courses">
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* STUDENT WITH DASHBOARD */}
                {variant === "student3" && (

                    <>

                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>


                        <NavLink to="/courses">
                            Explore Courses
                        </NavLink>


                        <NavLink to="/my-courses">
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* CERTIFICATE */}
                {variant === "cert" && (

                    <>

                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>


                        <NavLink to="/my-courses">
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ENROLLMENT SUCCESS */}
                {variant === "enrollment" && (

                    <>

                        <NavLink to="/courses">
                            Explore Courses
                        </NavLink>


                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>


                        <NavLink to="/my-courses">
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ADMIN PAGES */}
                {variant === "admin" && (

                    <>

                        <NavLink to="/admin-dashboard">
                            Dashboard
                        </NavLink>


                        <button
                            id="logoutBtn"
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ADMIN DASHBOARD */}
                {variant === "adminnone" && (

                    <button
                        id="logoutBtn"
                        className="logout-btn"
                    >
                        Logout
                    </button>

                )}

            </nav>

        </header>

    );

}


export default Navbar;
