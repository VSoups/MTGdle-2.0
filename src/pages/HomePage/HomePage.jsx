// import { useState } from "react";

import { Link } from "react-router-dom";

export default function HomePage() {

    return (
        <>
            <h1>Home</h1>
            <hr />

            <section>
                <Link to="/game">MTGdle Unlimited</Link>
            </section>
        </>
    );
}