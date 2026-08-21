import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {

    return (
        <nav>
            <div className="hidden sm:block">
                <ul className="text-xs sm:text-base font-medium flex flex-row p-8 mt-0 space-x-8">
                    <li>
                        <Link
                            href="/"
                            className="block py-2 px-3"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/submit"
                            className="block py-2 px-3"
                        >
                            Submit
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className="block py-2 px-3"
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar