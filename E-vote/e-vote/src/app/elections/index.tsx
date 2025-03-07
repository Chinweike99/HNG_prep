import Link from "next/link";

const Elections = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold">Elections</h1>
        <p>Welcome to the Elections page.</p>
        <Link href="/elections/create" className="text-blue-500 hover:text-blue-700">
          Create Election
        </Link>
      </div>
    );
  };
  
  export default Elections;