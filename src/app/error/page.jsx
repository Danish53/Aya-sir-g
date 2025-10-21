"use client";
import Link from "next/link";

export default function ErrorPage({ error }) {
    const statusCode = error?.statusCode || 500;

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <div className="">
                <h1
                    className="fw-bold mb-2"
                    style={{ fontSize: "150px", lineHeight: "1", color: "#B50000" }}
                >
                    {statusCode}
                </h1>
                <h2 className="fw-semibold text-dark mb-3">
                    Oops! Something went wrong.
                </h2>
                <p className="text-muted mb-4">
                    We’re sorry, but it seems an unexpected error occurred.
                </p>
                <Link
                    href="/"
                    className="btn btn_primary btn-lg text-white shadow-sm"
                >
                    Go Back Home
                </Link>
            </div>

            <p className="text-secondary mt-4 small">
                Need help?{" "}
                <Link href="/contact-us" className="text-decoration-none text-primary">
                    Contact support
                </Link>
            </p>
        </div>
    );
}
