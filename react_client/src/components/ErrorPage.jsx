function ErrorPage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href={`/`}>Home</a>
          </li>
          <li>
            <a href={`/login`}>Login</a>
          </li>
        </ul>
      </nav>
      <h1>404 Not Found</h1>
      <div className="card">
        <a href={`/`}>
          <button>Go Home</button>
        </a>
      </div>
    </>
  );
}

export default ErrorPage;
